import User from '../models/User';
import Profile from '../models/Profile';
import Follower from '../models/Follower';
import LoggerInstance from '../loaders/logger';
// import avatar from 'gravatar';
import functions from '../utils/functions';
import ErrorHandler from '../helpers/errHandler';
import SuccessHandler from '../helpers/sucessHandler';
import emailService from '../services/emailService';
import emailTemplate from '../helpers/emailTemplate';
import friend from '../classes/friend';
import follower from '../classes/follower';
import s3_uploads from '../services/awsService';

const {
  successWithMessage,
  successWithData,
  successWithMessageAndData,
} = SuccessHandler;
const { serverResponse, validationError } = ErrorHandler;

const userController = {
  userSignUp: async (req, res) => {
    try {
      const userData = req.body;
      const ipAddress =
        (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
      userData.ipAddress = ipAddress;

      const existUser = await User.findOne({ email: userData.email });
      if (existUser) return serverResponse(res, 'Email already exist', 400);

      const otp = functions.generateConfirmCode();
      userData.confirmationCode = otp;
      let profile = await new Profile({}).save();
      userData.profile = profile._id;
      const user = await new User(userData).save();
      // await emailService(
      //     req.body.email,
      //     'Account Confirmation',
      //     emailTemplate.confirmationCode(otp, userData.firstName, userData.email)
      // );
      const token = await user.generateToken();
      return successWithMessageAndData(
        res,
        201,
        'Account successfully created',
        { token, user }
      );
    } catch (error) {
      return serverResponse(res, error.message, 400);
    }
  },

  resendOtp: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user)
        return serverResponse(res, 'User with this email not found', 400);
      const otp = functions.generateConfirmCode();
      user.confirmationCode = otp;
      await emailService(
        req.body.email,
        'Account Confirmation Re-sent',
        emailTemplate.confirmationCode(otp, user.firstName, email)
      );
      await user.save();
      const token = await user.generateToken();
      return successWithMessage(res, 200, 'Confirmation code has been re-sent');
    } catch (error) {
      return serverResponse(res, error.message, 500);
    }
  },

  userVerify: async (req, res) => {
    const { confirmCode, email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        const confirmationCode =
          !Number.isNaN(confirmCode) && String(confirmCode).trim().length === 6
            ? parseInt(confirmCode, 10)
            : 'Invalid activation code';
        if (user.confirmationCode !== confirmationCode) {
          return serverResponse(res, 'Invalid confirmation code', 400);
        }
      }
      const verified = await User.findOneAndUpdate(
        { email },
        {
          accountConfirm: true,
          isActive: true,
          isVerified: true,
          confirmationCode: null,
        }
      );
      if (!verified) return new Error('Verification code is already used');
      await emailService(
        email,
        'Welcome to Fibus',
        emailTemplate.welcomeEmail(user.firstName)
      );
      return successWithMessage(res, 200, 'Account verified, Please login');
    } catch (error) {
      return serverResponse(res, error.message, 500);
    }
  },

  userVerifyWeb: async (req, res) => {
    const { confirmCode, email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        const confirmationCode =
          !Number.isNaN(confirmCode) && String(confirmCode).trim().length === 6
            ? parseInt(confirmCode, 10)
            : 'Invalid activation code';
        if (user.confirmationCode !== confirmationCode) {
          return serverResponse(res, 'Invalid confirmation code', 400);
        }
      }
      const verified = await User.findOneAndUpdate(
        { email },
        {
          accountConfirm: true,
          isActive: true,
          isVerified: true,
          confirmationCode: null,
        }
      );
      if (!verified) return new Error('Verification code is already used');
      await emailService(
        email,
        'Welcome to Female And More',
        emailTemplate.welcomeEmail(user.firstName)
      );
      return successWithMessage(
        res,
        200,
        'User register verified, Please login'
      );
    } catch (error) {
      return serverResponse(res, error.message, 500);
    }
  },

  userSignIn: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email }).populate('profile', [
        'influence',
        'profilePics',
        'coverPhoto',
      ]);
      if (!user)
        return serverResponse(
          res,
          'Account is not yet registered with this email',
          404
        );

      const isMatch = await user.comparePassword(password, user.password);
      if (!isMatch)
        return serverResponse(res, 'Wrong Email or Password, try again', 404);

      const token = await user.generateToken();

      return successWithMessageAndData(res, 200, 'User Login successfully', {
        token,
        user,
      });
    } catch (error) {
      LoggerInstance.error(error);
      return serverResponse(res, error.message, 400);
    }
  },

  userUpdate: async (req, res) => {
    try {
      let {
        dob,
        profession,
        phoneNumber,
        address,
        city,
        country,
        educations,
        hobbies,
        bio,
        interests,
        firstName,
        lastName,
      } = req.body;

      // Build Profile Object
      let profileFields = {};
      profileFields.user = req.user.id;
      if (profession) profileFields.profession = profession;
      if (address) profileFields.address = address;
      if (educations) profileFields.educations = educations;
      if (city) profileFields.city = city;
      if (bio) profileFields.bio = bio;
      if (hobbies) profileFields.hobbies = hobbies;
      if (dob) profileFields.dob = dob;
      if (interests) profileFields.interests = interests;
      if (phoneNumber) profileFields.phoneNumber = phoneNumber;
      if (country) profileFields.country = country;

      // Build User Object
      let userFields = {};
      if (firstName) userFields.firstName = firstName;
      if (lastName) userFields.lastName = lastName;

      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // UPDATE PROFILE
        let user = await User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: userFields },
          { new: true }
        );

        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return successWithMessageAndData(
          res,
          201,
          'Profile Updated successfully',
          { user, profile }
        );
      }

      // UPDATE PROFILE
      let user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: userFields },
        { new: true }
      );
      // CREATE PROFILE
      let newProfile = await new Profile(profileFields).save();
      req.user.profile = newProfile._id;
      await req.user.save();

      return successWithMessageAndData(
        res,
        201,
        'Profile Created successfully',
        { user, profile: newProfile }
      );
    } catch (error) {
      return serverResponse(res, error.message, 400);
    }
  },

  userProfile: async (req, res) => {
    try {
      const profile = await User.findOne({
        _id: req.user.id,
      }).populate('profile', [
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'country',
        'dob',
        'hobbies',
        'interests',
        'bio',
        'address',
        'city',
        'country',
        'influence',
        'maritalStatus',
        'profilePics',
        'coverPhoto',
      ]);

      if (!profile)
        return serverResponse(res, 'There is no profile for this user', 400);

      successWithMessageAndData(res, 200, 'Success', profile);
    } catch (error) {
      return serverResponse(res, error.message, 500);
    }
  },

  userProfilePics: async (req, res) => {
    try {
      if (!req.files) {
        return serverResponse(res, 'Please Upload a file', 400);
      }
      const imagePath = req.files[0];
      const { url } = await s3_uploads.file(imagePath, 'photos');

      const profile = await Profile.findOne({ _id: req.user.profile });

      if (!profile) return serverResponse(res, "User's Profile not found", 400);
      profile.profilePics = url;
      await profile.save();
      return successWithMessageAndData(res, 200, 'Profile photo Updated', url);
    } catch (error) {
      return serverResponse(res, error.message, 400);
    }
  },

  userCoverPhoto: async (req, res) => {
    try {
      if (!req.files) {
        return serverResponse(res, 'Please Upload a file', 400);
      }
      const imagePath = req.files[0];
      const { url } = await s3_uploads.file(imagePath, 'photos');

      const profile = await Profile.findOne({ _id: req.user.profile });
      if (!profile) return serverResponse(res, "User's Profile not found", 400);
      profile.coverPhoto = url;
      await profile.save();
      return successWithMessageAndData(res, 200, 'Cover photo Updated', url);
    } catch (error) {
      return serverResponse(res, error.message, 400);
    }
  },

  userLogoutAll: async (req, res) => {
    const user = req.user;
    try {
      user.tokens = [];
      await user.save();
      return successWithMessage(
        res,
        200,
        'Successfully logged out in all devices'
      );
    } catch (error) {
      return serverResponse(res, error.message, 500);
    }
  },

  userLogout: async (req, res) => {
    const user = req.user;
    try {
      user.tokens = user.tokens.filter((token) => {
        return token.token !== req.token;
      });
      await user.save();
      return successWithMessage(res, 200, 'Successfully logged');
    } catch (error) {
      return serverResponse(res, error.message, 500);
    }
  },

  recoverPassword: async (req, res) => {
    const email = req.body.email;
    try {
      const user = await User.findOne({ email: email });
      if (!user)
        return serverResponse(
          res,
          `The email address  ${email} is not associated with any account. Double-check your email address and try again.`,
          401
        );

      await user.generatePasswordReset();
      const link = `https://femaleandmore.org//reset-password/${user.resetPasswordToken}`;

      await user.save();
      await emailService(
        email,
        'Rest Password request',
        emailTemplate.recoverPassword(link, user.firstName)
      );
      return successWithMessage(
        res,
        200,
        `A reset email has been sent to ${email}`
      );
    } catch (error) {
      return serverResponse(res, error.message, 500);
    }
  },

  resendRestPassword: async (req, res) => {
    const email = req.body.email;
    try {
      const user = await User.findOne({ email: email });
      if (!user)
        return serverResponse(
          res,
          `The email address  ${email} is not associated with any account. Double-check your email address and try again.`,
          401
        );

      await user.generatePasswordReset();
      const link = `https://femaleandmore.org//reset-password/${user.resetPasswordToken}`;

      await user.save();
      await emailService(
        email,
        'Rest Password request',
        emailTemplate.recoverPassword(link, user.firstName)
      );
      return successWithMessage(
        res,
        200,
        `A reset email has been re sent to ${email}`
      );
    } catch (error) {
      return serverResponse(res, error.message, 500);
    }
  },

  resetPassword: async (req, res) => {
    // const token = req.params.token;
    const newPassword = req.body.password;
    try {
      const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
      });
      if (!user)
        return serverResponse(
          res,
          'Password reset token is invalid or has expired',
          401
        );

      // Set new password
      user.password = newPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;

      await user.save();
      await emailService(
        user.email,
        'Password Reset',
        emailTemplate.restPassword(user.firstName, user.email)
      );
      return successWithMessage(res, 200, 'Your password has been updated');
    } catch (error) {
      return serverResponse(res, error.message, 500);
    }
  },

  updatePassword: async (req, res) => {
    const { newPassword, oldPassword } = req.body;
    try {
      const user = req.user;
      const isMatch = await user.comparePassword(oldPassword, user.password);
      if (!isMatch) return serverResponse(res, 'Old password is invalid', 404);
      user.password = newPassword;
      await user.save();
      return successWithMessage(res, 200, 'Password Updated Successfully');
    } catch (error) {
      return serverResponse(res, error.message, 400);
    }
  },
};

export default userController;

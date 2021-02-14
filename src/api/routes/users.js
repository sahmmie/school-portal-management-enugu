import { Router } from 'express';
import userController from '../../controllers/user';
import upload from '../../services/multerService';
import userAuth from '../middleware/userAuth';

const route = Router();
export default (app) => {
    app.use('/user', route);

    /**
     * @swagger
     * /signup:
     *   post:
     *     description: Returns the homepage
     *     responses:
     *       200:
     *         description: hello world
     */
    route.post('/signup', userController.userSignUp);

    // VERIFY USER'S EMAIL
    // @route       POST api/v1/user/verify
    // @desc        Verify New User 
    // @access      Public
    route.post('/verify', userController.userVerify);

    // VERIFY USER'S EMAIL WEB
    // @route       POST api/v1/user/verify
    // @desc        Verify New User 
    // @access      Public
    route.post('/verify_web', userController.userVerifyWeb);

    // USER LOGIN
    // @route       POST api/v1/user/sigin
    // @desc        Signing in User after verified
    // @access      Public
    route.post('/signin', userController.userSignIn);


    // UPDATE / CREATE USER'S PROFILE
    // @route       POST api/v1/user/updateUser
    // @desc        Creating or updating user's profile
    // @access      Private
    route.post('/update_user', userAuth, upload.any(), userController.userUpdate);

    // GET USER'S CURRENT PROFILE
    // @route       GET api/v1/user/profile/me
    // @desc        Get current user's profile
    // @access      Private
    route.get('/profile/me', userAuth, userController.userProfile);

    // PUT USER'S PROFILE PICS
    // @route       PUT api/v1/user/profile_pics
    // @desc        Upload profile picture
    // @access      Private
    route.put('/profile/avatar', userAuth, upload.any(), userController.userProfilePics);


    // PUT USER'S Cover photo
    // @route       PUT api/v1/user/profile_pics
    // @desc        Upload profile picture
    // @access      Private
    route.put('/profile/cover_photo', userAuth, upload.any(), userController.userCoverPhoto);

    // POST USER LOGOUT ALL
    // @route       POST api/v1/user/logout_all
    // @desc        User Logout on all Devices
    // @access      Private
    route.post('/logout_all', userAuth, userController.userLogoutAll);

    // POST USER LOGOUT CURRENT 
    // @route       POST api/v1/user/logout_all
    // @desc        User Logout on current Devices
    // @access      Private
    route.post('/logout', userAuth, userController.userLogout);


    route.post('/recover_password', userController.recoverPassword);


    route.post('/reset_password/:token', userController.resetPassword);

    route.post('/re-send-otp', userController.resendOtp);

    route.post('/re-send-restPassword', userController.resendRestPassword);

    route.patch('/updatePassword', userAuth, userController.updatePassword);

};
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../config/index';

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        lowercase: true,
        maxlength: 100,
        required: true
    },
    lastName: {
        type: String,
        lowercase: true,
        maxlength: 100,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Your password must not include "password"');
            }
        },
    },
    profileCompleted: {
        type: Boolean,
        default: false,
    },
    isOnline: {
        type: Boolean,
        default: false,
    },
    socketId: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'company', 'public_figure']
    },
    confirmationCode: {
        type: Number,
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }, ],
    ipAddress: {
        type: String,
        default: null,
    },
}, { timestamps: true });

// HASHING OF PASSWORD //
userSchema.pre('save', function hashPassword(next) {
    try {
        if (this.isModified('password')) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(this.password, salt);
            this.password = hash;
            next();
        } else {
            next();
        }
    } catch (error) {
        return next(error);
    }
});

// COMPARING OF PASSWORD
userSchema.methods.comparePassword = async function(plainPassword) {
    try {
        const user = this;
        const isMatch = await bcrypt.compareSync(plainPassword, user.password);
        return isMatch;
    } catch (error) {
        console.log(error);
    }
};


// GENERATING OF TOKEN
userSchema.methods.generateToken = async function() {
    try {
        const user = this;
        const token = jwt.sign({ _id: user._id.toString() }, config.secretOrKey);

        user.tokens = user.tokens.concat({ token });
        await user.save();
        return token;
    } catch (error) {
        console.log(error);
    }
};

// GENERATE REST PASSWORD TOKEN
userSchema.methods.generatePasswordReset = function() {
    try {
        const user = this;
        user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
    } catch (error) {
        console.log(error);
    }
};

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject;
};

userSchema.index({
    firstName: "text",
    lastName: "text",
})

const User = mongoose.model('User', userSchema);
export default User;
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../config/index';

const {
    Schema
} = mongoose;

const staffSchema = new Schema({
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
        minlength: 4,
    },
    photo: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enums: ['teacher', 'accountant', 'admin'],
        default: 'teacher'
    },
    subjects: [],
    classes: [],
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }, ],
}, {
    timestamps: true
});

// HASHING OF PASSWORD //
staffSchema.pre('save', function hashPassword(next) {
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
staffSchema.methods.comparePassword = async function(plainPassword) {
    try {
        const user = this;
        const isMatch = await bcrypt.compareSync(plainPassword, user.password);
        return isMatch;
    } catch (error) {
        console.log(error);
    }
};


// GENERATING OF TOKEN
staffSchema.methods.generateToken = async function() {
    try {
        const user = this;
        const token = jwt.sign({
            _id: user._id.toString()
        }, config.secretOrKey);

        user.tokens = user.tokens.concat({
            token
        });
        await user.save();
        return token;
    } catch (error) {
        console.log(error);
    }
};

// GENERATE REST PASSWORD TOKEN
staffSchema.methods.generatePasswordReset = function() {
    try {
        const user = this;
        user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
    } catch (error) {
        console.log(error);
    }
};

staffSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject;
};

staffSchema.index({
    firstName: "text",
    lastName: "text",
})

const Staff = mongoose.model('Staff', staffSchema);
export default Staff;
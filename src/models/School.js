import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../config/index';

const {
    Schema
} = mongoose;

const schoolSchema = new Schema({
    name: {
        trim: true,
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    email: {
        trim: true,
        unique: true,
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        // required: true
    },
    phone: {
        trim: true,
        unique: true,
        type: Number,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    logo: {
        type: String
    },
    lga: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: [
            50, 51
        ]
    },
    category: {
        type: String,
        required: true
    },
    paid: {
        type: Boolean,
        required: true,
        default: false
    },
    verification: {
        email: {
            type: Boolean,
            required: true,
            default: false
        },
        rc: {
            type: Boolean,
            required: true,
            default: false
        }
    }
}, {
    timestamps: true
});

schoolSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject;
};

schoolSchema.index({
    firstName: "text",
    lastName: "text",
})

const School = mongoose.model('School', schoolSchema);
export default School;
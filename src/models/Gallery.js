import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../config/index';

const {
    Schema
} = mongoose;

const gallerySchema = new Schema({
    title: {
        trim: true,
        type: String,
        lowercase: true,
    },
    description: {
        trim: true,
        type: String,
        lowercase: true,
    },
    medias: [{
        media: {
            type: String,
            required: true
        },
        description: {
            type: String
        }
    }]
}, {
    timestamps: true
});

gallerySchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject;
};

gallerySchema.index({
    firstName: "text",
    lastName: "text",
})

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
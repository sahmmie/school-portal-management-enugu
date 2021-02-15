import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../config/index';

const {
    Schema
} = mongoose;

const studentSchema = new Schema({
    surname: {
        trim: true,
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        default: '123456'
    },
    othername: {
        trim: true,
        type: String,
    },
    firstname: {
        trim: true,
        type: String,
        required: true,
    },
    guardian_phone: {
        type: Number,
        // required: true
    },
    regno: {
        type: String,
        required: true,
        unique: true
    },
    school_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'School',
    },
    school_category: {
        type: String,
        required: true,
    },
    school_type: {
        type: String,
        required: true,
    },
    dob: {
        type: Date
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }, ],
    passport: {
        type: String
    },
    state: {
        type: String,
    },
    medical_condition: {
        type: String,
        default: null,
    },
    class: {
        type: Number,
            required: true,
            enum: [4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    religon: {
        type: String
    },
    address: {
        type: String,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    isUpdated: {
        type: Boolean
    }
}, {
    timestamps: true
});

// HASHING OF PASSWORD //
studentSchema.pre('save', function hashPassword(next) {
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
studentSchema.methods.comparePassword = async function(plainPassword) {
    try {
        const user = this;
        const isMatch = await bcrypt.compareSync(plainPassword, user.password);
        return isMatch;
    } catch (error) {
        console.log(error);
    }
};


// GENERATING OF TOKEN
studentSchema.methods.generateToken = async function() {
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
studentSchema.methods.generatePasswordReset = function() {
    try {
        const user = this;
        user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
    } catch (error) {
        console.log(error);
    }
};

studentSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject;
};

studentSchema.index({
    firstName: "text",
    lastName: "text",
})

const Student = mongoose.model('Student', studentSchema);
export default Student;
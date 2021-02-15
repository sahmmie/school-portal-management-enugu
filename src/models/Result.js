const mongoose = require("mongoose");
const {
    Schema
} = mongoose;

const resultSchema = Schema({
    regno: {
        type: String,
        required: true,
        trim: true,
    },
    student_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Student',
    },
    name: {
        type: String,
        required: true,
    },
    promoted: {
        type: Boolean,
        required: true,
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
    class: {
        type: Number,
            required: true,
    },
    term: {
        type: Number,
        required: true,
        enums: [1, 2, 3],
    },
    session: {
        type: String,
        required: true,
        // year
    },
    subjects: [{
        _id: false,
        subject_code: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
    }, ],
}, {
    timestamps: true,
});

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
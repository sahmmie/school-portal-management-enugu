const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    capacity: {
        type: Number
    },
    fee: {
        type: Number
    },
    code: {
        type: Number,
        required: true,
        enum: [4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    type: {
        type: Number,
        required: true,
        enum: [50, 51]
    }
}, {
    timestamps: true
})

const Class = mongoose.model('Class', classSchema)
module.exports = Class
const mongoose = require('mongoose');

const todoLabelSchema = new mongoose.Schema({
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User', required: true
    // }

    user: [
        {
            userid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', required: true
            },
            email: {
                type: String,
                required: true,
                // unique: true
            },
            approved: {
                type: Boolean, enum: [true, false],
                default: false,
                required: true
            },
            authorization: {
                type: String,
                enum: ['admin', 'user'],
                default: 'user',
                required: true
            }
        }
    ],
    title: {
        type: String,
        required: true,
    },
    todoBody: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'todoBody',
        }
    ],
    note: {
        type: String,

    },
    pin: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    hide: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    updateAt: Date

}, { timestamps: true })

module.exports = mongoose.model('todoLabel', todoLabelSchema);
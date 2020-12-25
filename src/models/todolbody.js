const mongoose = require('mongoose');

const todobodySchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    titleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'todoLabel'
    },
    complete: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    date: {
        type: String,
        required: true
    },
    updateAt: Date
}, { timestamps: true })

module.exports = mongoose.model('todoBody', todobodySchema);
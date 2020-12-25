const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    hash_password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        // require: true
    },
    updatedAt: Date,

}, { timestamps: true })

// userSchema.methods = {
//     authenticate: async function (password) {
//         return await bcryptjs.compareSync(password, this.hash_password)
//     }
// }

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    { collection: 'user-data' }
)

const User = mongoose.model('UserData', userSchema);

module.exports = User;
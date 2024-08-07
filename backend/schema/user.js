const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    mobile: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;

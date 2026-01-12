const mongoose = require('mongoose');

// trim quita los espacios del principio y del final
const userSchema = new mongoose.Schema({
    username: { type:String, required: true, unique: true, trim: true },
    name: { type:String, required: true, trim: true },
    surname: { type:String, required: true, trim: true },
    birthdate: { type:Date, required: true },
    email: { type:String, required: true, lowercase: true, unique: true, trim: true },
    password: { type:String, required: true },
    isHost: { type:Boolean, default: false}
}, {timestamps: true });

module.exports = mongoose.model('User', userSchema);
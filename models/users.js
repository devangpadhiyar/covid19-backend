const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{type:String, unique:true},
    firstName: String,
    lastName: String,
    password: String,
    country: String,
})

const User = mongoose.model("User", UserSchema)

module.exports = User;


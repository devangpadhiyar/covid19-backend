const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  password: String,
  salt: String,
  country: String,
});

UserSchema.statics.findUserByEmail = function (email) {
  return this.findOne({ email });
};

UserSchema.methods.validatePassword = function (password) {
  const hashVerify = crypto
    .pbkdf2Sync(password, this.salt, 10000, 64, 'sha512')
    .toString('hex');
  return this.password === hashVerify;
};

UserSchema.pre('save', function () {
  if (this.isModified('password')) {
    const originalPassword = this.password;
    const salt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto
      .pbkdf2Sync(originalPassword, salt, 10000, 64, 'sha512')
      .toString('hex');
    this.salt = salt;
    this.password = genHash;
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

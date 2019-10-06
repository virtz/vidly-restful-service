const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    isAdmin:Boolean,
  
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id ,isAdmin:this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}
const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const complexityOptions = {
        min: 5,
        max: 255,
        lowerCase: 1,
        upperCase: 2,
        numeric: 2,
        symbol: 1,
        requirementCount: 4

    };
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: new PasswordComplexity(complexityOptions).required(),
    }
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');
const passComp = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rToken: {
        type: String
    },
    isAuthorized: {
        type: Boolean
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this.id }, process.env.JWT_PRIVATE_KEY, { expiresIn: "2d" });
    return token;
}

const User = mongoose.model("users", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label('First name'),
        lastName: Joi.string().required().label('Last name'),
        email: Joi.string().email().required().label('Email'),
        password: passComp().required().label('Password'),
    })
    return schema.validate(data);
};

module.exports = { User, validate }
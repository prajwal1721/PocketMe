const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        validate: [validate({
            validator: 'isLength',
            arguments: [1, 7],
            message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
        }),
        validate({
            validator: 'isAlphanumeric',
            passIfEmpty: false,
            message: 'Name should contain alpha-numeric characters only',
        })]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    // email_isVerified: {
    //     type: Boolean,
    //     default: false
    // },
    password: {
        type: String,
        minLength: 6,
    },
    urlLeft: {
        type: Number,
        default: 1000
    },
    urlAllocated: {
        type: Number,
        default: 1000
    },
    countryCode: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
},
    {
        strict: true
    }
)
module.exports = User = mongoose.model("Users", UserSchema);
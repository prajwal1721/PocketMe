const mongoose = require('mongoose');
var validate = require('mongoose-validator')
require('mongoose-type-url');
const UrlSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    longUrl: {
        type: mongoose.SchemaTypes.Url,
        required: true,
    },
    shortUrl: {
        type: String,
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
    qrImage: {
        data: Buffer,
        contentType: String
    },
    description: {
        type: String,
    }

})

module.exports = UrlData = mongoose.model("urls", UrlSchema);
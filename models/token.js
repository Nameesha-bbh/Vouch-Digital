const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        token: {
            type: String,
            required: true
        },
        createdAt:{
            type: Date,
            default: Date.now,
            expires: '30m'
        }
    }
);

const token = mongoose.model('Token', schema);

module.exports = token;
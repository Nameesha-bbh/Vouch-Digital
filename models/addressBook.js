const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        address: {
            type: String,
            required: true,
        },
        phoneNo: {
            type: Number,
            required: true,
            unique: true
        }
    }
);

const addressBook = mongoose.model('AddressBook', schema);

module.exports = addressBook;
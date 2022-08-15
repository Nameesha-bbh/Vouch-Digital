const express = require('express')
const router = express.Router();
const { checkSchema, body } = require('express-validator');
const authController = require('../controllers/authController');
const User = require('../models/user');

router.post(
    '/',
    checkSchema({
      password: {
        notEmpty: true,
        isLength: { options: { min: 9 } },
        errorMessage: 'Please provide a secure password',
      }
    }),
    [
        body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value) => {
        return User.findOne({ email: value }).then(userDoc => {
            if (userDoc) {
            return Promise.reject(
                'E-Mail aldready exists'
            );
            }
        });
        })
        .normalizeEmail()
    ],
    authController.register
);

module.exports = router;
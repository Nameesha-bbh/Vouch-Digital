const express = require('express')
const router = express.Router();
const addressBookController = require('../controllers/addressBookController');
const AddressBook = require('../models/addressBook');
const isAuthorised = require('../middleware/isAuthorised');
const { checkSchema, body } = require('express-validator');


//Add a new contact
router.post('/addContact',isAuthorised , checkSchema({
    name: {
      trim: true,
      notEmpty: true,
      errorMessage: 'Name is required',
    },
    address:{
      notEmpty: true,
      errorMessage: 'Address is required',
    },
    phoneNo: {
      notEmpty: true,
      errorMessage: 'Phone no is required',
    }
  }),
  [
        body('phoneNo')
        .custom((value) => {
        return AddressBook.findOne({ phoneNo: value }).then(addressDoc => {
            if (addressDoc) {
            return Promise.reject(
                'Phone number aldready exists'
            );
            }
        });
        }),
        body('name')
        .custom((value) => {
        return AddressBook.findOne({ name: value }).then(addressDoc => {
            if (addressDoc) {
            return Promise.reject(
                'Name aldready exists'
            );
            }
        });
        })
    ],
  addressBookController.addContact
);

//Update contact
router.post('/updateContact', isAuthorised, 
    checkSchema({
        name: {
          trim: true,
          notEmpty: true,
          errorMessage: 'Name is required',
        },
        address:{
          notEmpty: true,
          errorMessage: 'Address is required',
        },
        phoneNo: {
          notEmpty: true,
          errorMessage: 'Phone no is required',
        }
    })
    ,addressBookController.updateContact);

//Delete contact
router.delete('/deleteContact', isAuthorised, 
    checkSchema({
        name: {
          trim: true,
          notEmpty: true,
          errorMessage: 'Name is required',
        }
    })
    ,addressBookController.deleteContact);

//Fetch details of single contact
router.get('/fetchSingleContact', isAuthorised ,addressBookController.getContact);


//Add bulk contacts
router.post('/addBulkContacts',isAuthorised, addressBookController.addBulkContact);

//Pagination
//Assuming he can access all
router.get('/getContacts/:page/:limit', isAuthorised, addressBookController.getAllContacts);

//Phase matching
//Assuming onlt input given is name
router.get('/phaseMatch', isAuthorised, addressBookController.phaseMatch)

module.exports = router;
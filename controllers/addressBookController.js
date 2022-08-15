const AddressBook = require('../models/addressBook');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const User = require('../models/user');
const { use } = require('../routes/addressBook');

const addContact = async (req, res) => {
    try{
            //Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: errors.array()[0].msg,
            });
            }

            //Find user with emailId
            const user = await User.findOne({
                email: req.body.email
            });

            if(!user){
                return res.status(404).json({
                    success: false,
                    message: "Enter valid email"
                })
            }
            
            //Create new contact
            const address = await AddressBook.create(req.body);

            //Add contact's id to the user's storedContacts array
            user.storedContacts.push(address._id);
            await user.save();

            return res.status(200).json({
                success: true,
                message: "Contact has been successfully created"
            });

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


const updateContact = async (req, res) => {
    try{
        //Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: errors.array()[0].msg,
        });
        }

        //Check whether the contact exists
        const address = await AddressBook.findOne({
            name: req.body.name
        });

        if(!address){
            return res.status(404)
                        .json({
                            success: false,
                            message: "Contact not found"
                        })
        }

        //Update the contact
        address.name = req.body.name;
        address.address = req.body.address;
        address.phoneNo = req.body.phoneNo;
        await address.save();

        return res.status(200).json({
            success: true,
            message: "Contact has been successfully updated"
        });

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const deleteContact = async (req, res) => {
    try{
            //Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: errors.array()[0].msg,
            });
            }

            const {name, email} = req.body;

            //Find user with emailId
            const user = await User.findOne({
                email: email
            });

            if(!user){
                return res.status(404).json({
                    success: false,
                    message: "Enter valid email"
                })
            }

            //Check whether the contact exists
            const address = await AddressBook.findOne({
                name: req.body.name
            });

            if(!address){
                return res.status(404)
                            .json({
                                success: false,
                                message: "Contact not found"
                            })
            }

            await AddressBook.deleteOne({
                name: name
            })

            user.storedContacts.pull(address._id);
            await user.save();

            return res.status(200).json({
                success: true,
                message: "Contact has been successfully deleted"
            });
   
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const getContact = async (req, res) => {
    try{
            const name = req.query.name;
            //Check whether the contact exists
            const address = await AddressBook.findOne({
                name: name
            });

            if(!address){
                return res.status(404)
                            .json({
                                success: false,
                                message: "Contact not found"
                            })
            }

            return res.status(200).json({
                success: true,
                message: "Contact has been successfully retrieved",
                contact: address
            });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const addBulkContact = async (req, res) => {
    try{
            const { contacts, email } = req.body;
        
            //Find user with emailId
            const user = await User.findOne({
                email: email
            });

            if(!user){
                return res.status(404).json({
                    success: false,
                    message: "Enter valid email"
                })
            }

            //Check if details are not empty
            for(i=0; i<contacts.length;i++){
                if(!contacts[i].hasOwnProperty("name") || !contacts[i].hasOwnProperty("address") || 
                    !contacts[i].hasOwnProperty("phoneNo") || contacts[i]["name"] === ""
                    || contacts[i]["address"] === "" || contacts[i]["phoneNo"] === ""){
                    return res.status(400).json({
                        success: false,
                        error: "Enter all details"
                    });
                }
            }

            //Insert into database
            for(i=0; i<contacts.length; i++){
                let addressExists = await AddressBook.findOne({
                    name: contacts[i]["name"]
                });
                if(!addressExists){
                    let addressUploaded = await AddressBook.create(contacts[i]); 
                    if(addressUploaded){
                        user.storedContacts.push(addressUploaded._id);
                    }
                }
                
            }
            await user.save();

            return res.status(200).json({
                success: true,
                message: "All contacts have been successfully inserted. Duplicate contacts have been ignored."
            });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const getAllContacts = async (req, res) => {
    try{
        const page = req.params.page;
        const limit = req.params.limit;
        
        //Paginate
        const contacts = await AddressBook.find()
                                            .limit(limit * 1)
                                            .skip((page - 1) * limit);
        return res.status(200)
                    .json({
                        success: true,
                        contacts: contacts
                    }) 

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const phaseMatch = async (req, res, next) => {
    try{
            const name = req.query.name;
            console.log()
            //New regular expression with i-case insensitive
            const regex = new RegExp(name, 'i');
            const contacts = await AddressBook.find({
                name: {$regex: regex}
            }) 

            return res.status(200)
                        .json({
                            success: true,
                            contacts: contacts
                        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = {
    addContact,
    updateContact,
    deleteContact,
    getContact,
    addBulkContact,
    getAllContacts,
    phaseMatch
}
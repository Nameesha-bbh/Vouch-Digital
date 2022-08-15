const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  User  = require('../models/user');
const { validationResult } = require('express-validator');
const Token = require('../models/token');

const register = async (req, res) => {
    try{
        //Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: errors.array()[0].msg,
        });
        }

        //Hash password
        req.body.password = await bcrypt.hash(req.body.password, 8);

        const user = await User.create(req.body);
        return res.status(200).json({
            success: true,
            message: "Account has been successfully created"
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const generateToken = (user) => {
    delete user.password;
    const token = jwt.sign(user , process.env.APP_KEY , { expiresIn:'30m' });
    return { ...user, ...{token} };
}

const login = async (req, res) => {
    
    try{
            
            const {email , password} = req.body; 
            //Check if email exists
            const user = await User.findOne({
                    email: email
            })


            if(!user){
                return res
                        .status(404)
                        .json(
                        {
                            success: false,
                            message : "User not found"
                        }
                )
            }
            //Check if password is correct
            if(!bcrypt.compareSync(password,user.password)){
                return res.status(401).json(
                    {
                        success: false,
                        message : "Incorrect Password"
                    }
                )
            }

            const userWithToken = generateToken(user.toJSON());

            await Token.create({
                token: userWithToken.token
            })

            return res.status(200)
                        .json({
                            success: true,
                            userWithToken: userWithToken,
                            message: "User successfully logged in"
                        });
    }
    catch(err){
            return res.status(500).json({
                success: false,
                message : err.message
            });
    }
        
    
}

module.exports = {
    register,
    login
}
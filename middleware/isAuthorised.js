const { JsonWebTokenError } = require('jsonwebtoken');
const Token = require('../models/token');
const tokenService = require('./verifyToken');

module.exports = async (req, res, next) => {
    try{

        //Access token from headers
        const header = req.get('Authorization');
        
        if (header === undefined) {
          return res.json({
            success: false,
            error: 'Please Authenticate',
          });
        }
  
        const token = header.split(' ')[1];

        //Verify the token
        const t = await tokenService.verifyToken(token);
        if (t instanceof JsonWebTokenError) {
            return res.json({ success: false, 
                error: 'Please Authenticate'
            });
        } 

        //Check if token exists in the database
        const isTokenPresent = await Token.findOne({
            token: token
        })

        if (!isTokenPresent) {
            return res.json({
              success: false,
              error: 'Please Authenticate',
            });
        }

        next();
 
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
    
}
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
const StoreAdmin = require('../models/storeAdmin.model');

exports.login = async (req,res) => {
    try{
        const {email, password} = req.body;

        let result ;
        await StoreAdmin.findOne({email}, (err, storeAdmin) => {
            if(err){
                result.error = `User doesn't exist, please register as an admin, ${err}`
             return  res.send(result)
            }
            bcrypt.compare(password, storeAdmin.password).then((match) => {
                if(match){
                    const payload  = {
                        email: storeAdmin.email,
                        role:"admin"
                    }
                    const options =  {
                        expiresIn: "30d",
                        issuer: "https://cloudmall.africa"
                    }
                    const secret = process.env.JWT_SECRET;
                    const token =  jwt.sign(payload, secret, options);
                    result.token = token;
                    result.message = "logged in as an admin";
                    result.data = storeAdmin;
                    return res.send(result);
                }
            })
        })
        

    }catch(error){
        console.error('error', error);
        res.send(error);
    }
}
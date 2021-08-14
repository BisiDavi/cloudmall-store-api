const jwt = require('jsonwebtoken');
const StoreAdmin = require('../models/storeAdmin.model');

exports.register = async (req,res) => {
    try{
        const {email,password }  = req.body;

        const doesAdminEmailExist =  await StoreAdmin.findOne({email});
        console.log('doesAdminEmailExist',doesAdminEmailExist);

        if(doesAdminEmailExist){
            return res.send("Email exist, please login or click on forgot password to change password")            
        }

        const storeAdmin  = new StoreAdmin({
            email,
            password,

        })

        await storeAdmin.save();
        const payload = {
            email,
            role:"admin",
        }
        const options = {
            expiresIn: "30d",
            issuer: "https://cloudmall.africa"
        }

        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, options);
        const result = {
            token,
            email,
            message: "register as an admin"
        }
        res.send(result)

    }catch(error){
        return res.send(error);
    }
}
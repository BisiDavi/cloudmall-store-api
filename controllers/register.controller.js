const jwt = require('jsonwebtoken');
const StoreAdmin = require('../models/storeAdmin.model');

exports.register = async (req,res) => {
    try{
        const {email,password }  = req.body;

        const doesAdminEmailExist =  await StoreAdmin.findOne({email});
        console.log('doesAdminEmailExist',doesAdminEmailExist);

        if(doesAdminEmailExist){
            return res.status(400).send({message:"Email exist, please login or click on forgot password to change password"})            
        }

        if(email === undefined || password === undefined){
            return res.send("Email and Password required");
        }

        const storeAdmin  = new StoreAdmin({
            email,
            password,

        })
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
            message: "registration successful"
        }
        await storeAdmin.save();
        res.status(200).send(result)

    }catch(error){
        return res.send(error);
    }
}
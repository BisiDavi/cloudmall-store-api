const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreAdminSchema = new Schema({
    email: String,
    password: String,
    role: {type:String, default:'admin'}
},{ 
    timestamps:true
})

StoreAdminSchema.pre('save', function(next){
    const storeAdmin = this;
    if(!storeAdmin.isModified || !storeAdmin.isNew){
        next()
    }else{
        bcrypt.hash(storeAdmin.password, 10, function(err,hash){
            if(err){
                console.error('Error hashing admin password', storeAdmin.email);
                next(err);
            }else{
                storeAdmin.password = hash;
                next()
            }
        })
    }
})

module.exports = mongoose.model('StoreAdmin', StoreAdminSchema)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    name:String,
    storeEmail:String,
    phoneNumber:String,
    address:String,
    storeType:String,
    openingDays:String,
    storeImage:String,   
    adminEmail:String 
}, {
    timestamps: true
})

module.exports = mongoose.model('Stores', StoreSchema)
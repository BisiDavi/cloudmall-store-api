const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    name:String,
    email:String,
    phoneNumber:String,
    address:String,
    storeType:String,
    openingDay:String,
    storeImage:String,    
}, {
    timestamps: true
})

module.exports = mongoose.model('Stores', StoreSchema)
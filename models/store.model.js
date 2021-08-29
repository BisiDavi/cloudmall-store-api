const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema(
  {
    storeName: String,
    storeEmail: String,
    phoneNumber: String,
    storeAddress: String,
    storeType: String,
    storeOwnerName: String,
    openingDays: String,
    storeOpenTime: String,
    storeImage: String,
    adminEmail: String,
    settlementPlan: String,
    bankName: String,
    accountNumber: String,
    accountName: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Stores", StoreSchema);

const Store = require("../models/store.model");

exports.findStore = async (req, res) => {
  try {
    const availableStores = await Store.find();
    res.status(200).send({ availableStores });
  } catch (error) {
    res
      .status(500)
      .send({ error, message: "unable to fetch available stores." });
  }
};

exports.createStore = async (req, res) => {
  const {
    storeName,
    storeEmail,
    phoneNumber,
    storeAddress,
    storeType,
    openingDays,
    storeImage,
    settlementPlan,
    bankName,
    accountNumber,
    accountName,
  } = req.body;
  if (storeEmail === undefined) {
    return res.status(400).send("Store email cannot be blank");
  }
  try {
    const checkForStore = await Store.find({ storeEmail });
    const adminEmail = req.decoded.email;
    if (checkForStore.length === 0) {
      const store = new Store({
        storeName,
        storeEmail,
        phoneNumber,
        storeAddress,
        storeType,
        openingDays,
        storeImage,
        adminEmail,
        settlementPlan,
        bankName,
        accountNumber,
        accountName,
      });
      await store.save();
      res.send(store);
    } else {
      return res.status(201).send("A store with that email exist.");
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ error, message: "unable to create a store" });
  }
};

exports.editStore = async (req, res) => {
  const { email } = req.body;
  const checkForStore = await Store.findOne({ email });

  try {
    if (checkForStore) {
      const store = Store.findOneAndUpdate({ _id: req.body.id }, req.body);
      return res.send("store updated", store);
    }
  } catch (error) {
    res.status(400).send({ error, message: "unable to update store" });
  }
};

exports.deleteStore = async (req, res) => {
  try {
    await Store.deleteOne({ _id: req.params.id });
    return res.send({ message: "store deleted" });
  } catch (error) {
    return res.status(400).send({ message: "Cannot delete store", error });
  }
};

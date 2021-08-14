const Store = require('../models/store.model');

exports.findStore = async (req,res) => {
    try{
        const availableStores = Store.find();
        res.status(200).send({availableStores})
    }catch(error){
        res.status(500).send({error, message:"unable to fetch available stores."})
    }
}

exports.createStore = async (req,res) => {
    const {name,storeEmail, phoneNumber, address, storeType, openingDays, storeImage} = req.body;
    const checkForStore = await Store.findOne({storeEmail});
    const adminEmail = req.decoded.email;
    console.log('adminEmail',adminEmail)
    try {
        if(checkForStore){
            return res.send("A store with that email exist.")
        }else{
            const store = new Store({
            name,
            storeEmail,
            phoneNumber,
            address,
            storeType,
            openingDays,
            storeImage,
            adminEmail
            })        
            await store.save()
            res.send(store);
        }
    }catch(error){
        console.log('error',error);
        res.status(500).send({error, message:"unable to create a store"})
    }
}

exports.editStore = async (req,res) => {
    const {email} = req.body;
    const checkForStore = await Store.findOne({email});

    try{
        if(checkForStore){
            const store = Store.findOneAndUpdate({_id:req.body.id}, req.body)                
            return res.send("store updated", store);
        }
    }catch(error){
        res.status(400).send({error, message:"unable to update store"})
    }
}

exports.deleteStore = async (req,res) => {
    try{
        await Store.deleteOne({_id:req.params.id});
        return res.status(204).send({message:"store deleted"})
    }catch(error){
        return res.status(400).send({message:"Cannot delete store", error})
    }
}

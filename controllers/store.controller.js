const Store = require('../models/store.model');

async function store(req,res) {

    const {name,email, phoneNumber, address, storeType, openingDays, storeImage} = req.body;

    const checkForStore = await Store.findOne({email});

    function findStore(){
        try{
            const availableStores = Store.find();
            res.status(200).send({availableStores})
        }catch(error){
            res.status(500).send({error, message:"unable to fetch available stores."})
        }
    }

    function createStore() {
        try {
            if(checkForStore){
                return res.send("A store with that email exist.")
            }else{
                const store = new Store({
                name,
                email,
                phoneNumber,
                address,
                storeType,
                openingDays,
                storeImage,
                })

                await store.save()
                res.send(store);
            }
        }catch(error){
            console.log('error',error);
            res.status(500).send({error, message:"unable to create a store"})
        }
    }

    function editStore() {
        try{
            if(checkForStore){
                const store = Store.findOneAndUpdate({_id:req.body.id}, req.body)                
                return res.send("store updated", store);
            }
        }catch(error){
            res.status(400).send({error, message:"unable to update store"})
        }
    }
    
    function deleteStore(){
        try{
            await Store.deleteOne({_id:req.params.id});
            return res.status(204).send({message:"store deleted"})
        }catch(error){
            return res.status(400).send({message:"Cannot delete store", error})
        }
    }

    return {
        createStore, editStore, deleteStore,findStore
    }
}

module.exports = store
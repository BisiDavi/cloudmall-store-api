const storeController = require('../controllers/store.controller');

const storeRoutes = {   
     getStores: (_router,validateToken) => {
        return _router.get('/store', validateToken, storeController.findStore)
    },

     createStore: (_router,validateToken) => {
       return _router.post('/store', validateToken, storeController.createStore)
    },

     patchStore: (_router,validateToken) => {
       return _router.patch('/store', validateToken, storeController.editStore)
    },

     deleteStore: (_router,validateToken) => {
       return _router.delete('/store',validateToken, storeController.deleteStore)
    },
}

module.exports = storeRoutes
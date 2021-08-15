const storeController = require('../controllers/store.controller');

const storeRoutes = {   
     getStores: (_router,validateToken,decodeToken) => {
        return _router.get('/store', validateToken,decodeToken, storeController.findStore)
    },

     createStore: (_router,validateToken,decodeToken) => {
       return _router.post('/store', validateToken, decodeToken,storeController.createStore)
    },

     patchStore: (_router,validateToken,decodeToken) => {
       return _router.patch('/store/:id', validateToken, decodeToken,storeController.editStore)
    },

     deleteStore: (_router,validateToken,decodeToken) => {
       return _router.delete('/store/:id',validateToken,decodeToken, storeController.deleteStore)
    },
}

module.exports = storeRoutes
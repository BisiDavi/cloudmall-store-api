const storeController = require('../controllers/store.controller');

function storeRoutes(_router,validateToken) {
     
    function getStores(){
        return _router.get('/store', validateToken, storeController.findStore())
    }

    function createStore(){
        _router.post('/store',validateToken, storeController.createStore())
    }

    function patchStore(){
        _router.patch('/store', validateToken, storeController.editStore())
    }

    function deleteStore(){
        _router.delete('/store',validateToken, storeController.deleteStore())
    }


    getStores();
    createStore(); 
    patchStore(); 
    deleteStore();
}

module.exports = storeRoutes
const express = require('express');
const router = express.Router();
const validateToken = require('../utils/validateToken').validateToken;

const storeRoutes = require('./store.routes');
const authRoutes  = require('./auth.routes');

 storeRoutes.createStore(router, validateToken);
 storeRoutes.getStores(router, validateToken);
 storeRoutes.patchStore(router, validateToken);
 storeRoutes.deleteStore(router, validateToken);

authRoutes.login(router);
authRoutes.register(router);


module.exports = router;
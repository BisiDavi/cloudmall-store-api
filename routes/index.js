const express = require('express');
const router = express.Router();
const validateToken = require('../utils/validateToken').validateToken;
const decodeToken = require('../utils/decodeToken').decodeToken


const storeRoutes = require('./store.routes');
const authRoutes  = require('./auth.routes');

 storeRoutes.createStore(router, validateToken,decodeToken);
 storeRoutes.getStores(router, validateToken,decodeToken);
 storeRoutes.patchStore(router, validateToken,decodeToken);
 storeRoutes.deleteStore(router, validateToken,decodeToken);

authRoutes.login(router);
authRoutes.register(router);


module.exports = router;
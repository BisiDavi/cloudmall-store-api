const authController = require('../controllers/login.controller');

const authRoute = {
    login : (_router) => {
        _router.post('/login', authController.login)
    },
    register : (_router) =>{
        _router.post('/register', authController.register)
    }
}

module.exports = authRoute;
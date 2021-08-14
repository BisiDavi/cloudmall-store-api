const authController = require('../controllers/login.controller');

const authRoute = {
    login : (_router) => {
        _router.post('/login', authController.login)
    }
}

module.exports = authRoute;
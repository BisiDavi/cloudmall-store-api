const loginController = require('../controllers/login.controller');
const registerController = require('../controllers/register.controller');


const authRoute = {
    login : (_router) => {
        return _router.post('/login', loginController.login)
    },
    register : (_router) =>{
       return  _router.post('/register', registerController.register)
    }
}

module.exports = authRoute;
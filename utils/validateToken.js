const jwt = require('jsonwebtoken');

module.exports = {
    validateToken: (req,res, next) => {
        const authorizationHeader = req.headers.authorization;
        const authCondition = authorizationHeader && authorizationHeader.split(' ')[0] === 'Bearer';
        let result;
        if(authCondition){
            const token = authorizationHeader.split(' ')[1];
            const options = {
                expiresIn: '30d',
                issuer: 'https://cloudmall.africa'
            };
            try{
                result = jwt.verify(token, process.env.JWT_SECRET, options);
                res.decoded = result;
                next();
            }catch(error){
                console.error('error',error);
                throw new Error(error);
            }
        }else{
            result = {
                error: `Authentication error, Token required`,
                status: 401
            }
            res.status(401).send(result)
        }
    }
}
const config = require('config');
const jwt = require('jsonwebtoken');


module.exports = function (req,res, next){
    //get token from the header

    const token  = req.header('x-auth-token');
    // check if token is not present 

    if(!token)
    {
       return res.status(401).json({msg:'No token,unauthorized'});

    }

    // if token is present then verfiy the token.

    try{

        const decoded = jwt.verify(token, config.get('jwtSecret')); // jwt verify function is used to verify the token
        req.user = decoded.user;
        next();

    } catch(err)
    {
        return res.status(401).json({msg:'Token is not valid'});

    }
}

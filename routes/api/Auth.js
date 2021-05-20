//add express router to route things up
const auth = require('../../middleware/auth')
const express= require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config'); // to get the config file details
const bcrypt= require('bcryptjs'); // encrypting passwords
const {check, validationResult} = require('express-validator');


//@route GET Auth/api
//@desc  Test Route
//@access Public

router.get('/',auth,async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err){
        console.error(err.message);
        res.status(500).send('server Error');
    }
});

//@route api/auth
//description validating the user

router.post('/',[
    
    check('email','Please enter a valid email').isEmail(),
    check('password','Password is required').exists()
                    ], // check on name
async (req,res)=>{
    const errors = validationResult(req); // validation errors
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array() }
        );
        
    }
// get user value to check if the user is already present

const {email,password} = req.body

try{
//see if user exists
let user = await User.findOne({email});

if (!user) {
 return res.status(400).json({errors:{msg:'Invalid Credentials'}});
}
 
const iscompare = await bcrypt.compare(password,user.password); //compare the password from db to the entered one

if(!iscompare)
{
    return res.status(400).json({errors:{msg:'Invalid Credentials'}});
}
//get Json web token

const payload = {
    user:{
        id:user.id
    }
}

//res.send('user registered');

// Json web token

jwt.sign(  
    payload,
    config.get('jwtSecret'),
    {expiresIn:36000},
    (err,token)=>{
        if(err) throw err;
        res.json({token});
    }
    );
//res.send('token');

} 

catch(err){
console.error(err.message)
res.status(500).res.send('server error');
}



    //res.send('user route');
})

module.exports = router;
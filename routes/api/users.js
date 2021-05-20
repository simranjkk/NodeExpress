//add express router to route things up

const express= require('express');
const router = express.Router();
const bcrypt= require('bcryptjs'); // encrypting passwords
const gravatar = require('gravatar'); 
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('config'); // to get the config file details

//express validator

const {check, validationResult} = require('express-validator');

//@route GET users/api
//@desc  Test Route
//@access Public

router.get('/',(req,res)=>res.send('User route'));

//@route POST users/api
//@desc Register

router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Please enter a valid email').isEmail(),
    check('password','password should be 5 characters or mor').isLength({min:5})
                    ], // check on name
async (req,res)=>{
    const errors = validationResult(req); // validation errors
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array() }
        );
        
    }
// get user value to check if the user is already present

const {name,email,password} = req.body

try{
//see if user exists
let user = await User.findOne({email});

if (user) {
 return res.status(400).json({errors:{msg:'User already Exists'}})
}
 const avatar = gravatar.url(email,
 {
s:'200',
r: 'pg',
d:'mm'
 }
 )

 user= new User({
     name,
     email,
     avatar
 });

//encrypt password

const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(password,salt);

await user.save(); // save the user details

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

} 

catch(err){
console.error(err.message)
res.status(500).res.send('server error')
}



    //res.send('user route');
}) 
module.exports = router;
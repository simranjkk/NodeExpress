//add express router to route things up

const express= require('express');
const router = express.Router();


//@route GET Post/api
//@desc  Test Route
//@access Public

router.get('/',(req,res)=>res.send('Post route'));

module.exports = router;
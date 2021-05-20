const express = require('express');
const connectDB = require('./config/db');
const app = express();

//connect db
connectDB();


app.get('/',(res,req)=>res.send('api running'));

//init middleware body parser

app.use(express.json({extended:false}));

//define routs
app.use('/api/users',require('./routes/api/users'));
app.use('/api/Auth',require('./routes/api/Auth'));

app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/Post',require('./routes/api/Post'));

const PORT = process.env.PORT || 6000;


//app.listen(PORT,()=> console.log('server started on PORT'+ PORT));

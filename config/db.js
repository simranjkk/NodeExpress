const mangoose = require('mongoose');
const config= require('config');

const db= config.get('mogoURL');

const connectDb = async () => 
{
    try{
        await mangoose.connect(db,
            { useNewUrlParser: true,
                useUnifiedTopology: true
                 });
        console.log('mogo connected');
    }

    catch(err){
        console.error(err.message);
        console.log('n');
        process.exit(1);
    }
}

module.exports =connectDb;
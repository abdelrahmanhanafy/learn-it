const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes');

dotenv.config();

const app = express();

(async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('DB connected successfully')
        const port = process.env.PORT;
        app.listen(port, ()=>{
            console.log(`App listen on port ${port}`)
        })
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
})();

app.use(express.json())

app.use('/api',router);

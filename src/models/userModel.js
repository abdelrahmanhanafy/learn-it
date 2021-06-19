const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    gender:{
        type:String
    },
    password:{
        type:String
    } 
});

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;
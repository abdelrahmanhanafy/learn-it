const userModel = require('../models/userModel');
const hashing = require('../helpers/hashing');
const { createAccessToken } = require('../helpers/token');
exports.signUp = async(req, res)=> {
    const {firstName, lastName, email, phoneNumber, gender,password} = req.body;

    const newUser = new userModel({firstName, lastName, email, phoneNumber, gender, password:await hashing.hashPassword(password)});
    await newUser.save();

    res.status(200).json({
        message:'User signed up successfully',
        data:newUser
    })
}

exports.login = async(req, res) => {
    const {email, password} = req.body;

    const userFound = await userModel.findOne({email});
    if(!userFound){
        return res.status(400).json({
            message:'User not registered'
        })
    };

    const checkPassword = await hashing.validatePassword(password, userFound.password);
    if(!checkPassword) {
        return res.status(400).json({
            message:'Error in email or password'
        });
    }

    const {_id, firstName, lastName, phoneNumber, gender} = userFound; 
    const token = await createAccessToken({
        _id, firstName, lastName, email, phoneNumber, gender
    })

    res.status(200).json({
        message:'User logged in successfully',
        data:token
    })
}
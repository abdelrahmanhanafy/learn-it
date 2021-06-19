const { body, validationResult } = require('express-validator');
const userModel = require('../models/userModel');

module.exports = {
    validate:(method)=>{
        switch(method){
            case 'addCategory':{
                return [
                    body('title','Title is required').exists(),
                    body('description','Description is required').exists(),
                    body('type','Type is required').exists().isIn(['CHARGING_CARD', 'BILL', 'COUPON_CODE']),
                    body('color','Color is required').exists().isIn(['RED','ORANGE','GREEN', 'PURPLE'])
                ]
            }
            case 'signUp':{
                return [
                    body('firstName', 'Please tell us your first-name').exists().trim(),
                    body('lastName', 'Please tell us your lastName').exists().trim(),
                    body('phoneNumber')
                    .exists()
                    .withMessage('Phone Number is required')
                    .trim() 
                    .isLength({min:11, max:11}) 
                    .withMessage('Phone number length must be 11 numbers')
                    .matches(/^(01)[0-9]{9}$/)
                    .withMessage('Phone number is invalid')
                    .custom(async (number)=>{
                        const userFound = await userModel.findOne({phoneNumber:number});
                        if(userFound){
                            throw new Error('Phone number is already in use!')
                        }
                    }),
                    body('email')
                    .exists()
                    .withMessage('Email is required')
                    .trim()
                    .isEmail()
                    .withMessage('Email is invalid')
                    .custom(async (email)=>{
                        const userFound = await userModel.findOne({email});
                        if(userFound){
                            throw new Error('Email is already in use!')
                        }
                    }),
                    body('password')
                    .exists()
                    .withMessage('Password is required')
                    .isLength({min:8})
                    .withMessage('Password must be at least 8'),
                    body('gender')
                    .exists()
                    .withMessage('Gender is required')
                    .isIn(['male','female'])
                    .withMessage('Gender value must be at least of male or female')

                ]
            }
            case 'login' : {
                return [
                    body('email')
                    .exists()
                    .withMessage('Email is required')
                    .trim()
                    .isEmail()
                    .withMessage('Email is invalid'),
                    body('password')
                    .exists()
                    .withMessage('Password is required')
                    .isLength({min:8})
                    .withMessage('Password must be at least 8'),

                ]
            }
        }
    },


    result:(req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()})
        }
        next();
    }
}
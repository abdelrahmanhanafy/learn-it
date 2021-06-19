const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    type:{
        type:String,
        enum:['CHARGING_CARD', 'BILL', 'COUPON_CODE']
    },
    icon:{
        type:String,
    },
    color:{
        type:String,
        enum:['RED','ORANGE','GREEN', 'PURPLE']
    }
});

const categoryModel = mongoose.model('Category', categorySchema);

module.exports = categoryModel;
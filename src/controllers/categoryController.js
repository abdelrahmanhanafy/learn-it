const categoryModel = require('../models/categoryModel')
const asyncHandler = require('../helpers/asyncHandler')

exports.addCategory = asyncHandler(async(req, res)=>{
        const {title, description, type, icon, color} = req.body;
        const category = new categoryModel({title, description, type, icon, color})
       await category.save();
        res.status(200).json({
            message:'Category is added successfully',
            data:category
        })
}) 

exports.getById = async(req, res)=>{
    const {id } = req.params;
    const category = await categoryModel.findOne({_id:id});
    res.status(200).json({
        message:'Category is retrieved successfully',
        data: category
    })
}

exports.getAll = async (req, res)=>{
    let {page, size, color, type} = req.query;

    page = parseInt(page) || 1;
    size = parseInt(size) || 5;

    const filter = !color && !type ? {} : !type ? {color} : !color ? {type} : {type, color};

    const categories = await categoryModel
    .find(filter)
    .skip(size * (page-1))
    .limit(size)
    return res.status(200).json({
        message:'Categories are fetched successfully',
        data:categories
    })
}

exports.update = async (req, res)=>{
    const {id} = req.params;
    const {title, description, color} = req.body;

    const update = {
        ...(title && {title}),
        ...(description && {description}),
        ...(color && {color})
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
        id, 
        update,
        {new :true})
    return res.status(200).json({
        message:'Category has been updated successfully',
        data: updatedCategory
    })
}

exports.delete = async(req, res)=>{
    const {id} = req.params;

    const deletedCategory = await categoryModel.findByIdAndUpdate(id);

    res.status(200).json({
        message:"Category is deleted successfully",
        data:deletedCategory
    })
}
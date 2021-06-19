const express = require('express');
const categoryController = require('./controllers/categoryController')
const userController = require('./controllers/userController')
const validation = require('./helpers/validator')

const router = express.Router();

//Category
router.post(
'/category/add',
validation.validate('addCategory'),
validation.result,
categoryController.addCategory)

router.get('/category/all', categoryController.getAll)
router.get('/Category/:id', categoryController.getById)
router.patch('/category/:id',categoryController.update)
router.delete('/category/:id',categoryController.delete)

//User && Auth
router.post('/auth/sign-up', validation.validate('signUp'), validation.result, userController.signUp)
router.post('/auth/login',validation.validate('login'),validation.result, userController.login)



module.exports = router;
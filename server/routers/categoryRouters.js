const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController.js');
//const verifyToken = require('./path/to/auth').verifyToken;

router.get('/', categoryController.getAllCategories_controller);
router.post('/', categoryController.addCategory_controller);
router.put('/', categoryController.updateCategory_controller);
router.delete('/del/:catKey', categoryController.deleteCategory_controller);


//router.delete('/category/:id', verifyToken, categoryController.deleteCategory);

module.exports = router;
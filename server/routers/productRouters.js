const express = require('express');
const router = express.Router();
const productController = require('../controller/productController.js');

router.get('/:catKey', productController.getAllProductInOneCat_controller);
router.post('/parent', productController.getAllProductInArrayCat_controller);

router.post('/', upload.single('foto'), productController.addProductToCat_controller);
router.put('/', upload.single('foto'), productController.updateProduct_controller); // обновление товара // можно и без файла обновлять (если его нет)
router.delete('/', productController.deleteProduct_controller);

module.exports = router;
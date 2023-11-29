//const verifyToken = require('./path/to/auth').verifyToken;
const { getProductInCat, getProductInCatArray,} = require('../azure/apiAzure-prod.js');

const getAllProductInOneCat_controller = async (req, res) => {
    try {
        const catKey = req.params.catKey;
        // валидация идентификатора категории ?
        const products = await getProductInCat(catKey);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const getAllProductInArrayCat_controller = async (req, res) => { // cписок товаров для нескольких категорий сразу
    try {
        const catKeys = req.body;
        const products = await getProductInCatArray(catKeys);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const addProductToCat_controller = async (req, res) => { // одбавление товара
    try {
        const { nameForm, priceForm, catForm } = req.body;
        const file = req.file;
        // валидации

        if (!file) {
            return res.status(400).send('Dont search File');
        }
        // Обработка и загрузка файла на Azure Blob Storage
        
        res.status(200).json('Its all okey imgUrl - ');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateProduct_controller = async (req, res) => {
    try {
        const { nameForm, priceForm, catForm } = req.body;
        const file = req.file;
        // валидации

        if (!file) {
            // пофиг - значит не обновляем фото товара
        } else {
            // а тут не пофиг - загружаем, делаем новое превью и сохр. в блобе
        }
        res.status(200).json('Its all okey imgUrl - ');
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const deleteProduct_controller = async (req, res) => {
    try {
        const { idProduct} = req.body;
        // валидация айди товара ?!?!

        // для удаления есть айди товара (RowKey)
        // на сначала прочитаем данные о товаре
            // удалим из болба фотографии товара
            // удалим запись о товаре на таблице
        res.status(200).json('Its ok ');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllProductInOneCat_controller,
    getAllProductInArrayCat_controller,
    addProductToCat_controller,
    updateProduct_controller,
    deleteProduct_controller
};
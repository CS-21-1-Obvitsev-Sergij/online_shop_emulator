//const verifyToken = require('./path/to/auth').verifyToken;
const { getProductInCat, getProductInCatArray, addNewProduct} = require('../azure/apiAzure-prod.js');
const { uploadFoto,} = require('../azure/apiAzure-blob.js');
const { v4: uuidv4 } = require('uuid');

const getAllProductInOneCat_controller = async (req, res) => {
    try {
        const catKey = req.params.catKey;
        const toReturn = {err:false, msg:'', data:{}};
        // валидация идентификатора категории ?
        const products = await getProductInCat(catKey);
        if (!products.err) {
            toReturn.data = products.data;
        } else {
            toReturn.err = true;
            toReturn.msg = 'Error in getAllproductIn OneCat \n' + products.msg;
        }
        res.status(200).json(toReturn);
    } catch (error) {
        res.status(200).json({err:true, msg:error.message});
    }
}
const getAllProductInArrayCat_controller = async (req, res) => { // cписок товаров для нескольких категорий сразу
    try {
        const toReturn = {err:false, msg:'', data:{}};
        const catKeys = req.body;
        const products = await getProductInCatArray(catKeys);
        if (!products.err) {
            toReturn.data = products.data;
        } else {
            toReturn.err = true;
            toReturn.msg = 'Error in getProductInCatArray \n' + products.msg;
        }

        res.status(200).json(toReturn);
    } catch (error) {
        res.status(200).json({err:true, msg:error.message});
    }
}
const addProductToCat_controller = async (req, res) => { // одбавление товара
    try {
        console.log('In add controller PRODUCT ');
        const { name, price, cat } = req.body;
        const file = req.file;
        const toReturn = {err:false, msg:'', data:{}};
        // валидации

        if (!file) {
            return res.status(200).json({err:true, msg: 'Dont search File', data:{}})
        }
        // Обработка и загрузка файла на Azure Blob Storage
        console.log('File is exists - OK');
        const fileName = uuidv4();//file.originalname; 
        console.log('File name - ', fileName);
        const fotoUrl = await uploadFoto(file, fileName);
        if (!fotoUrl.err){
            console.log('Upload url - ', fotoUrl);

            // создаем запись в таблице
            toReturn.data = {
                id: uuidv4(),
                name:name,
                price:price,
                cat: cat,
                imageUrl: fotoUrl.data,
                thumbUrl: 'none'
            }
            //console.log('VSE OK. toReturn = ', toReturn);
            const result = await addNewProduct(toReturn.data);
            if (!result.err) {
                toReturn.err = false;
                //console.log('VSE OK. toReturn = ', toReturn);
                return res.status(200).json(toReturn);
            } else {
                toReturn.err = true;
                toReturn.msg = 'Upload file - complete. Error in add entity to Table Product. \n' + result.msg;
                console.log('Error ---- ', toReturn.msg);
            }
        } else {
            toReturn.err = true;
            toReturn.msg = 'Error with upload file. \n ' + fotoUrl.msg;
        }
        
        res.status(200).json(toReturn);
    } catch (error) {
        res.status(200).json({err:true, msg:error.message});
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
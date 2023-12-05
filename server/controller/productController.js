//const verifyToken = require('./path/to/auth').verifyToken;
const { getProductInCat, getProductInCatArray, addNewProduct, updateProduct, deleteProductInCat} = require('../azure/apiAzure-prod.js');
const { uploadFoto, deleteFoto} = require('../azure/apiAzure-blob.js');
const { addMessageToQueue, } = require('../azure/apiAzure-queue.js');
const { v4: uuidv4 } = require('uuid');

const nameQ = process.env.NAME_QUEUE;
const tableName = process.env.TABLE_NAME_PRODUCT;

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
        const { name, price, cat } = req.body;
        const file = req.file;
        const toReturn = {err:false, msg:'', data:{}};
        // валидации
        
        if (!file) {
            return res.status(200).json({err:true, msg: 'Dont search File', data:{}})
        }
        // Обработка и загрузка файла на Azure Blob Storage
        //console.log('File is exists - OK');
        const fileName = uuidv4();//file.originalname; 
        //console.log('File name - ', fileName);
        const fotoUrl = await uploadFoto(file, fileName);
        if (!fotoUrl.err){
            //console.log('Upload url - ', fotoUrl);

            // создаем запись в таблице
            toReturn.data = {
                id: uuidv4(),
                name:name,
                price:price,
                cat: cat,
                imageUrl: fotoUrl.data,
                thumbUrl: 'none'
            }
            // отправляем сообщение в очередь на ресайз
            const message = {
                imageUrl: fotoUrl.data,
                partitionKey: cat,
                rowKey: toReturn.data.id,
                tableName: tableName
            };
            const resQ = await addMessageToQueue(nameQ, message);
            console.log('RES QUEUE - ', resQ);
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
        console.log('update. body ');
        const { id, name, price, cat, imageUrl, thumbUrl } = req.body;
        const toReturn = {err:false, msg:'', data:{}};
        const file = req.file;
        let result;

        const toUpdate = { id , name, price, cat, imageUrl, thumbUrl };

        if (!file) {
            // пофиг - значит не обновляем фото товара
        } else {
            // ищем имя болба/файла
            const urlImageParts = imageUrl.split('/');
            const blobImageName = urlImageParts[urlImageParts.length - 1];
            // удаляем с тарое фото
            //console.log('FILE MUST be update. File - ', blobImageName);
            result = await deleteFoto(blobImageName);
            if (result.err) {
                toReturn.err = true;
                toReturn.msg += 'Erro in delete imageUrl \n' + result.message;
            }
            if (thumbUrl != 'none') {
                const thumbUrlParts = thumbUrl.split('/');
                const blobthumbName = thumbUrlParts[thumbUrlParts.length - 1];
                result = await deleteFoto(blobthumbName);
                if (result.err) {
                    toReturn.err = true;
                    toReturn.msg += '\nErro in delete thumbUrl \n' + result.message;
                }
            }
            // а тут не пофиг - загружаем, делаем новое превью и сохр. в блобе
            const fileName = uuidv4();//file.originalname; 
            const fotoUrl = await uploadFoto(file, fileName);
            toUpdate.imageUrl = fotoUrl.data;

            const message = {
                imageUrl: toUpdate.imageUrl,
                partitionKey: toUpdate.cat,
                rowKey: toUpdate.id,
                tableName: tableName
            };
            await addMessageToQueue(nameQ, message);
        }
        
        result = await updateProduct(toUpdate);
        toReturn.err = result.err;
        toReturn.msg = result.msg;

        res.status(200).json(toReturn);
    } catch (error) {
        res.status(200).json({err:true, msg:error.message});
    }
}


const deleteProduct_controller = async (req, res) => {
    try {
        const { id, name, price, cat, imageUrl, thumbUrl } = req.body;
        const toReturn = {err:false, msg:'', data:{}};
        let result;
        // валидация айди товара ?!?!  -- не сейчас 

        // для удаления есть айди товара (RowKey)
        // на сначала прочитаем данные о товаре
            // удалим из болба фотографии товара
            // удалим запись о товаре на таблице

        const urlImageParts = imageUrl.split('/');
        const blobImageName = urlImageParts[urlImageParts.length - 1];
            
        result = await deleteFoto(blobImageName);
        if (result.err) {
            toReturn.err = true;
            toReturn.msg += 'Erro in delete imageUrl \n' + result.message;
        }
        if (thumbUrl != 'none') {
            const thumbUrlParts = thumbUrl.split('/');
            const blobthumbName = thumbUrlParts[thumbUrlParts.length - 1];
            result = await deleteFoto(blobthumbName);
            if (result.err) {
                toReturn.err = true;
                toReturn.msg += '\nErro in delete thumbUrl \n' + result.message;
            }
        }
        result = await deleteProductInCat(cat, id);
        toReturn.err = result.err;
        toReturn.msg += result.message;

        res.status(200).json(toReturn);
    } catch (error) {
        res.status(200).json({err:true, msg:error.message});
    }
}

module.exports = {
    getAllProductInOneCat_controller,
    getAllProductInArrayCat_controller,
    addProductToCat_controller,
    updateProduct_controller,
    deleteProduct_controller
};
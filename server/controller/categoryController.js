//require('dotenv').config();
//const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { addCategory, getCategories, updateCategory, deleteCategory, getOneEntity} = require('../azure/apiAzure-cat.js');

//const response = {
//    err: false,
//    msg: '',
//    data:null
//}

const addCategory_controller = async (req, res) => {
    try {
        const newCategory = req.body;
        // проверка на наличие такого ключа категории
        let  result = await getOneEntity();
        if (result.entity.rowKey === newCategory.key) {
            res.status(200).json({
                err: true,
                msg: 'Category whith this key ('+newCategory.key+') - alredy exists'
            });
        }

        result = await addCategory(newCategory);

        if (result.err) {
            res.status(200).json({
                err: true,
                msg: result.msg
            });
        }

        res.status(200).json({
            err: false,
            msg: '',
            data: newCategory
        });
      } catch (error) {
            res.json({
                err: true,
                msg: error.message
            });
      }
}

const updateCategory_controller = async (req, res) => {
    try {
        const dataCategory = req.body;
        const result = await updateCategory(dataCategory);
        res.json({
            err: result.err,
            msg: result.msg,
            data: categoryData
        });
    } catch (error) {
        res.json({
            err: true,
            msg: error.message,
        });
    }
}
const getAllCategories_controller = async (req, res) => {
    try {
        const result = await getCategories(); 
        //console.log('result cat -', result);
        res.json({
            err: result.err,
            msg: result.msg,
            data: result.data
        });
    } catch (error) {
        res.json({
            err: true,
            msg: error.message,
        });
    }
}
const deleteCategory_controller = async (req, res) => {
    try {
        const catKey = req.params.catKey;
        // валидация ключа ?!
       const result = await deleteCategory({partitionKey:'category', rowKey:catKey});
        res.json({
            err: result.err,
            msg: result.msg,
            data: result.catKey
        });
    } catch (error) {
        res.json({
            err: true,
            msg: error.message,
        });
    }
}
module.exports = {
    addCategory_controller,
    updateCategory_controller,
    getAllCategories_controller,
    deleteCategory_controller
};
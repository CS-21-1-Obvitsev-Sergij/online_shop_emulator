//require('dotenv').config();
//const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { addCategory, getCategories, updateCategory, deleteCategory, getOneEntity, deleteOneCategory, getCategoriesWhithParent} = require('../azure/apiAzure-cat.js');
const { deleteProductInCat,} = require('../azure/apiAzure-prod.js');
//const response = {
//    err: false,
//    msg: '',
//    data:null
//}

const addCategory_controller = async (req, res) => {
    try {
        const newCategory = req.body;
        console.log('REQ newCategory - ', newCategory);
        // проверка на наличие такого ключа категории
        let  result = await getOneEntity({partitionKey:'category', rowKey:newCategory.key});
        console.log('проверка на наличие такого ключа категории result - ', result);

        if (result.err) {
            res.status(200).json({
                err: true,
                msg: result.msg
            });
            return;
        }

        if (result.data.rowKey === newCategory.key) {
            res.status(200).json({
                err: true,
                msg: 'Category whith this key ('+newCategory.key+') - alredy exists'
            });
            return;
        } 
        
        result = await addCategory(newCategory);

        res.status(200).json(result);
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
            data: result.data
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
        let result = {};
        const toReturn = {err: false, msg: '', data: result.catKey};
        //console.log('front send catKey to delete. catKey - ', catKey);
        // валидация ключа ?!
        // 1 - прочитать данные про катгеорию с таблицы
        //console.log('read cat info with key - ', catKey);
        result = await getOneEntity({partitionKey:'category', rowKey:catKey});
        //console.log('Info cat  - ', result.data.ParentCategory);
        //console.log('test - ', Object.keys(result.data).length);
        //console.log('Not Error. Data is empty - ', isEmpty(result.data));
        // error
        if (!result.err) {
            //console.log('Not Error. Data is empty - ', isEmpty(result.data));
            if (Object.keys(result.data).length === 0) {
                //console.log('Cat is not FOUND !!!');
                toReturn.err = true;
                toReturn.msg = `Category not Found with key <${catKey}>`;
                toReturn.data = {};
            } else  {
                // нашли категорию
                //console.log('Category is founded, catInfo - ', result.data);
                if (result.data.ParentCategory == 'null') {
                    //console.log('Это родительская категория - надо искать вложеные ...');
                    const resChildCat = await getCategoriesWhithParent(catKey);
                    if (!resChildCat.err) {
                        let resChildError = false;
                        if (resChildCat.data.length > 0){
                            // удалаяем детей
                            let delChildPromises = resChildCat.data.map(cat => deleteOneCategory(cat.rowKey));
                            let delChild = await Promise.all(delChildPromises);
                            resChildError = delChild.some(item => item.err === true);
                        }
                        if (!resChildError) {
                                // удалаяем рожительскую
                                const resDelParentCat = await deleteOneCategory(catKey);
                                if (!resDelParentCat.err) {
                                    toReturn.err = false;
                                } else {
                                    toReturn.err = true;
                                    toReturn.msg = 'Delete product in Category - done. \n Error - delete category.\n' + resDelParentCat.msg;
                                }
                        } else {
                            toReturn.err = true;
                            toReturn.msg = 'Error in delete child category!';
                        }
                    } else {
                        toReturn.err = true;
                        toReturn.msg = 'Error in get child cats list.\n' + toReturn.msg;
                    }
                    
                } else {
                    //console.log('ктаегория с товарами -  надо удалить товары и потом категорию');
                    const resDeleteProduct  = await deleteProductInCat(catKey);
                    if (!resDeleteProduct.err) {
                        const resDeleteCategory = await deleteOneCategory(catKey);
                        if (!resDeleteCategory.err) {
                            toReturn.err = false;
                        } else {
                            toReturn.err = true;
                            toReturn.msg = 'Delete product in Category - done. \n Error - delete category.\n' + resDeleteCategory.msg;
                        }
                    } else {
                        toReturn.err = true;
                        toReturn.msg = 'Error in delete products in cat \n' + resDeleteProduct.msg;
                    }
                    
                }
            }
        } else {
            //console.log('ERRRORR !');
            toReturn = {err: true, msg: result.msg, data:{}};
        }
        
        res.json(toReturn);

    } catch (error) {
        
        //console.log(error.message);
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
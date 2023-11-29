//require('dotenv').config();
//const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { addCategory, getCategories, updateCategory, deleteCategory} = require('../azure/apiAzure-cat.js');

const addCategory_controller = async (req, res) => {
    try {
        const newCategory = req.body; 
        await addCategory(newCategory);
        res.status(201).send(newCategory);
      } catch (error) {
        res.status(500).send(error.message);
      }
}
const updateCategory_controller = async (req, res) => {
    try {
        const dataCategory = req.body;
        await updateCategory(dataCategory);
        res.send(categoryData);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const getAllCategories_controller = async (req, res) => {
    try {
        const categories = await getCategories(); 
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const deleteCategory_controller = async (req, res) => {
    try {
        const catKey = req.params.catKey;
        // валидация ключа ?!
        await deleteCategory(dataCategory);
        res.status(200).send('ok del cat and del XX products');
    } catch (error) {
        res.status(500).send(error.message);
    }
}
module.exports = {
    addCategory_controller,
    updateCategory_controller,
    getAllCategories_controller,
    deleteCategory_controller
};
const express = require('express');
const router = express.Router();
require('dotenv').config();
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { addCategory, getCategories, updateCategory, } = require('../azure/apiAzure-cat.js');

//const verifyToken = require('./path/to/auth').verifyToken;

router.post('/', async (req, res) => {
    try {
        const newCategory = req.body; 
        //console.log('SERVER POST CAT - ', newCategory);
        await addCategory(newCategory);
        res.status(201).send(newCategory);
      } catch (error) {
        res.status(500).send(error.message);
      }
});

router.put('/', async (req, res) => {
    try {
        
        const dataCategory = req.body;
        console.log('SERVER PUT CAT - ', dataCategory);
        await updateCategory(dataCategory);
        
        res.send(categoryData);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//app.delete('/category/:id', verifyToken, categoryController.deleteCategory);
router.delete('/', async (req, res) => {
    res.status(200).send('Delete category');
});

router.get('/', async (req, res) => {
    try {
        
        const categories = await getCategories(); 
        //console.log('SERVER (ROUTER) GET CAT - ', categories);
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { getProductInCat, getProductInCatArray,} = require('../azure/apiAzure-prod.js');
//const verifyToken = require('./path/to/auth').verifyToken;

router.get('/:catKey', async (req, res) => {
    try {
        const catKey = req.params.catKey;
        console.log('SERVER GET Product - ', catKey);
        // Здесь логика получения категорий из базы данных или другого источника
       
        const products = await getProductInCat(catKey);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/parent', async (req, res) => {
    try {
        const catKeys = req.body;
        console.log('SERVER GET ARRAY roduct - ', catKeys);
       
        const products = await getProductInCatArray(catKeys);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
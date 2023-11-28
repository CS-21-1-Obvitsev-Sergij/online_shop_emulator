const express = require('express');
const router = express.Router();
const { getProductInCat, } = require('../azure/apiAzure-prod.js');
//const verifyToken = require('./path/to/auth').verifyToken;

router.get('/:catKey', async (req, res) => {
    try {
        const catKey = req.params.catKey;
        console.log('SERVER GET Product - ', catKey);
        // Здесь логика получения категорий из базы данных или другого источника
       
        const products = await getProductInCat(catKey);
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
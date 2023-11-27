const express = require('express');
const router = express.Router();
//const verifyToken = require('./path/to/auth').verifyToken;

router.get('/', async (req, res) => {
    try {
        console.log('SERVER GET Product - ');
        // Здесь логика получения категорий из базы данных или другого источника
        const products = []; 
        res.json(categories);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
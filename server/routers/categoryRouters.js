const express = require('express');

const router = express.Router();
const verifyToken = require('./path/to/auth').verifyToken;

router.post('/', (req, res) => {
    res.status(200).send('Post category');
});

router.put('/', (req, res) => {
    res.status(200).send('Put category');
});

//app.delete('/category/:id', verifyToken, categoryController.deleteCategory);
router.delete('/', (req, res) => {
    res.status(200).send('Delete category');
});

router.get('/', (req, res) => {
    res.status(200).send('Get category');
});

module.exports = router;
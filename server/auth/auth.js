/*
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

function generateToken(user) {
    // Здесь должна быть логика для создания JWT
  }
  

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('Токен не предоставлен');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send('Ошибка при аутентификации токена');
    }
    req.userId = decoded.id;
    next();
  });
}


// Роут для входа в систему
router.post('/login', (req, res) => {
    // Логика аутентификации и выдача токена
  });
  
  // Роут для регистрации
  router.post('/register', (req, res) => {
    // Логика регистрации пользователя
  });

  module.exports = router;
//app.delete('/category/:id', verifyToken, categoryController.deleteCategory);



*/
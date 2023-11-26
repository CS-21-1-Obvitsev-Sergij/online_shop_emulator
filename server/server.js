const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); // подключаем .env с паролями и ключами
const authRouter = require('./auth/auth.js');

//const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;


const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 

const categoryRouter = require('./routers/categoryRouters');
const productRouter  = require('./routers/productRouters');
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

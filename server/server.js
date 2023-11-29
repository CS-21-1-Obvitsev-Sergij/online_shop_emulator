const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const authRouter = require('./auth/auth.js');


const app = express();

const categoryRouter = require('./routers/categoryRouters.js');
const productRouter  = require('./routers/productRouters.js');

app.use(cors()); // пока поставим глобально междоменное
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/category', categoryRouter);
app.use('/product', productRouter);
//app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('start :)');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    // проверка флага о наличии инициализации
    // инициализация таблиц
      //await createTableIfNotExists(tableName);
      console.log(`Server is running on port ${PORT}`);
  } catch (error) {
      console.error('Ошибка при создании таблицы:', error);
  }
});

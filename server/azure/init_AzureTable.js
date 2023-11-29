require('dotenv').config();
const connectionString = "UseDevelopmentStorage=true";
const tableName = process.env.TABLE_NAME_CATEGORY;
const { TableClient } = require("@azure/data-tables");
const client = TableClient.fromConnectionString(connectionString, tableName);

// начальная настройка АЗУРЕ - создание/проверка наличия таблиц 
// заполнение их начальнымитестовыми данными

const initTable = async () => {
    
}

module.exports = {
    initTable,
};
require('dotenv').config();
const connectionString = "UseDevelopmentStorage=true";
const tableName = process.env.TABLE_NAME_CATEGORY;
const { TableClient } = require("@azure/data-tables");
const client = TableClient.fromConnectionString(connectionString, tableName);

const getCategories = async ()=> {
    
    
    await client.createTable(tableName, {
        onResponse: (response) => {
          if (response.status === 409) {
            console.log(`Table ${tableName} already exists`);
          }
        }
      });

    let entitiesIter = client.listEntities();
    let i = 1;
    const catArray = [];
    for await (const entity of entitiesIter) {
        //console.log(`Entity${i}: Name: ${entity.Name} RowKey: ${entity.rowKey}`);
        i++;
        const item = {
            key: entity.rowKey,
            name: entity.Name,
            parent: entity.ParentCategory
        }
        catArray.push(item);
    }
    //console.log('Cat in SERVER - ', catArray);
    return catArray;
}

const addCategory = async (cat) => {
    try {

        if (cat.parent == 'None') {
            cat.parent = 'null';
        }

        const testEntity = {
            PartitionKey: "category",
            RowKey: cat.key,
            Name: cat.name,
            ParentCategory: cat.parent
          };
        await client.createEntity(testEntity);
    } catch {

    }
}

const updateCategory = async (cat) => {
    try {

        if (cat.parent == 'None') {
            cat.parent = 'null';
        }

        const testEntity = {
            partitionKey: "category",
            rowKey: cat.key,
            Name: cat.name,
            ParentCategory: cat.parent
          };
        console.log('puputja UPDATE testEntewti = ', testEntity);
        await client.updateEntity(testEntity, "Replace");

        
    } catch {

    }
}

const deleteCategory = async (catKey) => {
    try {
        // удалить можно нижнюю категорию, а можно заглавную (с подкатегориями)
        // в категории могут быть товары, а могут не быть

        // 1 - прочитать данные про катгеорию с таблицы

        // 2 - если parent ==null Значить заглавная категория
            // 2 - а получить список подкатегорий
            // 2 - б удалить все подкатегории
            // 2 - с удалить все товары с этими категориями

        // 3 - если парент что тесть - значит  не заглавная
            // 3 - а удалить все товары для этой категории ?!?
        return catKey;
    } catch(error) {

    }
}

  module.exports = {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
};
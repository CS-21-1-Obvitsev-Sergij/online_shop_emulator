require('dotenv').config();
const { TableClient } = require("@azure/data-tables");
const connectionString = "UseDevelopmentStorage=true";
const tableName = process.env.TABLE_NAME_CATEGORY;
const client = TableClient.fromConnectionString(connectionString, tableName);



const getCategories = async ()=>{
    
    
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

  module.exports = {
    getCategories,
    addCategory,
    updateCategory
};
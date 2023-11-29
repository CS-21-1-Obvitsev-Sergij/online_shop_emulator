require('dotenv').config();
const { TableClient, odata } = require("@azure/data-tables");
const connectionString = "UseDevelopmentStorage=true";
const tableName = process.env.TABLE_NAME_PRODUCT;
const client = TableClient.fromConnectionString(connectionString, tableName);



const getProductInCat = async (prodCat)=>{  //partitionKey
    
    const filter = odata`PartitionKey eq ${prodCat}`;
    const products = [];
    console.log(filter);
   
    const entities = client.listEntities({
        queryOptions: { filter: filter }
    });

    for await (const entity of entities) {
        products.push(entity);
    } 

    return products;
}

const getProductInCatArray = async (prodCats)=>{  //partitionKey
    
    const filter = prodCats.map(key => odata`PartitionKey eq ${key}`).join(' or ');
    const products = [];
    console.log(filter);
   
    const entities = client.listEntities({
        queryOptions: { filter: filter }
    });

    for await (const entity of entities) {
        products.push(entity);
    } 

    return products;
}

  module.exports = {
    getProductInCat,
    getProductInCatArray,
    
};
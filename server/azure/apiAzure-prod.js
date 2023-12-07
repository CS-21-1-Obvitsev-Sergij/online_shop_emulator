/*require('dotenv').config();
const { TableClient, odata } = require("@azure/data-tables");
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;//"UseDevelopmentStorage=true";
const tableName = process.env.TABLE_NAME_PRODUCT;
const client = TableClient.fromConnectionString(connectionString, tableName);
*/

require('dotenv').config();
const { TableClient, AzureNamedKeyCredential, odata } = require("@azure/data-tables");

const accountName = process.env.AZURE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_ACCOUNT_KEY;
const tableNameProduct = process.env.TABLE_NAME_PRODUCT;
const tableEndpoint = process.env.AZURE_TABLE_POINT;

const credentials = new AzureNamedKeyCredential(accountName, accountKey);
const client = new TableClient(tableEndpoint, tableNameProduct, credentials, { allowInsecureConnection: true });


const getProductInCat = async (prodCat)=>{  //partitionKey

    try {
        const filter = odata`PartitionKey eq ${prodCat}`;
        const products = [];
        console.log(filter);
    
        const entities = client.listEntities({
            queryOptions: { filter: filter }
        });

        for await (const entity of entities) {
            const prod = {  id:     entity.rowKey,
                            name:   entity.name,
                            price:  entity.price,
                            cat:    entity.partitionKey,
                            imageUrl: entity.imageUrl,
                            thumbUrl: entity.thumbUrl
                        }
            products.push(prod);
        } 
        console.log('Get from table product - ', products);
        return {err:false, msg:'', data:products}
    } catch(err) {
        console.log('Get from table product ERROR - ', err.message);
        return {err:true, msg:err.message}
    }
}

const getProductInCatArray = async (prodCats)=>{  //partitionKey
    try {
        const filter = prodCats.map(key => odata`PartitionKey eq ${key}`).join(' or '); // limit 15
        const products = [];
        console.log(filter);
    
        const entities = client.listEntities({
            queryOptions: { filter: filter }
        });

        for await (const entity of entities) {
            const prod = {  id:     entity.rowKey,
                            name:   entity.name,
                            price:  entity.price,
                            cat:    entity.partitionKey,
                            imageUrl: entity.imageUrl,
                            thumbUrl: entity.thumbUrl
                        }
            products.push(prod);
        } 

        return {err:false, msg:'', data:products}
    } catch(err) {
        return {err:true, msg:err.message}
    }
    
}

const addNewProduct = async (product) => {
    try {
        const entity = {
            partitionKey: product.cat,
            rowKey:       product.id,
            name:         product.name,
            price:        product.price,
            imageUrl:     product.imageUrl,
            thumbUrl:     product.thumbUrl
          };

        await client.createEntity(entity);

        return { err: false,
                   msg: ''
        };

    } catch(err){
        return {err:true, msg: err.message}
    }
};

const updateProduct = async (product) => {
    try {
        const entity = {
            partitionKey: product.cat,
            rowKey:       product.id,
            name:         product.name,
            price:        product.price,
            imageUrl:     product.imageUrl,
            thumbUrl:     product.thumbUrl
          };
        await client.updateEntity(entity); 

        return { err: false,
              msg: '',
              data: null
        };

    } catch(err){
        console.log('error update - ', err);
        return {err:true, msg: err.message}
    }
};

const deleteProductInCat = async (partitionKey, rowKey)=> {
    try {

        await client.deleteEntity(partitionKey, rowKey);
        return { err: false,
            msg: '',
            data: null
      };
    } catch(err) {
        return {err:true, msg:err.message, data:{partitionKey, rowKey}};
    }
}

  module.exports = {
    getProductInCat,
    getProductInCatArray,
    deleteProductInCat,
    addNewProduct,
    updateProduct,
    
};
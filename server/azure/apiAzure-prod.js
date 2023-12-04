require('dotenv').config();
const { TableClient, odata } = require("@azure/data-tables");
const connectionString = "UseDevelopmentStorage=true";
const tableName = process.env.TABLE_NAME_PRODUCT;
const client = TableClient.fromConnectionString(connectionString, tableName);



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

        return {err:false, msg:'', data:products}
    } catch(err) {
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
            PartitionKey: product.cat,
            RowKey:       product.id,
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
        return {err:true, msg:err.message};
    }
}

  module.exports = {
    getProductInCat,
    getProductInCatArray,
    deleteProductInCat,
    addNewProduct,
    updateProduct,
    
};
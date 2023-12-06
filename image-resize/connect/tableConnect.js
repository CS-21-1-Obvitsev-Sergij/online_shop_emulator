require('dotenv').config();
const { TableClient } = require("@azure/data-tables");
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const tableName = process.env.TABLE_NAME_PRODUCT;
const client = TableClient.fromConnectionString(connectionString, tableName);

const updateProduct = async (partitionKey, rowKey, thumbUrl) => {
    try {
        const entity = {
            partitionKey,
            rowKey,
            thumbUrl
          };

        await client.updateEntity(entity, "Merge"); 

        return { err: false,
              msg: ''
        };

    } catch(err){
        console.log('error update Table- ', err);
        return {err:true, msg: err.message}
    }
};

module.exports = {
    updateProduct,
};
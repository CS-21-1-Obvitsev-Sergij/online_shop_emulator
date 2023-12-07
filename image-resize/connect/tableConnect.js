require('dotenv').config();
const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

const accountName = process.env.AZURE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_ACCOUNT_KEY;
const tableName = process.env.TABLE_NAME_PRODUCT;
const tableEndpoint = process.env.AZURE_TABLE_POINT;

const credentials = new AzureNamedKeyCredential(accountName, accountKey);
const client = new TableClient(tableEndpoint, tableName, credentials, { allowInsecureConnection: true });


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
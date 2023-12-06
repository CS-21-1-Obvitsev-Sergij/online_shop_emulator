require('dotenv').config();
const { TableClient } = require("@azure/data-tables");
const { BlobServiceClient } = require('@azure/storage-blob');

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const tableCatName = process.env.TABLE_NAME_CATEGORY;
const tableProductName = process.env.TABLE_NAME_PRODUCT;
const containerName = process.env.CONTAINER_NAME;

const clientCat = TableClient.fromConnectionString(connectionString, tableCatName);
const clientProduct = TableClient.fromConnectionString(connectionString, tableProductName);
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

const initBlob = async () => {
    try {
        const containerClient = blobServiceClient.getContainerClient(containerName);

        // Проверяем, существует ли 
        const exists = await containerClient.exists();
        if (!exists) {
            const createContainerResponse = await containerClient.create();
            console.log(`Container created successfully. Request ID: ${createContainerResponse.requestId}`);
            await containerClient.setAccessPolicy('blob');
        } else {
            console.log(`Container '${containerName}' already exists.`);
        }
        return true;
    } catch (error) {
        return false;
    }
};

async function createTableIfNotExists(client, tableName) {
    try {
        await client.createTable(tableName);
        console.log(`Table ${tableName} created`);
        return true;
    } catch (error) {
        if (error.statusCode === 409) {
            return true;
        } else {
            return false;
        }
    }
}


async function initTables() {
    let res = await createTableIfNotExists(clientCat, tableCatName);
    if (!res) { return false;}
    res = await createTableIfNotExists(clientProduct, tableProductName);
    if (!res) { return false;}

    return true;
}

module.exports = {
  initTables,
  initBlob
};
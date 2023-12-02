const { BlobServiceClient, StorageSharedKeyCredential, newPipeline } = require('@azure/storage-blob');

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.CONTAINER_NAME;
const baseURL = process.env.BASE_BLOB_URL;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

const uploadFoto = async (file, fileName)=> {
    try {
        // получаем контейнер
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);

        const options = {
            blobHTTPHeaders: {
                blobContentType: file.mimetype 
            }
        };
    
        await blockBlobClient.uploadData(file.buffer, options);
        const imgUrl = `${baseURL}/${containerName}/${fileName}`;
    
        return {err: false, data:imgUrl}

    } catch(err) {
        return {err:true, msg:error.message}
    }
};

module.exports = {
    uploadFoto,
    
};

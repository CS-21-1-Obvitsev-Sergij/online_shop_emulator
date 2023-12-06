const { BlobServiceClient } = require('@azure/storage-blob');

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.CONTAINER_NAME;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

const uploadResizedImage = async (blobName, imageBuffer) => {
    try {
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.uploadData(imageBuffer, {
            blobHTTPHeaders: { blobContentType: 'image/jpeg' } 
        });

        return {err:false, resizeUrl:blockBlobClient.url};
    } catch(err) {
        return {err:true, msg:err}
    }
    
}


module.exports = {
    uploadResizedImage,
};
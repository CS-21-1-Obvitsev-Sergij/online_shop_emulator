const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const accountName = process.env.AZURE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_ACCOUNT_KEY;
const blobEndpoint = process.env.AZURE_BLOB_POINT;
const containerName = process.env.CONTAINER_NAME;

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
const blobServiceClient = new BlobServiceClient(
  `${blobEndpoint}`,
  sharedKeyCredential
);

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
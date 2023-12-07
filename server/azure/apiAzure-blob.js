const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const accountName = process.env.AZURE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_ACCOUNT_KEY;
const blobEndpoint = process.env.AZURE_BLOB_POINT;
const baseURL = process.env.BASE_BLOB_URL;
const containerName = process.env.CONTAINER_NAME;

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
const blobServiceClient = new BlobServiceClient(
  `${blobEndpoint}`,
  sharedKeyCredential
);



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
        return {err:true, msg:err.message}
    }
};

const deleteFoto = async (blobName)=> {
    try {
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobClient = containerClient.getBlobClient(blobName);

        await blobClient.delete();
        return { err: false, msg: 'Blob успешно удален.' };
    } catch (err) {
        return { err: true, msg: err.message };
    }
};

module.exports = {
    uploadFoto,
    deleteFoto,
};

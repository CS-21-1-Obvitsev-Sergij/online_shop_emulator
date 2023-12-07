const { QueueServiceClient, StorageSharedKeyCredential } = require("@azure/storage-queue");

const accountName = process.env.AZURE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_ACCOUNT_KEY;
const queueEndpoint = process.env.AZURE_QUEUE_POINT;

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

const queueServiceClient = new QueueServiceClient(
  `${queueEndpoint}`,
  sharedKeyCredential
);



// адд в очередь
const addMessageToQueue = async (queueName, message) => {
    try {
        const queueClient = queueServiceClient.getQueueClient(queueName);
        await queueClient.create(); 

        const enqueueResponse = await queueClient.sendMessage(JSON.stringify(message));

        console.log(`Message added to queue. MessageId: ${enqueueResponse.messageId}`);
        return {err:false, res:enqueueResponse};
        
    } catch (error) {
        return {err:true, res:error}
    }
};


module.exports = {
    addMessageToQueue,
};

const { QueueServiceClient } = require("@azure/storage-queue");

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);

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

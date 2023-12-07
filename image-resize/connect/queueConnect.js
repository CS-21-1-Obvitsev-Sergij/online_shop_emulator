const { QueueServiceClient, StorageSharedKeyCredential } = require("@azure/storage-queue");

const accountName = process.env.AZURE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_ACCOUNT_KEY;
const queueEndpoint = process.env.AZURE_QUEUE_POINT;

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

const queueServiceClient = new QueueServiceClient(
  `${queueEndpoint}`,
  sharedKeyCredential
);

module.exports = queueServiceClient;
require('dotenv').config();
const { QueueServiceClient } = require("@azure/storage-queue");
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);

module.exports = queueServiceClient;
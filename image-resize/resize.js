require('dotenv').config();
const sharp = require('sharp');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

const nameQ = process.env.NAME_QUEUE;


const containerBlob = process.env.CONTAINER_NAME;
const queueServiceClient = require('./connect/queueConnect.js');
const {uploadResizedImage  } = require('./connect/blobConnect.js');
const { updateProduct } = require('./connect/tableConnect.js');


async function processQueueMessages(queueName) {
    const queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();
    let stop = false;
    let errorCount = 0;
    while (!stop) {
        // читаем
        const messages = await queueClient.receiveMessages();
        //console.log('Read messages from queue - ',messages);

        for (const message of messages.receivedMessageItems) {
            const messageBody = JSON.parse(message.messageText);
            //console.log('process message - ', message);
            // Обработка сообщения
            const resultImage = await processImage(messageBody);
            //console.log('Result from Image process - ', resultImage);
            if (!resultImage.err) {
                await queueClient.deleteMessage(message.messageId, message.popReceipt);
            } else {
                console.log('Error - ', resultImage.error , '\nMSG -', resultImage.msg );
                errorCount++;
            }
        }
        if (errorCount > 5) {stop = true;}
    }
}
// обработка
async function processImage(messageBody) {
    try {
        const response = await fetch(messageBody.imageUrl);
        const buffer = await response.buffer();

        const outputBuffer = await sharp(buffer)
            .resize(200, 200, {
                fit: sharp.fit.inside,
                withoutEnlargement: true
            })
            .toFormat('jpeg')
            .toBuffer();

        const fileName = uuidv4() + '.jpeg';
        const resUpload = await uploadResizedImage(fileName, outputBuffer);
        
        if (!resUpload.err) {
            const resUpdate = await updateProduct(messageBody.partitionKey, messageBody.rowKey, resUpload.resizeUrl);
            if (!resUpdate.err) {
                return { err: false};
            } else {
                return { err: true, error:'Error in update Table Product',  msg: resUpdate.msg};
            }
           
        } else {
            return { err: true, error: 'Error in load original image.', msg: resUpload.msg };
        }
    } catch (error) {
        return { err: true, error: 'Error in proccess create resize image.', msg: error.message };
    }
}


processQueueMessages(nameQ);
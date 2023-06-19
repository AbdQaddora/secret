const { MongoClient } = require('mongodb');

const dbConnection = (collectionName) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(process.env.DB_URI)
            .then((client) => {
                const collection = client.db(process.env.DB_NAME).collection(collectionName);
                resolve(collection);
            }).catch((error) => {
                reject(error);
            })
    })
}

module.exports = dbConnection;

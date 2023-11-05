const admin = require("firebase-admin");
const fs = require('fs');
const serviceAccount = require("../../ServiceAccount/fir-neural-firebase-adminsdk-wp62d-cda76a724b.json");


const initializeFirebase = () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://fir-neural-default-rtdb.firebaseio.com",
        storageBucket: 'gs://fir-neural.appspot.com',
    });

}

//upload json data to the storage bucket
const uploadJSON = (data) => {
    const storage = admin.storage();
    const bucket = storage.bucket();
    const d = new Date();
    const filePath = 'DailyIOTBackup/' + String(d.getDate()) + "_" + String(d.getMonth() + 1) + "_" + String(d.getFullYear()) + '.josn'; // The path where the file will be stored in Firebase Storage
    const file = bucket.file(filePath);
    const fileStream = file.createWriteStream({
        metadata: {
            contentType: 'application/json',
        },
    });

    fileStream.on('error', (error) => {
        console.error('Error uploading JSON data:', error);
    });

    fileStream.on('finish', () => {
        // The file has been successfully uploaded
        console.log('JSON data uploaded successfully.');

        // Generate a download URL for the uploaded data
        file.getSignedUrl({
            action: 'read',
            expires: '03-01-2500'
        })
            .then((urls) => {
                const downloadUrl = urls[0];
                console.log('Download URL:', downloadUrl);
            })
            .catch((error) => {
                console.error('Error getting download URL:', error);
            });
    });

    fileStream.end(JSON.stringify(data));
}

module.exports = {
    initializeFirebase,
    uploadJSON
}

const admin = require("firebase-admin");
const functions = require("firebase-functions");
const Cors = require("cors");
const express = require("express");
const fileUpload = require("./cloud-function-file-upload");

const api = express().use(Cors({ origin: true }));
fileUpload("/picture", api);

admin.initializeApp(functions.config().firebase);

api.post("/picture", function (req, response, next) {
    uploadImageToStorage(req.files.file[0])
    .then(metadata => {
        response.status(200).json(metadata[0]);
        next();
    })
    .catch(error => {
        console.error(error);
        response.status(500).json({ error });
        next();
    });
});

exports.api = functions.https.onRequest(api);

const uploadImageToStorage = file => {
    const storage = admin.storage();
    return new Promise((resolve, reject) => {
        const fileUpload = storage.bucket().file(file.originalname);
        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: "image/jpg"
            }
        });

        blobStream.on("error", error => reject(error));

        blobStream.on("finish", () => {
            fileUpload.getMetadata()
            .then(metadata => resolve(metadata))
            .catch(error => reject(error));
        });

    blobStream.end(file.buffer);
  });
}
const REGISTRATIONS_COLLECTION = "registrations";
const IMAGES_COLLECTION = "images";
var mongodb = require("mongodb");


var ObjectID = mongodb.ObjectID;



exports.insertRegistration = async function(registration, db) {
  return await db.collection(REGISTRATIONS_COLLECTION).insertOne(registration);
}

exports.findRegistration = async function(accountNumber, db) {
  return await db.collection(REGISTRATIONS_COLLECTION).findOne({ "accountNumber": accountNumber });
}

exports.deleteRegistration = async function(registrationId, db) {
  return await db.collection(REGISTRATIONS_COLLECTION).deleteOne({ _id: registrationId });
}

exports.findImageById = async function(imageId, db) {
  return await db.collection(IMAGES_COLLECTION).findOne({ _id: new ObjectID(imageId) });
}

exports.saveImage = async function(image, db) {
  let id = image._id;

  delete image._id;

  await db.collection(IMAGES_COLLECTION).replaceOne({ _id: id }, image);
}

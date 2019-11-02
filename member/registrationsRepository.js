const REGISTRATIONS_COLLECTION = "registrations";

exports.insertRegistration = async function(registration, db) {
  return await db.collection(REGISTRATIONS_COLLECTION).insertOne(registration);
}

exports.findRegistration = async function(accountNumber, db) {
  return await db.collection(REGISTRATIONS_COLLECTION).findOne({ "accountNumber": accountNumber });
}

exports.deleteRegistration = async function(registrationId, db) {
  return await db.collection(REGISTRATIONS_COLLECTION).deleteOne({ _id: registrationId });
}
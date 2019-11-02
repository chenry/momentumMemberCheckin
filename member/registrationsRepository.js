const REGISTRATIONS_COLLECTION = "registrations";

exports.findRegistration = async function(accountNumber, imageId, db) {
  return await db.collection(REGISTRATIONS_COLLECTION).findOne({ "accountNumber": accountNumber, "imageId": imageId });
}

var registrationsRepository = require("./registrationsRepository")

exports.login = async function(accountNumber, imageId, db) {
    let registration = await registrationsRepository.findRegistration(accountNumber, db);
    if (registration != null) {
        return registration.imageId == imageId;
    }

    // The user has not already been registered, assume they are registering and persistent during login.
    registration = { "accountNumber": accountNumber, "imageId": imageId };
    await registrationsRepository.insertRegistration(registration, db);

    return true;
}
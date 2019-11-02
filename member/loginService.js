const registrationsRepository = require("./registrationsRepository")
const verificationService = require('./verificationService')
const checkInService = require('./checkInService')

exports.login = async function(accountNumber, imageId, db) {
    let found = await verificationService.verifyAccount(accountNumber, db);
    if (!found) {
        // The account provided was not valid.
        return false;
    }

    let result = false;

    let registration = await registrationsRepository.findRegistration(accountNumber, db);
    if (registration != null) {
        // The registration already exists, ensure it matches the image id that was used.
        result = registration.imageId == imageId;
    }
    else {
        // The user has not already been registered, assume they are registering and persistent during login.
        registration = { "accountNumber": accountNumber, "imageId": imageId };
        await registrationsRepository.insertRegistration(registration, db);

        result = true;
    }

    if (result) {
        await checkInService.createCheckInEvent(accountNumber, db);
    }

    return result;
}
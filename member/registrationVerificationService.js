const registrationsRepository = require("./registrationsRepository")

exports.hasMemberAlreadyRegistered = async function(accountNumber, db) {
    var registration = await registrationsRepository.findRegistration(accountNumber, db);

    return registration != null;
};
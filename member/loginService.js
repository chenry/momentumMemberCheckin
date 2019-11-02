var registrationsRepository = require("./registrationsRepository")

exports.login = async function(accountNumber, imageId, db) {
    let registration = await registrationsRepository.findRegistration(accountNumber, imageId, db);
    if (registration != null) {
        return true;        
    }

    return false;
}
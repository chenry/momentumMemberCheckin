const registrationsRepository = require('../member/registrationsRepository')

exports.resetRegistration = async function (accountNumber, db) {
    let registration = await registrationsRepository.findRegistration(accountNumber, db);
    if (registration == null) {
        return false;
    }

    await registrationsRepository.deleteRegistration(registration._id, db);
    return true;
}
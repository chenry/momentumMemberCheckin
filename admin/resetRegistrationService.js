const registrationsRepository = require('../member/registrationsRepository')

exports.resetRegistration = async function (accountNumber, db) {
    let registration = await registrationsRepository.findRegistration(accountNumber, db);
    if (registration == null) {
        return false;
    }

    await registrationsRepository.deleteRegistration(registration._id, db);
    return true;
}

exports.updateImage = async function (imageId, imageUrl, db) {
  let persistedImage = await registrationsRepository.findImageById(imageId, db);
  if (persistedImage == null) {
    return false;
  }

  persistedImage.url = imageUrl;

  await registrationsRepository.saveImage(persistedImage, db);
  return true;
}

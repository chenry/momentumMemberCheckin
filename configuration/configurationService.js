var configurationRepository = require("./configurationRepository")

exports.findBloomerangBaseApiUrl = async function(db) {
  // find timeline
  return await findConfigurationValueByKey(db, "bloomerangBaseApiUrl");
}

exports.findAllUrls = async function(db) {
  return await configurationRepository.findConfiguration(db);
}

async function findConfigurationValueByKey(db, key) {
  let config = await configurationRepository.findConfiguration(db);
  return config[key];
}



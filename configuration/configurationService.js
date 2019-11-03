var configurationRepository = require("./configurationRepository")

exports.getConfiguration = async function(db) {
  return await configurationRepository.findConfiguration(db);
}

exports.replaceConfiguration = async function(configuration, db) {
  await configurationRepository.replaceConfiguration(configuration, db);
}

exports.changeConfigurationValueByKey = async function(key, value, db) {
  let config = await configurationRepository.findConfiguration(db);
  if (config == null || config[key] == null) {
    throw `The configuration setting could not be found.`
  }

  config[key] = value;
  
  await configurationRepository.replaceConfiguration(config._id, config, db);
}

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
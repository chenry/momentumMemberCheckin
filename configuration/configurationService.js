var configurationRepository = require("./configurationRepository")

exports.findBloomerangBaseApiUrl = async function(db) {
  // find timeline
  return await findConfigurationValueByKey(db, "bloomerangBaseApiUrl");
}

async function findConfigurationValueByKey(db, key) {
  let config = await configurationRepository.findConfiguration(db);

  console.log(`Something: ${config[key]}`)
}



var CONFIG_COLLECTION = "config";

exports.findConfiguration = async function(db) {
  let configuration = await db.collection(CONFIG_COLLECTION).findOne({});

  return configuration;
}

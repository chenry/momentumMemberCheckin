var CONFIG_COLLECTION = "config";

exports.findConfiguration = async function(db) {
  let configuration = await db.collection(CONFIG_COLLECTION).findOne({});

  return configuration;
}

exports.replaceConfiguration = async function(id, entity, db) {
  await db.collection(CONFIG_COLLECTION).replaceOne({ _id: id }, entity, function(err, _) {
    if (err) {
      throw err;
    }
  });
}
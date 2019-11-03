const mongodb = require('mongodb');

var CONFIG_COLLECTION = "config";
var ObjectID = mongodb.ObjectID;

exports.findConfiguration = async function(db) {
  let configuration = await db.collection(CONFIG_COLLECTION).findOne({});

  return configuration;
}

exports.replaceConfiguration = async function(entity, db) {
  let id = entity._id;

  delete entity._id;

  await db.collection(CONFIG_COLLECTION).replaceOne({ _id: id }, entity);
}

const mongodb = require('mongodb');

var GRANTS_COLLECTION = "grants";
var ObjectID = mongodb.ObjectID;

exports.findGrantById = async function(grantId) {
    const grant = await db.collection(GRANTS_COLLECTION).findOne({ _id: new ObjectID(grantId) });

    return grant;
};




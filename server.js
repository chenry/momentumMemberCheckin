// ***************************************************************************
// * Required environment variables
// * -------------------------------------------------------------------------
// * MONGODB_URI - This should contain the full uri to the MongoDB
// * BLOOMERANG_KEY - This should contain the private key of the bloomerang api.
// ***************************************************************************

var express = require("express");
const fetch = require('node-fetch');
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var timelineRepository = require("./timelineRepository")

var ObjectID = mongodb.ObjectID;


var CONTACTS_COLLECTION = "contacts";
var IMAGES_COLLECTION = "images";
var CONFIG_COLLECTION = "config";

var app = express();
app.use(bodyParser.json());

// create link to angular directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}


/*  "/api/timeline"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */
app.get("/api/timeline", function(req, res) {
  timelineRepository.findTimeline()
    .then(jsonPayload => {
      res.status(200).json(jsonPayload)
    })
    .catch(error => {
      console.error("Problems occurred: " + error);
    });
});

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get('/api/account/lookup', function(req, res) {
  let id = req.query.id;
  fetch('https://api.bloomerang.co/v1/Constituent/?q=' + id + '&ApiKey=' + process.env.BLOOMERANG_KEY)
    .then(response => response.json())
    .then(data => {
      if (data.Total > 1) {
        res.status(400);
      }
      else {
        res.status(200).json(data.Results[0]);
      }
    });
});

app.get("/api/account/verify", function(req, res) {
  let id = req.query.id;
  fetch('https://api.bloomerang.co/v1/Constituent/?q=' + id + '&ApiKey=' + process.env.BLOOMERANG_KEY)
    .then(response => response.json())
    .then(data => {
      let result = data.Total > 0;
      res.status(200).json({ success: result });
    });
});

app.get("/api/contacts", function(req, res) {
  fetch('https://api.bloomerang.co/v1/Constituent/?q=3407&ApiKey=' + process.env.BLOOMERANG_KEY)
    .then(response => response.json())
    .then(data => {
      res.status(200).json(data);
    })

  // db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
  //   if (err) {
  //     handleError(res, err.message, "Failed to get contacts.");
  //   } else {
  //     res.status(200).json(docs);
  //   }
  // });
});

app.get("/api/images", function(req, res) {
  db.collection(IMAGES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get images.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.get("/api/config", function(req, res) {
  db.collection(CONFIG_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get images.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/contacts", function(req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new contact.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/contacts/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/contacts/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/contacts/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

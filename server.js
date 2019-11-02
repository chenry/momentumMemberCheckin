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

// ====================
// Services
var timelineService = require("./timeline/timelineService")
var configurationService = require("./configuration/configurationService")
var lookupService = require('./member/lookupService')
var loginService = require('./member/loginService')
var verificationService = require('./member/verificationService')
var registrationVerificationService = require('./member/registrationVerificationService')
// ====================

var ObjectID = mongodb.ObjectID;


var CONTACTS_COLLECTION = "contacts";
var IMAGES_COLLECTION = "images";

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

app.get("/api/member/:constituentId/timeline", function(req, res) {
  timelineService.findTimeline(req.params.constituentId, db)
    .then(jsonPayload => {
      res.status(200).json(jsonPayload)
    })
    .catch(error => {
      console.error("Problems occurred: " + error);
    });
});

/*  "/api/member/:constituentId/tasks"
 *  GET:
 *  POST:
 */
app.get("/api/member/:constituentId/timeline/tasks", function(req, res) {

  timelineService.findTimelineTasks(req.params.constituentId, db)
    .then(jsonPayload => {
      res.status(200).json(jsonPayload)
    })
    .catch(error => {
      console.error("Problems occurred: " + error);
    });
});

app.get("/api/member/:constituentId/timeline/tasks/open", function(req, res) {

  timelineService.findTimelineOpenTasks(req.params.constituentId, db)
    .then(jsonPayload => {
      res.status(200).json(jsonPayload)
    })
    .catch(error => {
      console.error("Problems occurred: " + error);
    });
});

app.post("/api/member/:constituentId/timeline/6MonthSurveyTask", function(req, res) {
  var task = req.body;
  console.log(`Task: ${task}`)

  timelineService.createSixMonthSurveyTimelineTask(task, db)
    .then(jsonPayload => {
      res.status(200).json(jsonPayload)
    })
    .catch(error => {
      console.error("Problems occurred: " + error);
    });
});



app.get('/api/member/lookup/:accountNumber', function(req, res) {
  lookupService.findAccount(req.params.accountNumber, db)
    .then(payload => {
      res.status(200).json(payload)
    })
    .catch(error => {
      console.error("Problems occurred: " + error)
    })
});

/*  "/api/member/verify"
    GET: Use to retrieve member data
    Result: true if the account is valid within Bloomerang, otherwise false
 */
app.get("/api/member/verify/:accountNumber", function(req, res) {
  verificationService.verifyAccount(req.params.accountNumber, db)
    .then(payload => {
      res.status(200).json(payload);
    })
    .catch(error => {
      console.error("Problems occurred: " + error)
    })
});

/*  "/api/member/login"
    POST: Used to login and/or register to the website (if they have not already registered)
    Result: 401 response if they were not logged in successfully, otherwise a 200 response if they were registered or logged in successfully.
*/
app.post("/api/member/login", function(req, res) {
  loginService.login(req.body.accountNumber, req.body.imageId, db)
    .then(success => {
      if (!success) {
        res.status(401).end();
      }
      else {
        res.status(200).end();
      }
    })
    .catch(error => {
      console.error("Problems occurred: " + error)
    })
});


/*  "/api/member/registration-check"
    GET: Determines whether the user already has a chosen image registered.
    Result: true if the user does have a registration already existing, otherwise false.
*/

app.get("/api/member/registration-check/:accountNumber", function(req, res) {
  registrationVerificationService.hasMemberAlreadyRegistered(parseInt(req.params.accountNumber), db)
    .then(success => {
      res.status(200).json(success);
    })
    .catch(error => {
      console.error("Problems occurred: " + error)
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

app.get("/api/config", async function(req, res) {
  let docs = await configurationService.findBloomerangBaseApiUrl(db);
  res.status(200).json(docs);
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

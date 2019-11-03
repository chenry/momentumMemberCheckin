// ********************************************************************************************
// * Required environment variables
// * ------------------------------------------------------------------------------------------
// * MONGODB_URI - Contains the full uri to the MongoDB
// * BLOOMERANG_KEY - Contains the private key of the bloomerang api.
// * MOMENTUM_ADMIN_PASSWORD - Contains the password used to access the administrative areas.
// ********************************************************************************************

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
var adminLoginService = require('./admin/loginService')
var adminResetRegistrationService = require('./admin/resetRegistrationService')
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

app.post('/api/admin/resetUserRegistration', function(req, res) {
  adminResetRegistrationService.resetRegistration(req.body.accountNumber, db)
  .then(result => {
    if (result) {
      res.status(200).end();
    }
    else {
      res.status(404).end();
    }
  })
  .catch(error => {
    handleError(res, error, "Failed to reset the user registration.");
  });
});

app.post('/api/admin/login', function(req, res) {
  try {

    let isValidPassword = adminLoginService.login(req.body.password);
    if (isValidPassword) {
      res.status(200).json(isValidPassword);
    }
    else {
      res.status(401).end();
    }
  }
  catch (err) {
    handleError(null, err, 'Failed to login.', 401);
  }
});

app.get("/api/member/:constituentId/timeline", function(req, res) {
  timelineService.findTimeline(req.params.constituentId, db)
    .then(jsonPayload => {
      res.status(200).json(jsonPayload)
    })
    .catch(error => {
      handleError(res, error, "Failed to open get timeline.", 401);
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
      handleError(res, error, "Failed to open get timeline tasks.", 401);
    });
});

app.get("/api/member/:accountNumber/timeline/tasks/open", function(req, res) {
  timelineService.findTimelineOpenTasks(parseInt(req.params.accountNumber), db)
    .then(jsonPayload => {
      res.status(200).json(jsonPayload)
    })
    .catch(error => {
      handleError(res, error, "Failed to open constituent timeline tasks.", 500);
    });
});

app.post("/api/member/:accountNumber/timeline/6MonthSurveyTask", async function(req, res) {

  try {
    if (req.body && req.body.accountNumber) {
      console.log(`Account Number Received: ${req.body.accountNumber}`);
    } else {
      throw new Error("Account Number missing")
    }

    let jsonPayload = await timelineService.createSixMonthSurveyTimelineTask(req.body.accountNumber, db);
    res.status(200).json(jsonPayload)
  } catch (err) {
    handleError(res, err.message, "Account Number is required.");
  }
});



app.get('/api/member/lookup/:accountNumber', function(req, res) {
  lookupService.findAccount(req.params.accountNumber, db)
    .then(payload => {
      res.status(200).json(payload)
    })
    .catch(error => {
      handleError(res, error, "Failed to lookup accountNumber.", 401);
    })
});

app.get('/api/member/lookup/:accountNumber/constituentId', function(req, res) {
  lookupService.findConstituentIdByAccountNumber(req.params.accountNumber, db)
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
      handleError(res, error, "Failed to verify accountNumber.", 401);
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
        handleError(res, error, "Failed to login.", 401);
      }
      else {
        res.status(200).end();
      }
    })
    .catch(error => {
      handleError(res, error, "Failed to login.", 401);
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
      handleError(res, error, "Failed to check registration.",400);
    });
});

app.get("/api/images", function(req, res) {
  db.collection(IMAGES_COLLECTION).find({}).toArray(function(err, docs) {
    if (!err) {
      res.status(200).json(docs);
    } else {
      handleError(res, err.message, "Failed to get images.",400);
    }
  });
});

app.get("/api/config", async function(req, res) {
  let config = await configurationService.getConfiguration(db);
  if (config) {
    res.status(200).json(config);
  }
  else {
    handleError(res, "could not find bloomerang base api url", "Failed to get config", 400);
  }
});

app.post('/api/config', function (req, res) {
  configurationService.replaceConfiguration(req.body, db)
    .then(_ => {
      res.status(200).end();
    })
    .catch(error => {
      handleError(res, error, "Failed to update configuration.", 500);
    });
});

app.post('/api/config/change', function (req, res) {
  configurationService.changeConfigurationValueByKey(req.body.key, req.body.value, db)
    .then(_ => {
      res.status(200).end();
    })
    .catch(error => {
      handleError(res, error, "Failed to update configuration.", 500);
    });
});

app.get("/api/surveyUrls", async function(req, res) {
  const accountNumber = req.query["accountNumber"];
  if (accountNumber) {
    function repl(stg,index,arr) {
      return stg.replace("{accountNumber}",accountNumber);
    }
    const urls = await configurationService.findAllUrls(db);
    const intermediate = Object.values(urls).slice(2).map(repl);
    const result = {
      "sixMonthEnabled" : intermediate[0],
      "checkInOnly" : intermediate[1]
    };
    res.status(200).json(result);
  }
  else {
    handleError(res,
      "Invalid account number",
      "Must provide valid account number.",
      400);
  }
});

app.post("/api/contacts", function(req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
      if (!err) {
        res.status(201).json(doc.ops[0]);
      } else {
        handleError(res, err.message, "Failed to create new contact.");
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
    if (!err) {
      res.status(200).json(doc);
    } else {
      handleError(res, err.message, "Failed to get contact");
    }
  });
});

app.put("/api/contacts/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (!err) {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    } else {
      handleError(res, err.message, "Failed to update contact");
    }
  });
});

app.delete("/api/contacts/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (!err) {
      res.status(200).json(req.params.id);
    } else {
      handleError(res, err.message, "Failed to delete contact");
    }
  });
});

app.get('*', function(req, res) {
  res.sendFile(`${distDir}/index.html`)
})

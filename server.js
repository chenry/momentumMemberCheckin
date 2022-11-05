// ********************************************************************************************
// * Required environment variables
// * ------------------------------------------------------------------------------------------
// * DB_URI - Contains the full uri to the MongoDB (used to be MONGODB_URI)
// * BLOOMERANG_KEY - Contains the private key of the bloomerang api.
// * MOMENTUM_ADMIN_PASSWORD - Contains the password used to access the administrative areas.
// ********************************************************************************************

var express = require("express");
const fetch = require('node-fetch');
var bodyParser = require("body-parser");
const { MongoClient, ObjectID } = require("mongodb");
const knex = require('./lib/db')

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
var surveyUrlGeneratorService = require('./member/surveyUrlGeneratorService');
var transactionService = require('./member/transactionService');
var grantsService = require('./grant/grantService')
// ====================

var CONTACTS_COLLECTION = "contacts";
var IMAGES_COLLECTION = "images";
var GRANTS_COLLECTION = "grants";

var app = express();
app.use(bodyParser.json());

// create link to angular directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
const uri = process.env.DB_URI || 'mongodb://root:rootpassword@localhost:27017/momentumMongoDB?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256'
// Connect to the database before starting the application server.
MongoClient.connect(uri, { useUnifiedTopology: true }, function (err, client) {
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

app.get("/api/info", async function(req, res) {
  try {
    const obj = {
      dbUri: process.env.DB_URI,
      port: process.env.PORT,
      bloomerangKey: process.env.BLOOMERANG_KEY,
      momentumAdminPassword: process.env.MOMENTUM_ADMIN_PASSWORD
    }

    console.log(obj)
    res.status(200).json(obj);
  } catch (error) {
    handleError(res, error, "Failed to open get timeline.", 401);
  }
}) 

app.get("/api/test", async function(req, res) {
  try {
    const jsonPayload = await knex
      .from('test_table')
      .select('test_id', 'test_name', 'test_description')
    res.status(200).json(jsonPayload);
  } catch (error) {
    handleError(res, error, "Failed to open get timeline.", 401);
  }
});

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

app.post("/api/member/:accountNumber/timeline/6MonthSurveyTask/completed", function(req, res) {
  timelineService.sixMonthSurveyTimelineTaskCompleted(req.body.accountNumber, db)
    .then(payload => {
      res.status(200).json(payload);
    })
    .catch(error => {
      handleError(res, error, "Failed to open constituent timeline tasks.", 500);
    });
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
    .then(isSuccess => {
      res.status(200).json(isSuccess);
    })
    .catch(error => {
      handleError(res, error, "Failed to login.", 401);
    })
});

app.post("/api/getNextDate", function(req, res) {
  timelineService.getNextDate(req.body)
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

/* "/api/member/renewal/"
   GET: Determines if annual registration is due.
   Result: JSON object with indicator that renewal is due.
*/
app.get("/api/member/renewal/:accountNumber", function(req, res) {
  transactionService.annualRenewDue(parseInt(req.params.accountNumber), db)
  .then(jsonPayload => {
    res.status(200).json(jsonPayload)
  })
  .catch(error => {
    handleError(res, error, "Could not get last membership transaction.", 400);
  })
})

app.get("/api/images", function(req, res) {
  db.collection(IMAGES_COLLECTION).find({}).toArray(function(err, docs) {
    if (!err) {
      res.status(200).json(docs);
    } else {
      handleError(res, err.message, "Failed to get images.",400);
    }
  });
});

app.post("/api/images", function(req, res) {
  adminResetRegistrationService.updateImage(req.body.imageId, req.body.imageUrl, db)
    .then(success => {
      res.status(200).json(success);
    })
    .catch(error => {
      handleError(res, error, "Failed to check registration.",400);
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
  surveyUrlGeneratorService.generateUrlsForAccountNumber(req.query.accountNumber, db)
    .then(result => {
      res.status(200).json(result);      
    })
    .catch(error => {
      handleError(res, error, "Failed to generate survey urls.", 500);
    });
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

app.get("/api/grants/:id", async function(req, res) {
  try {
    const grant = await grantsService.findGrantById(req.params.id);
    res.status(200).json(grant)
  } catch (err) {
    handleError(res, err.message, "Failed to delete contact");
  }
});

app.get("/api/grant/populate", function(req, res) {
  const grants = [
    {
      note_id: 100,
      constituent_name: 'Test 100',
      grants_name: 'Grant 100',
      loi_due: new Date(),
      app_due: new Date(),
      last_mod: new Date(),
      status: 0
    },
    {
      note_id: 200,
      constituent_name: 'Test 200',
      grants_name: 'Grant 200',
      loi_due: new Date(),
      app_due: new Date(),
      last_mod: new Date(),
      status: 1
    },
    {
      note_id: 300,
      constituent_name: 'Test 300',
      grants_name: 'Grant 300',
      loi_due: new Date(),
      app_due: new Date(),
      last_mod: new Date(),
      status: 2
    }
  ]

  grants.forEach(async currGrant => {
    await db.collection(GRANTS_COLLECTION).insertOne(currGrant, function(err, doc) {
      console.log('INserted')
    });
  });
});

app.get("/api/grants/:status", function(req, res) {
  let query = { "status": req.params.status };
  db.collection(GRANTS_COLLECTION).find(query).toArray(function(err, docs) {
    if (!err) {
      res.status(200).json(docs);
    } else {
      handleError(res, err.message, "Failed to get status docs.",400);
    }
  });
});

app.get('*', function(req, res) {
  res.sendFile(`${distDir}/index.html`)
})

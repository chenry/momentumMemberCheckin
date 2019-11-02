const fetch = require('node-fetch');


exports.list = function(req, res) {

    var headers = {
        Authorization: "Basic " + process.env.BLOOMERANG_KEY
    }

    fetch('https://api.bloomerang.co/v1/Constituent/?q=3407&ApiKey=' + process.env.BLOOMERANG_KEY, { method: 'GET', headers: headers})
    .then(response => response.json())
    .then(data => {
      res.status(200).json(data);
    })
}
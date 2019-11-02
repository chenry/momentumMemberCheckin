const fetch = require('node-fetch');


exports.findTimeline = async function() {
  let jsonResponse;
  var headers = {
    Authorization: "Basic " + process.env.BLOOMERANG_KEY
  }

  try {
    var response = await fetch('https://api.bloomerang.co/v1/Constituent/?q=3407&ApiKey=' + process.env.BLOOMERANG_KEY, { method: 'GET', headers: headers});
    jsonResponse = response.json();
    console.log(jsonResponse);
  } catch (err) {
    console.error(err);
  }
  return jsonResponse;
}

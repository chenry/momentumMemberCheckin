const fetch = require('node-fetch');


exports.findTimeline = async function(constituentId, bloomerangBaseApiUrl) {
  let jsonResponse;
  var headers = {
    Authorization: `Basic ${process.env.BLOOMERANG_KEY}`
  }

  try {
    var url = `${bloomerangBaseApiUrl}/Timeline/${constituentId}`;
    console.log({url})
    var response = await fetch(url, { method: 'GET', headers: headers});
    jsonResponse = response.json();
  } catch (err) {
    console.error(err);
  }
  return jsonResponse;
}


exports.createTimelineTask = async function(task, bloomerangBaseApiUrl) {
  let jsonResponse;
  var headers = {
    Authorization: `Basic ${process.env.BLOOMERANG_KEY}`,
    "Content-Type": 'application/json'
  }

  try {
    var url = `${bloomerangBaseApiUrl}/Task`;
    console.log({url})
    var response = await fetch(url, { method: 'POST', body: JSON.stringify(task), headers: headers});
    jsonResponse = response.json();
  } catch (err) {
    console.error(err);
  }
  return jsonResponse;
}

const fetch = require('node-fetch');

exports.findTimeline = async function(constituentId, bloomerangBaseApiUrl) {
  let jsonResponse;
  var headers = {
    Authorization: `Basic ${process.env.BLOOMERANG_KEY}`
  }

  var url = `${bloomerangBaseApiUrl}Timeline/${constituentId}`;

  var response = await fetch(url, { method: 'GET', headers: headers});
  jsonResponse = response.json();

  return jsonResponse;
}

exports.createTimelineTask = async function(task, bloomerangBaseApiUrl) {
  let jsonResponse;
  var headers = {
    Authorization: `Basic ${process.env.BLOOMERANG_KEY}`,
    "Content-Type": 'application/json'
  }

  var url = `${bloomerangBaseApiUrl}Task`;

  var response = await fetch(url, { method: 'POST', body: JSON.stringify(task), headers: headers});
  jsonResponse = response.json();

  return jsonResponse;
}

exports.setTaskStatus = async function (taskId, status, bloomerangBaseApiUrl) {
  const headers = {
    Authorization: `Basic ${process.env.BLOOMERANG_KEY}`,
    "Content-Type": 'application/json'
  }

  const url = `${bloomerangBaseApiUrl}Task/` + taskId;

  let updateChange = { 
    Status: status
  };

  var response = await fetch(url, { method: 'POST', body: JSON.stringify(updateChange), headers: headers});
  jsonResponse = response.json();

  return jsonResponse;
}

exports.completeTask = async function (taskId, status, completedDate, bloomerangBaseApiUrl) {
  const headers = {
    Authorization: `Basic ${process.env.BLOOMERANG_KEY}`,
    "Content-Type": 'application/json'
  }

  const url = `${bloomerangBaseApiUrl}Task/` + taskId;

  let updateChange = { 
    Status: status,
    CompletedDate: completedDate
  };

  var response = await fetch(url, { method: 'POST', body: JSON.stringify(updateChange), headers: headers});
  jsonResponse = response.json();

  return jsonResponse;
}
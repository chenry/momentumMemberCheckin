const fetch = require('node-fetch');


exports.findTimeline = async function(constituentId, bloomerangBaseApiUrl) {
  let jsonResponse;
  var headers = {
    Authorization: `Basic ${process.env.BLOOMERANG_KEY}`
  }

  var url = `${bloomerangBaseApiUrl}/Timeline/${constituentId}`;

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

  var url = `${bloomerangBaseApiUrl}/Task`;

  var response = await fetch(url, { method: 'POST', body: JSON.stringify(task), headers: headers});
  jsonResponse = response.json();

  return jsonResponse;
}

exports.archiveTaskList = async function(taskList, bloomerangBaseApiUrl) {
  for (let task of taskList) {
    archiveTimeLineTask(task.taskId, bloomerangBaseApiUrl);
  }
}

exports.completeTaskList = async function(taskList, bloomerangBaseApiUrl) {
  for (let task of taskList) {
    completeTimelineTask(task.taskId, bloomerangBaseApiUrl);
  }
}

exports.archiveTimelineTask = async function(taskId, bloomerangBaseApiUrl) {
  return setTaskStatus("Archived",bloomerangBaseApiUrl);
}

exports.completeTimelineTask = async function(taskId, bloomerangBaseApiUrl) {
  return setTaskStatus("Complete",bloomerangBaseApiUrl);
}

exports.activateTimelineTask = async function(taskId, bloomerangBaseApiUrl) {
  return setTaskStatus("Active",bloomerangBaseApiUrl);
}

async function setTaskStatus(status,bloomerangBaseApiUrl) {
  var headers = {
    Authorization: `Basic ${process.env.BLOOMERANG_KEY}`,
    "Content-Type": 'application/json'
  }

  var url = `${bloomerangBaseApiUrl}/Task/` + taskId;
  let taskToChange = await fetch(url, { method: 'GET', headers: headers }).json();
  if (taskToChange) {
    const now = new Date();
    taskToChange.Status = status;
    taskToChange.CompletedDate = now;
    const response = await fetch(url, { method: 'POST', body: JSON.stringify(taskToChange), headers: headers});
    if (response) {
      return true;
    }
  }
  return false;
}
exports.completeTimelineTask = async function(taskId, bloomerangBaseApiUrl) {
  var headers = {
    Authorization: `Basic ${process.env.BLOOMERANG_KEY}`,
    "Content-Type": 'application/json'
  }

  var url = `${bloomerangBaseApiUrl}/Task/` + taskId;
  let taskToComplete = await fetch(url, { method: 'GET', headers: headers }).json();
  if (taskToComplete) {
    taskToComplete.Status = "Complete";
    const response = await fetch(url, { method: 'POST', body: JSON.stringify(taskToComplete), headers: headers});
    if (response) {
      return true;
    }
  }
  return false;
}

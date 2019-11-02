var constants = require("../constants")

exports.findTasks = function(timeline) {
  return timeline["Tasks"]
}

exports.findOpenTasks = function(timeline) {
  let allTasks = timeline["Tasks"]
  let openTasks = []
  for (let currTask of allTasks) {

    if (constants.SIX_MONTH_TASK_SUBJECT != currTask.Subject) {
      continue;
    }

    if (!currTask.CompletedDate) {
      openTasks.push(currTask);
    }
  }

  return openTasks;
}

exports.findAllSixMonthTasks = function(timeline) {
  let allTasks = timeline["Tasks"]
  let sixMonthTasks = []
  for (let currTask of allTasks) {

    if (constants.SIX_MONTH_TASK_SUBJECT != currTask.Subject) {
      continue;
    }
    sixMonthTasks.push(currTask);
  }

  return sixMonthTasks;
}



exports.findInteractions = function(timeline) {
  return timeline["Interactions"]
}

exports.createOpenTasksResponse = function(openTasks) {
  return {
    sixMonthTask: contains6MonthTask(openTasks)
  }
}

function contains6MonthTask(openTasks) {
  for (let currTask of openTasks) {

    if (constants.SIX_MONTH_TASK_SUBJECT == currTask.Subject) {
      return true;
    }
  }
  return false;
}


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

    if (!currTask.CompletedDate && currTask.Status != constants.TASK_STATUS_ARCHIVED) {
      openTasks.push(currTask);
    }
  }

  return openTasks;
}

exports.findActiveSixMonthTasks = function(allTasks) {
  let sixMonthTasks = []
  for (let currTask of allTasks) {

    if ((constants.SIX_MONTH_TASK_SUBJECT != currTask.Subject)
      && (constants.TASK_STATUS_ACTIVE != currTask.Status)) {
      continue;
    }
    sixMonthTasks.push(currTask);
  }

  return sixMonthTasks;
}

exports.findPastActiveSixMonthTasks = function(timeline, now) {
  let allTasks = this.findActiveSixMonthTasks(timeline);
  let pastTasks = []
  for (let currTask of allTasks) {
    if (currTask.DueDate > now) {
      continue;
    }
    pastTasks.push(currTask);
  }

  return pastTasks;
}

exports.findFutureActiveSixMonthTasks = function(timeline, now) {
  let allTasks = this.findActiveSixMonthTasks(timeline);
  let futureTasks = []
  for (let currTask of allTasks) {
    if (currTask.DueDate <= now) {
      continue;
    }
    futureTasks.push(currTask);
  }

  return futureTasks;
}

exports.findInteractions = function(timeline) {
  return timeline["Interactions"]
}

exports.createOpenTasksResponse = function(openTasks) {
  return {
    sixMonthTask: is6MonthTaskDue(openTasks)
  }
}

function is6MonthTaskDue(openTasks) {
  let now = new Date();
  for (let currTask of openTasks) {
    const dueDate = new Date(currTask.DueDate);

    if (constants.SIX_MONTH_TASK_SUBJECT == currTask.Subject 
        && now > dueDate 
        && constants.TASK_STATUS_ACTIVE == currTask.Status
        && constants.TASK_PURPOSE == currTask.Purpose) {
      return true;
    }
  }
  return false;
}
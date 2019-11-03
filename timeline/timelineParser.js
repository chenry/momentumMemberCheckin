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

    if (constants.SIX_MONTH_TASK_SUBJECT == currTask.Subject && now > dueDate) {
      return true;
    }
  }
  return false;
}
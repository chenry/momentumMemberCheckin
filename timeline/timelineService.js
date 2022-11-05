var timelineRepository = require("./timelineRepository")
var configurationService = require("../configuration/configurationService")
let lookupService = require('../member/lookupService')
var timelineParser = require("./timelineParser")
var constants = require("../constants")
var taskUtil = require("./taskUtil")
var taskService = require("../task/taskService");

exports.findTimeline = async function(constituentId, db) {
  // find timeline
  return await configurationService.findBloomerangBaseApiUrl(db)
    .then(bloomerangBaseApiUrl => timelineRepository.findTimeline(constituentId, bloomerangBaseApiUrl));
}

exports.findTimelineTasks = async function(constituentId, db) {
  // find timeline
  return await configurationService.findBloomerangBaseApiUrl(db)
    .then(bloomerangBaseApiUrl => timelineRepository.findTimeline(constituentId, bloomerangBaseApiUrl))
    .then(timeline => timelineParser.findTasks(timeline));
}

exports.findTimelineOpenTasks = async function(accountNumber, db) {
  let constituent = await lookupService.findConstituentIdByAccountNumber(accountNumber, db);

  let openTasks = await taskService.getOverdueTasksForConstituent(constituent.constituentId);

  let surveyTasks = openTasks.ResultCount > 0 ? taskService.filterBySixMonthSurvey(openTasks.Results) : [];

  return {
    sixMonthTask: surveyTasks.length > 0
  };
}

exports.actuallyFindTimelineOpenTasks = async function(constituent, bloomerangBaseApiUrl) {
  const timeline = await timelineRepository.findTimeline(constituent.constituentId, bloomerangBaseApiUrl);
  return await timelineParser.findOpenTasks(timeline);
}

exports.sixMonthSurveyTimelineTaskCompleted = async function(accountNumber, db) {
  const constituent = await lookupService.findConstituentIdByAccountNumber(accountNumber, db);
  const bloomerangBaseApiUrl = await configurationService.findBloomerangBaseApiUrl(db);
  
  // Find all tasks
  const now = new Date();
  const tasks = await this.actuallyFindTimelineOpenTasks(constituent, bloomerangBaseApiUrl);

  // Find all future tasks
  await archiveAllFutureTasks(tasks, bloomerangBaseApiUrl, now);
  await completeAllPastOpenTasks(tasks, bloomerangBaseApiUrl, now);

  return await createNewTask(accountNumber, constituent, bloomerangBaseApiUrl, db);
}

async function createNewTask(accountNumber, constituent, bloomerangBaseApiUrl, db) {
  const account = await lookupService.findAccount(accountNumber, db);
  const dueDate = taskUtil.findNext6MonthDueDateByAccount(account);

  let newTask = create6MonthTask(constituent.constituentId, dueDate);
  return await timelineRepository.createTimelineTask(newTask, bloomerangBaseApiUrl);
}

async function archiveAllFutureTasks(tasks, bloomerangBaseApiUrl, now) {
  let futureTasks = findAllFutureTasks(tasks, now);

  for (let futureTask of futureTasks) {
    await timelineRepository.setTaskStatus(futureTask.Id, constants.TASK_STATUS_ARCHIVED, bloomerangBaseApiUrl);
  }
}

function findAllFutureTasks(tasks, now) {
  let futureTasks = []

  for (let task of tasks) {
    let dueDate = new Date(task.DueDate);
    if (dueDate > now) {
      futureTasks.push(task);
    }
  }

  return futureTasks;
}

async function completeAllPastOpenTasks(tasks, bloomerangBaseApiUrl, now) {
  let pastTasks = findAllPastTasks(tasks, now);

  for (let pastTask of pastTasks) {
    await timelineRepository.completeTask(pastTask.Id, constants.TASK_STATUS_COMPLETE, now, bloomerangBaseApiUrl);
  }
}

function findAllPastTasks(tasks, now) {
  let pastTasks = []

  for (let task of tasks) {
    let dueDate = new Date(task.DueDate);
    if (dueDate <= now) {
      pastTasks.push(task);
    }
  }

  return pastTasks;
}

exports.getNextDate = async function(account) {
  try {
    var nextSixMonthDate = taskUtil.findNext6MonthDueDateByAccount(account);
    console.log(`Final Next Six Month Date: ${nextSixMonthDate}`);
    return true;
  } catch (err) {
    return false;
  }
}

function create6MonthTask(accountId, dueDate) {
  return {
    "UserId": constants.CREATE_TASK_USER_ID,
    "AccountId": accountId,
    "DueDate": dueDate,
    "Channel": "InPerson",
    "Purpose": constants.TASK_PURPOSE,
    "Status": "Active",
    "Subject": constants.SIX_MONTH_TASK_SUBJECT
  };
}



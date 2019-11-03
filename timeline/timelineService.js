var timelineRepository = require("./timelineRepository")
var configurationService = require("../configuration/configurationService")
let lookupService = require('../member/lookupService')
var timelineParser = require("./timelineParser")
var constants = require("../constants")
var taskUtil = require("./taskUtil")


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
  // find timeline
  let constituent = await lookupService.findConstituentIdByAccountNumber(accountNumber, db);
  let bloomerangBaseApiUrl = await configurationService.findBloomerangBaseApiUrl(db);
  let timeline = await timelineRepository.findTimeline(constituent.constituentId, bloomerangBaseApiUrl);
  let openTasks = await timelineParser.findOpenTasks(timeline);

  return timelineParser.createOpenTasksResponse(openTasks);
}

exports.sixMonthSurveyTimelineTaskCompleted = async function(accountNumber, db) {
  const account = await lookupService.findAccount(accountNumber,db);
  const constituent = await lookupService.findConstituentIdByAccountNumber(accountNumber, db);
  const timeline = await this.findTimelineTasks(constituent.constituentId, db);

  // ====================================================================
  // Steps
  // * Archive all future 6month tasks
  // * Complete all past 6month tasks
  //    - give the a completed date
  // * Create new 6month task if none exist in the future
  //    - dueDate = (registrationDate + 6month) until it is in the future
  // ====================================================================

  const now = new Date()
  const nextDueDate = taskUtil.findNext6MonthDueDateByAccount(account);
  let bloomerangBaseApiUrl = await configurationService.findBloomerangBaseApiUrl(db);
  const pastTasks = timelineParser.findPastActiveSixMonthTasks(timeline,now);
  timelineRepository.archiveTaskList(pastTasks, bloomerangBaseApiUrl);

  const futureTasks = timelineParser.findFutureActiveSixMonthTasks(timeline,now);
  timelineRepository.completeTaskList(futureTasks, bloomerangBaseApiUrl);

  let newTask = create6MonthTask(constituent.constituentId, nextDueDate);
  let jsonResponse = timelineRepository.createTimelineTask(newTask, bloomerangBaseApiUrl);
  return jsonResponse;
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
    "Purpose": "Solicitation",
    "Status": "Active",
    "Subject": constants.SIX_MONTH_TASK_SUBJECT,
    "Note": "Time to do checkin"
  };
}



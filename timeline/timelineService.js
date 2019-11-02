var timelineRepository = require("./timelineRepository")
var configurationService = require("../configuration/configurationService")
let lookupService = require('../member/lookupService')
var timelineParser = require("./timelineParser")
var constants = require("../constants")

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

exports.findAllTimelineTasks = async function(accountNumber, db) {

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
  let constituent = await lookupService.findConstituentIdByAccountNumber(accountNumber, db);

  // ====================================================================
  // Steps
  // * delete all future 6month tasks
  // * Complete all past 6month tasks
  //    - give the a completed date
  // * Create new 6month task if none exist in the future
  //    - dueDate = (registrationDate + 6month) until it is in the future
  // ====================================================================

  let now = new Date()
  let nextDueDate = new Date(now.setMonth(now.getMonth() + 6))
  let newTask = create6MonthTask(constituent.constituentId, nextDueDate);
  let bloomerangBaseApiUrl = await configurationService.findBloomerangBaseApiUrl(db);
  let jsonResponse = timelineRepository.createTimelineTask(newTask, bloomerangBaseApiUrl);

  return jsonResponse;
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



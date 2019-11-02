var timelineRepository = require("./timelineRepository")
var configurationService = require("../configuration/configurationService")
var timelineParser = require("./timelineParser")

let SIX_MONTH_TASK_SUBJECT = "6 month review";
let CREATE_TASK_USER_ID = 8186880;

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

exports.createSixMonthSurveyTimelineTask = async function(task, db) {
  let now = new Date()
  let nextDueDate = new Date(now.setMonth(now.getMonth() + 6))
  let newTask = create6MonthTask(task.AccountId, nextDueDate);

  
  return await configurationService.findBloomerangBaseApiUrl(db)
    .then(bloomerangBaseApiUrl => timelineRepository.createTimelineTask(newTask, bloomerangBaseApiUrl));
}

function create6MonthTask(accountId, dueDate) {
  return {
    "UserId": CREATE_TASK_USER_ID,
    "AccountId": accountId,
    "DueDate": dueDate,
    "Channel": "InPerson",
    "Purpose": "Solicitation",
    "Status": "Active",
    "Subject": SIX_MONTH_TASK_SUBJECT,
    "Note": "Time to do checkin"
  };
}



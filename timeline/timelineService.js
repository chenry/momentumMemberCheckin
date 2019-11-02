var timelineRepository = require("./timelineRepository")
var configurationService = require("../configuration/configurationService")
var timelineParser = require("./timelineParser")

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

exports.createTimelineTask = async function(task, db) {
  // find timeline
  return await configurationService.findBloomerangBaseApiUrl(db)
    .then(bloomerangBaseApiUrl => timelineRepository.createTimelineTask(task, bloomerangBaseApiUrl));
}



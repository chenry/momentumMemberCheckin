var timelineRepository = require("./timelineRepository")

exports.findTimeline = function(accountNumber) {
  // find timeline
  return timelineRepository.findTimeline(accountNumber)
}



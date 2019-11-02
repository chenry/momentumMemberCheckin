var timelineRepository = require("./timelineRepository")

exports.findTimeline = async function(accountNumber) {
  // find timeline
  return timelineRepository.findTimeline(accountNumber)
}


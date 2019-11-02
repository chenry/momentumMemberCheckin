var timelineRepository = require("./timelineRepository")
var configurationService = require("../configuration/configurationService")

exports.findTimeline = async function(accountNumber, db) {
  // find timeline
  return await configurationService.findBloomerangBaseApiUrl(db)
    .then(bloomerangBaseApiUrl => timelineRepository.findTimeline(accountNumber, bloomerangBaseApiUrl));
}



var accountRepository = require('./accountRepository')
var configurationService = require("../configuration/configurationService")

exports.findAccount = async function(accountNumber, db) {
    // find timeline
    return await configurationService.findBloomerangBaseApiUrl(db)
      .then(bloomerangBaseApiUrl => accountRepository.findAccount(accountNumber, bloomerangBaseApiUrl));
  }
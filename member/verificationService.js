var accountRepository = require('./accountRepository')
var configurationService = require("../configuration/configurationService")

exports.verifyAccount = async function(accountNumber, db) {
    return await configurationService.findBloomerangBaseApiUrl(db)
      .then(bloomerangBaseApiUrl => accountRepository.findAccount(accountNumber, bloomerangBaseApiUrl)
      .then(accounts => {
        return accounts.Total > 0;
      }));
  }
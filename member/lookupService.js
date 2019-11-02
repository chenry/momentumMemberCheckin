var memberRepository = require('./memberRepository')
var configurationService = require("../configuration/configurationService")

exports.findAccount = async function(accountNumber, db) {
    return await configurationService.findBloomerangBaseApiUrl(db)
      .then(bloomerangBaseApiUrl => memberRepository.findAccount(accountNumber, bloomerangBaseApiUrl))
      .then(accounts => {
        return accounts.Results[0];
      });
}
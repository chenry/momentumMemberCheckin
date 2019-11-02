var memberRepository = require('./memberRepository')
var configurationService = require("../configuration/configurationService")

exports.findAccount = async function(accountNumber, db) {
    return await configurationService.findBloomerangBaseApiUrl(db)
      .then(bloomerangBaseApiUrl => memberRepository.findAccount(accountNumber, bloomerangBaseApiUrl))
      .then(accounts => {
        return accounts.Results[0];
      });
}

exports.findConstituentIdByAccountNumber = async function(accountNumber, db) {
  return await configurationService.findBloomerangBaseApiUrl(db)
    .then(bloomerangBaseApiUrl => memberRepository.findAccount(accountNumber, bloomerangBaseApiUrl))
    .then(accounts => {
      if (accounts.Total == 0) {
        throw `No account found for: ${accountNumber}`
      }
      return {
        constituentId: accounts.Results[0].Id
      };
    });
}

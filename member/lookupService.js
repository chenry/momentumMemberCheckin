const memberRepository = require('./memberRepository')
const configurationService = require("../configuration/configurationService")

exports.findAccount = async function(accountNumber, db) {
  let bloomerangBaseApiUrl = await configurationService.findBloomerangBaseApiUrl(db);
  let accounts = await memberRepository.findAccount(accountNumber, bloomerangBaseApiUrl);

  if (accounts.Total == 0) {
    throw `No account found for: ${accountNumber}'`
  }

  return accounts.Results[0];
}

exports.findConstituentIdByAccountNumber = async function(accountNumber, db) {
  let bloomerangBaseApiUrl = await configurationService.findBloomerangBaseApiUrl(db);
  let accounts = await memberRepository.findAccount(accountNumber, bloomerangBaseApiUrl);

  if (accounts.Total == 0) {
    throw `No account found for: ${accountNumber}`
  }

  return {
    constituentId: accounts.Results[0].Id
  };
};
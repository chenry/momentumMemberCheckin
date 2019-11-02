const memberRepository = require('./memberRepository')
const configurationService = require("../configuration/configurationService")

exports.verifyAccount = async function(accountNumber, db) {
    let bloomerangBaseApiUrl = await configurationService.findBloomerangBaseApiUrl(db);
    let accounts = await memberRepository.findAccount(accountNumber, bloomerangBaseApiUrl);
 
    return accounts.Total > 0;
}
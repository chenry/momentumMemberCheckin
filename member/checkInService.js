const lookupService = require('./lookupService')
const configurationService = require('../configuration/configurationService')
const interactionRepository = require('./interactionRepository')

exports.createCheckInEvent = async function(accountNumber, db) {
    let constituent = await lookupService.findConstituentIdByAccountNumber(accountNumber, db);
    if (constituent == null) {
        throw `The constituent for account ${accountNumber} was not found.`
    }

    let now = new Date();
    let bloomerangBaseApiUrl = await configurationService.findBloomerangBaseApiUrl(db);

    return await interactionRepository.insertInteraction({
        AccountId: constituent.constituentId,
        Date: getFormattedDate(now),
        Subject: "Check-in",
        Channel: "InPerson",
        Purpose: "Welcome",
        IsInbound: true
    }, bloomerangBaseApiUrl);
};

function getFormattedDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + '/' + day + '/' + year;
}
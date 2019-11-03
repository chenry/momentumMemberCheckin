const configurationService = require('../configuration/configurationService')

exports.generateUrlsForAccountNumber= async function(accountNumber, db) {
    const config = await configurationService.findAllUrls(db);    
    if (!config) {
        throw `The URLs configuration could not be found.`
    }

    return {
      checkInOnly: config.surveyCheckinOnlyUrl.replace('{accountNumber}', accountNumber),
      sixMonthEnabled: config.surveyCheckinAnd6MonthUrl.replace('{accountNumber}', accountNumber)
    };
}
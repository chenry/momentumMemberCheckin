const transactionRepository = require("./transactionRepository");
const lookupService = require('./lookupService');

const fundName = 'Individual Contributions';
const appealName = 'Momentum Center Membership';

exports.annualRenewDue = async function(accountNumber, db) {        
    let constituentId = await lookupService.findConstituentIdByAccountNumber(accountNumber, db);
    let transactions = await transactionRepository.getTransactions(constituentId.constituentId);
    
    let latestTransaction = getLastRenewalTransaction(transactions.Results);
    let isRenewalDue;
    if (latestTransaction === undefined) 
    {
        isRenewalDue = true;
    } else {
        isRenewalDue = isLastRenewalMoreThanOneYear(latestTransaction.Date)
    }
    
    return {
        isRenewalDue: isRenewalDue
    };
}

function getLastRenewalTransaction(transactions) {
    let filteredTransactions = transactions.filter(item => {
        return isMembershipTransaction(item.Designations);        
    });
    
    filteredTransactions.sort((a, b) => {
        const date1 = new Date(a.Date);
        const date2 = new Date(b.Date);

        if (date1 < date2) {
            return -1;
        }

        if (date1 > date2) {
            return 1;
        }

        return 0;
    });
    
    return filteredTransactions[filteredTransactions.length - 1];
}

function isMembershipTransaction(designations) {
    let isMembership = false;
    for (i = 0; i < designations.length; i++) {
        let currentAppealName = "";
        let appeal = designations[i].Appeal;
        if (appeal !== undefined && appeal !== null) {
            currentAppealName = appeal.Name;
        }

        if (currentAppealName == appealName && designations[i].Fund.Name == fundName) {
            isMembership = true;
        }        
    }
    return isMembership;
}

function isLastRenewalMoreThanOneYear(lastRenewalDate) {
    let oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    return lastRenewalDate < oneYearAgo;
}
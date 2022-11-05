const transactionRepository = require("./transactionRepository");

const fundName = 'Individual Contributions';
const appealName = 'Momentum Center Membership';

exports.annualRenewDue = async function(accountNumber) {    
    let transactions = await transactionRepository.getTransactions(accountNumber);
    let latestTransaction = getLastRenewalTransaction(transactions.Results);

    return {
        isRenewalDue: isLastRenewalMoreThanOneYear(latestTransaction.Date)
    };
}

function getLastRenewalTransaction(transactions) {
    let filteredTransactions = transactions.filter((item) => {
        item.Designations.Fund.Name === fundName && item.Designations.Appeal.Name === appealName;
    });
    
    filteredTransactions.sort((a, b) => {
        const date1 = new Date(a);
        const date2 = new Date(b);

        if (date1 < date2) {
            return -1;
        }

        if (date1 > date2) {
            return 1;
        }

        return 0;
    });

    return filteredTransactions[transactions.length - 1];
}

function isLastRenewalMoreThanOneYear(lastRenewalDate) {
    let oneYearAgo = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);

    return lastRenewalDate < oneYearAgo;
}
/**
 * Account is defined as the following
 * account = {
 *   "CustomFields": {
 *     "Membership Application Date": [
 *       "01/01/2019"
 *     ]
 *   }
 * }
 * @param account
 * @returns {Date}
 */
exports.findNext6MonthDueDateByAccount = function (account) {

  if (!account) {
    throw new Error("Account is required")
  }

  let customFields = account["CustomFields"];
  if (!customFields) {
    throw new Error("Custom Fields are not available")
  }

  if (!customFields["Membership Application Date"]) {
    throw new Error("Membership Application Date is not available")
  }

  let membershipApplicationDateArray = customFields["Membership Application Date"];

  if (membershipApplicationDateArray == 0) {
    throw new Error("Account has missing Membership Application Date")
  }

  let memberApplicationDateString = membershipApplicationDateArray[0];

  var parts = memberApplicationDateString.split('/');
  var memberApplicationDate = new Date(parts[2], parts[0] - 1, parts[1]);

  console.log(`MemberApplicationDate: ${memberApplicationDate}`);

  var nextSixMonthDueDate = new Date(memberApplicationDate.getTime());
  while (true) {
    nextSixMonthDueDate = new Date(nextSixMonthDueDate.setMonth(nextSixMonthDueDate.getMonth() + 6))

    if (nextSixMonthDueDate) {
      if (nextSixMonthDueDate > new Date()) {
        break;
      }
    }
  }

  console.log(`MemberApplicationDate: ${memberApplicationDate}, Next6MonthDueDate: ${nextSixMonthDueDate}`);

  return nextSixMonthDueDate;

}

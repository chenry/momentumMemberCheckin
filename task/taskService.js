const fetch = require("node-fetch");
var constants = require("../constants");

exports.getOverdueTasksForConstituent = async function (constituentId) {
  let headers = {
    "X-API-KEY": `${process.env.BLOOMERANG_KEY_V2}`,
  };

  let baseUrl = new URL("https://api.bloomerang.co/v2/tasks/");
  let urlSearchParams = new URLSearchParams({
    constituent: constituentId,
    maxDueDate: new Date().toISOString(), // Client TZ checks aren't critical at this time
    status: constants.TASK_STATUS_ACTIVE,
    purpose: constants.TASK_PURPOSE,
  });

  let response = await fetch(`${baseUrl}?${urlSearchParams}`, {
    method: "GET",
    headers: headers,
  });

  return response.json();
};

exports.filterBySixMonthSurvey = function (taskList) {
  return taskList.filter(isSixMonthSurveyTask);
};

function isSixMonthSurveyTask(task) {
  return task.Subject == constants.SIX_MONTH_TASK_SUBJECT;
}

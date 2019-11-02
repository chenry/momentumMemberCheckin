const fetch = require('node-fetch');


exports.findTimeline = async function(accountNumber, bloomerangBaseApiUrl) {
  let jsonResponse;
  var headers = {
    Authorization: `Basic ${process.env.BLOOMERANG_KEY}`
  }

  try {
    var url = `${bloomerangBaseApiUrl}/Constituent/?q=${accountNumber}&ApiKey=${process.env.BLOOMERANG_KEY}`;
    console.log({url})
    var response = await fetch(url, { method: 'GET', headers: headers});
    jsonResponse = response.json();
  } catch (err) {
    console.error(err);
  }
  return jsonResponse;
}

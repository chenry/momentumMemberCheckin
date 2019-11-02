const fetch = require('node-fetch');

exports.findAccount = async function(accountNumber, bloomerangBaseApiUrl) {
    let jsonResponse;
  
    try {
      const url = `${bloomerangBaseApiUrl}Constituent/?q=${accountNumber}&ApiKey=${process.env.BLOOMERANG_KEY}`;
      console.log({url})
      const response = await fetch(url, { method: 'GET' });
      jsonResponse = response.json();
    } catch (err) {
      console.error(err);
    }
    return jsonResponse;
}
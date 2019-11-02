const fetch = require('node-fetch');

exports.findAccount = async function(accountNumber, bloomerangBaseApiUrl) {
    let jsonResponse;
    let headers = {
      Authorization: `Basic ${process.env.BLOOMERANG_KEY}`
    }  
  
    try {
      const url = `${bloomerangBaseApiUrl}Constituent/?q=${accountNumber}`;
      
      const response = await fetch(url, { method: 'GET', headers: headers });
      jsonResponse = response.json();
    } catch (err) {
      console.error(err);
    }
    return jsonResponse;
}
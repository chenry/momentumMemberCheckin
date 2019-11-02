const fetch = require('node-fetch');

exports.findAccount = async function(accountNumber, bloomerangBaseApiUrl) {
    let jsonResponse;
    let headers = {
      Authorization: `Basic ${process.env.BLOOMERANG_KEY}`
    }  
  
    const url = `${bloomerangBaseApiUrl}Constituent/?q=${accountNumber}`;
      
    const response = await fetch(url, { method: 'GET', headers: headers });
    jsonResponse = response.json();

    return jsonResponse;
}
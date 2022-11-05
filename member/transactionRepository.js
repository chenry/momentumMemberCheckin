const fetch = require('node-fetch');

exports.getTransactions = async function(accountNumber) {
    const bloomerangBaseApiUrl = 'https://api.bloomerang.co/v2/'
    let jsonResponse;
    let headers = {
      "X-API-KEY": `${process.env.BLOOMERANG_KEY_V2}`,
      "Content-Type": 'application/json'
    }  
  
    const url = `${bloomerangBaseApiUrl}transactions?accountId=${accountNumber}&type=Donation`;
      
    const response = await fetch(url, { method: 'GET', headers: headers });
    jsonResponse = response.json();

    return jsonResponse;
}
const fetch = require('node-fetch');

exports.insertInteraction = async function(interaction, bloomerangBaseApiUrl) {
    let jsonResponse;
    let headers = {
      Authorization: `Basic ${process.env.BLOOMERANG_KEY}`,
      "Content-Type": 'application/json'
    }  
  
    const url = `${bloomerangBaseApiUrl}Interaction`;
      
    const response = await fetch(url, { method: 'POST', body: JSON.stringify(interaction), headers: headers });
    jsonResponse = response.json();

    return jsonResponse;
}
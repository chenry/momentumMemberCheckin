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

  
// let id = req.query.id;
//   fetch('https://api.bloomerang.co/v1/Constituent/?q=' + id + '&ApiKey=' + process.env.BLOOMERANG_KEY)
//     .then(response => response.json())
//     .then(data => {
//       if (data.Total > 1) {
//         res.status(400);
//       }
//       else {
//         res.status(200).json(data.Results[0]);
//       }
//     });
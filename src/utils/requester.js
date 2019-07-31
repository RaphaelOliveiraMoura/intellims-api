const request = require('request');

module.exports = function makeRequestToGetMentions(url) {
  return new Promise((resolve, reject) => {
    console.log('\n\n');
    console.log(`Fazendo requisição para a url: ${url}`);
    console.log('\n\n');
    request({
      url,
      json: true,
      method: 'get'
    }, (error, response, body) => {
      if (error) reject(error);
      if (response && response.statusCode != 200) reject(response.body);
      if (body && body.success == false) reject(body);
      resolve(body);
    });
  });
}
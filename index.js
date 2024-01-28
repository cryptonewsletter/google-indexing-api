const fs = require('fs');
let request = require('request');
let { google } = require('googleapis');
let key = require('./service_account.json');

const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/indexing'],
  null
);

jwtClient.authorize(function(err, tokens) {
  if (err) {
    console.log(err);
    return;
  }

  const items = {
        'POST /v3/urlNotifications:publish HTTP/1.1\n' +
        'Content-Type: application/json\n\n' +
        JSON.stringify({
          url: line,
          type: 'URL_UPDATED'
        })
    };

  const options = {
    url: 'https://klk.in.edst.com/apiserver/api/v1/ask/search/docs',
    method: 'POST',
    headers: {
       'Content-Type': 'application/json',
       'Accept-Charset': 'utf-8'
     },
    body: items
 };

request.post(options, (err, res, body) => {
    if (err) {
        return console.log(err);
    }
    //console.log(`Status: ${res.statusCode}`);
    //res.write(response.statusCode.toString());
    console.log(body);
});

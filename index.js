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

  const line = 'https://cryptonewsletter.github.io/' + process.env.URL;

  const items = 
        JSON.stringify({
          url: line,
          type: 'URL_UPDATED'
        });

  const options = {
    url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
    method: 'POST',
    headers: {
       'Content-Type': 'application/json',
     },
    auth: { bearer: tokens.access_token },
    body: items
 };

request.post(options, (err, res, body) => {
    if (err) { él
        return console.log(err);
    }
    //console.log(`Status: ${res.statusCode}`);
    //res.write(response.statusCode.toString());
    console.log(body);
});
});

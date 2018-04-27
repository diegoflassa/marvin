'use strict';


//Dependencies
//////////////

const
  express = require('express');


//Config
////////

var router = express.Router();


//End-Points
////////////

// POST
router.post('/', (req, res, next) => {  
  console.log('Received POST');
  console.log('\tBody content => ' + req.body);
 
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {
      console.log("  entry=>" + req.body);

      // Gets the message. entry.messaging is an array, but 
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    console.log('body.object not page => ' + body.object);
  }

  // Returns a '200 OK' response to all requests
  res.status(200).send('EVENT_RECEIVED');
});

// GET
router.get('/', (req, res, next) => {
  console.log('Received GET');
  console.log('\tQuery Url  => ' + req.url);
  console.log('\tQuery content => ' + req.query);

  // Your verify token. Should be a random string.
  // TODO: Load from config
  let VERIFY_TOKEN = "dfl-magrathea-wh-vt"
    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  } else {
    console.log('mode or token not found');
    res.sendStatus(422);   
  }
});


module.exports = router;
'use strict';


//////////
//Config//
//////////

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()), // creates express http server
  //Horsehead Nebula is about 1500 light years from earth ;-)
  default_port = 1500;

// Sets server port and logs message on success
app.listen(process.env.PORT || default_port, () => {console.log('marvin is listening at port ' + default_port); console.log('The first ten million years are the worst')});



//////////////
//End-Points//
//////////////

// POST
app.post('/webhook', (req, res) => {  
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

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

// GET
app.get('/webhook', (req, res) => {
  console.log('Received GET');
  console.log('\tQuery content => ' + req.query);

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "<YOUR_VERIFY_TOKEN>"
    
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
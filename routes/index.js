'use strict';


//Dependencies
//////////////

const
  express = require('express');


//Config
////////

const
  router = express.Router();


//End-Points
////////////

router.get('/', function(req, res, next) {
  //TODO: Return simple landing page
  res.render('index', { title: 'Marvin - Messenger Webhook' });
});


module.exports = router;
'use strict';


//Dependencies
//////////////

const
  express = require('express');


//Config
////////

const
  router = express.Router(),
  services = ['Messenger','Aaaaa','Bbbbb','Ccccc'];


//End-Points
////////////

router.get('/', function(req, res, next) {
  //TODO: Eventually return json with server metadata
  res.send(services);
});


module.exports = router;
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

var authenticate = function(req){
  api_key = req.params.key;
  if(api_key == '1a2b3c4d'){
    return true;
  } else {
    return false;
  }
};

router.all('/api=:key?', function(req, res, next) {
  if(authenticate(req)){
    var file = path.join(__dirname, '../private/private.html');
    res.sendFile(file);
  }
  else {
    res.send('Nope!');
  }
});
router.all('/images/secretImage.png', function(req, res, next){
  var file = path.join(__dirname, '../private/images/secretImage.png');
  res.sendFile(file);
})


module.exports = router;

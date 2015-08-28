var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.all('/:id?', function(req, res, next) {
  var id = req.params.id;
  var file = path.join(__dirname, '../models/shipping.json')
  fs.readFile(file, function(err, data){
    objs = JSON.parse(data);
    if(id){
      objs.forEach(function(elem){
        if(elem.customerId == id){
          objs = elem;
        }
      })
    }
    res.send(objs);
  })
});

module.exports = router;

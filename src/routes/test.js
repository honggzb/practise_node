'use strict';

module.exports = function(done){
  $.router.get('/',function(req,res,next){
    res.end('The time is ${new Date()}.')
  });

  done();

};

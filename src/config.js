/**
* practise Node.js Project
*/
'use strict';

module.exports = function(set, get, has){
  // server port
  set('web.port',3000);

  //session secret
  set('web.session.secret','test');
}

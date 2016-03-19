'use strict';

import mongoose from 'mongoose';

module.exports = function(done){
  const debug = $.createDebug('init:mongodb');
  debug('connecting to Mongodb...');

  const conn = mongoose.createConnection($.config.get('db.mongodb'));
  $.mongodb = conn;
  $.model = {};
  done();
};

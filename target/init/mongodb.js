'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (done) {
  const debug = $.createDebug('init:mongodb');
  debug('connecting to Mongodb...');

  const conn = _mongoose2.default.createConnection($.config.get('db.mongodb'));
  $.mongodb = conn;
  $.model = {};
  done();
};
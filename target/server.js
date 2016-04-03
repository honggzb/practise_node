/**
* practise Node.js Project
*/
'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _projectCore = require('project-core');

var _projectCore2 = _interopRequireDefault(_projectCore);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $ = global.$ = new _projectCore2.default(); //全局

//create debug function
$.createDebug = function (name) {
  return (0, _debug2.default)('my:' + name);
};
const debug = $.createDebug('server');

//加载配置文件
$.init.add(done => {
  $.config.load(_path2.default.resolve(__dirname, 'config.js'));
  const env = process.env.NODE_ENV || null;
  if (env) {
    debug('load env: %s', env);
    $.config.load(_path2.default.resolve(__dirname, '../config', env + '.js'));
  }
  $.env = env;
  done();
});

// init mongoDB
$.init.load(_path2.default.resolve(__dirname, 'init', 'mongodb.js'));
//load models
$.init.load(_path2.default.resolve(__dirname, 'models'));

//load methods
$.init.load(_path2.default.resolve(__dirname, 'methods'));

//init Express
$.init.load(_path2.default.resolve(__dirname, 'init', 'express'));
//load route
$.init.load(_path2.default.resolve(__dirname, 'routes'));

//初始化
$.init(err => {
  if (err) {
    console.error(err);
    process.exit(-1); //非正常退出
  } else {
      console.log('inited [env=%s]', $.env);
    }

  //test mongodb connection
  // const item = new $.model.User({
  //   name: 'User${$.utils.date('Ymd')}',
  //   password: '123456',
  //   nickname: 'test User'
  // });
  // item.save(console.log);
  require('./test');
});
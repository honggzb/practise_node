/**
* practise Node.js Project
*/
'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _projectCore = require('project-core');

var _projectCore2 = _interopRequireDefault(_projectCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $ = global.$ = new _projectCore2.default(); //全局

//加载配置文件
$.init.add(done => {
  $.config.load(_path2.default.resolve(__dirname, 'config.js'));
  const env = process.env.NODE_ENV || null;
  if (env) {
    $.config.load(_path2.default.resolve(__dirname, '../config', env + '.js'));
  }
  $.env = env;
  done();
});

// init mongoDB
$.init.load(_path2.default.resolve(__dirname, 'init', 'mongodb.js'));

//初始化
$.init(err => {
  if (err) {
    console.error(err);
    process.exit(-1); //非正常退出
  } else {
      console.log('inited [env=%s]', $.env);
    }
});
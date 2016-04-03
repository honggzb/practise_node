/**
* practise Node.js Project
*/
'use strict';

import path from 'path';
import ProjectCore from 'project-core';
import createDebug from 'debug';

const $ = global.$ = new ProjectCore();  //全局

//create debug function
$.createDebug = function(name){
    return createDebug('my:'+name);
};
const debug = $.createDebug('server');

//加载配置文件
$.init.add((done) =>{
    $.config.load(path.resolve(__dirname,'config.js'));
    const env = process.env.NODE_ENV || null;
    if(env){
      debug('load env: %s', env);
      $.config.load(path.resolve(__dirname,'../config', env+'.js'));
    }
    $.env = env;
    done();
});

// init mongoDB
$.init.load(path.resolve(__dirname,'init','mongodb.js'));
//load models
$.init.load(path.resolve(__dirname,'models'));

//load methods
$.init.load(path.resolve(__dirname,'methods'));

//init Express
$.init.load(path.resolve(__dirname,'init','express'));
//init middleware
$.init.load(path.resolve(__dirname, 'middleware'));
//load route
$.init.load(path.resolve(__dirname,'routes'));

//初始化
$.init((err)=>{
  if(err){
    console.error(err);
    process.exit(-1);   //非正常退出
  }else{
    console.log('inited [env=%s]',$.env);
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

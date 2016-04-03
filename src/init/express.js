'use strict';

import path from 'path';
import mongoose from 'express';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import multiparty from 'connect-multiparty';
import session from 'express-session';

module.exports = function(done){
  const debug = $.createDebug('init:express');
  debug('initing express...');

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(multiparty());
  app.use(session({
    secret: $.config.get('web.session.secret')
  }));

  const Router = express.Router();
  //$.router = router;
  //封装express路由
  const routerWrap = {};
  ['get','head','post','put','del','delete'].forEach(method => {
    routerWrap[method] = function(path,...fnList) {
      fnList = fnList.map( fn => {
        return function(req,res,next){
          const ret = fn(req,res,next);
          if(ret && ret.catch) ret.catch(next);
        };
      });
      router[method](path,...fnList)
    };
  });
  $.router = routerWrap;
  //统一输出格式
  app.use(function(req,res,next) {
    res.apiSuccess = function (data) {
      res.json({success:true, result: data});
    }
    next();
  });
  app.use(router);
  app.use('/static',serveStatic(path.resolve(__dirname,'../../static')));

  app.use('/api',function(err, req,res,next){
    debug('API error: %s',err && err.stack || err);
    res.json({error: err.toString()});
  })

  app.listen($.config.get('web.port',(err)=>{
    done(err);
  }))

};

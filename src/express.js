'use strict';

import path from 'path';
import mongoose from 'express';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import multiparty from 'multiparty';

module.exports = function(done){
  const debug = $.createDebug('init:express');
  debug('initing express...');

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  const Router = express.Router();
  $.router = router;

  app.use(router);
  app.use('/static',serveStatic(path.resolve(__dirname,'../../static')));

  app.listen($.config.get('web.port',(err)=>{
    done(err);
  }))

};

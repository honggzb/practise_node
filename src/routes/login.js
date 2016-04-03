'use strict';

module.exports = function(done){

  $.router.get('api/login_user', async function(req,res,next) {
    res.json({user: req.session.user, token: req.session.logout_token});
  });

  $.router.post('api/login', async function(req,res,next) {

      if(!req.body.password) return next(new Error('missing password.'));

      const user = await $.method('user.get').call(req.body);
      if(!user) return next(new Error('user does not exist.'))

      console.log(user);
      if(!$.utils.validatePassword(req.body.password,user.password)){
        return next(new Error('inccorect password.'));
      }

      req.session.user = user;
      req.session.logout_token = $.utils.randomString(20);

      res.apiSuccess({token: req.session.logout_token});

  });

  $.router.get('api/logout', async function(req,res,next) {
    if(req.session.logout_token && req.query.token != req.session.logout_token){
      return next(new Error('invalid token;.'))
    }
    delete req.session.user;
    delete req.session.logout_token;

    res.apiSuccess({});

  });

  $.router.post('api/signup', async function(req,res,next) {
    const user = await $.method('user.add').call(req.query);
    res.apiSuccess({user: user});
  });

  done();
}

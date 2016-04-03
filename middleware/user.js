'use strict';

module.exports = function (done) {
  //检查用户是否登陆
  $.checkLogin = function(req,res,next){
    if(!(req.session.user && req.session.user._id) return next(new Error('Please login first.'));
    next();
  };
  //检查当前登录用户是否为帖子的作者
  $.checkTopicAuthor = async function(req,res,next){
    const topic = await $.method('topic.get').call({_id: req.params._id});
    if(!topic) return next(new Error(`topic ${req.params.topic_id} does not exists.`);
    //
    if(topic.authorId.toString() !== req.session.user._id.toString()){
      return next(new Error('access denied!'));
    }
    req.topic = topic;
    next();
  };

  done();
};

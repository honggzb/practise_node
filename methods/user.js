
'use strict';
import validator from 'validator';

module.exports = function (done) {
  $.method('user.add').check({
    name: {required:true, validate: (v) => validator.isLength(v, {min: 4, max:20}) && /^[a-zA-Z]/.test(v)},
    email: {required:true, validate: (v) => validator.isEmail(v)},
    password:{required:true, validate: (v) => , validate: (v) => validator.isLength(v,{min: 6})}
  });

  $.method('user.add').register(async function(params) {
    //console.log(params);
    //callback(params);
    params.name = params.name.toLowerCase();
    {
      const user = await $.method('user.get').call({name: params.name});
      if(user) throw new Error(`user ${params.name} already exist.`);
    }
    {
      const user = await $.method('user.get').call({name: params.email});
      if(user) throw new Error(`user ${params.email} already exist.`);
    }
    params.password = $.utils.encryptPassword(params.password.toString());
    const user = await $.model.User(params);
    return user.save();
  });

  $.method('user.get').check({
    _id: {validate: (v) => validator.isMongoId(v)},
    name: {required:true, validate: (v) => validator.isLength(v, {min: 4, max:20}) && /^[a-zA-Z]/.test(v)},
    email: {required:true, validate: (v) => validator.isEmail(v)}
  });
  $.method('user.get').register(async function(params) {
    const query = {};
    if(params._id){
      query._id = params._id;
    }else if(params.name){
      query.name = params.name;
    }else if(params.email){
      query.email = params.email;
    }else {
      throw new Error('missing parameter _id|name|email.');
    }
    return $.model.User.findOne(query);
  });

  $.method('user.update').check({
    _id: {validate: (v) => validator.isMongoId(v)},
    name: {required:true, validate: (v) => validator.isLength(v, {min: 4, max:20}) && /^[a-zA-Z]/.test(v)},
    email: {required:true, validate: (v) => validator.isEmail(v)}
  });
  $.method('user.update').register(async function(params) {
      const user = await $.method('user.get').call(params);
      if(!user){
        throw new Error('User does not exist.');
      }
      const update = {};
      if(params.name && user.name !== params.name){ update.name = params.name; }
      if(params.email && users.email !== params.email){ update.email = params.email; }
      if(params.password){ update.password = params.password; }
      if(params.nickname){ update.nickname = params.nickname; }
      if(params.about){ update.about = params.about; }

      return $.model.User.update({_id: user._id},{$set: update});
  });

  done();
};

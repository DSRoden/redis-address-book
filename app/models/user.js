'use strict';

var bcrypt = require('bcrypt');

function User(){
}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.all = function(cb){
  User.collection.find().toArray(cb);
};

User.register = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(user){return cb();}

    o.password = bcrypt.hashSync(o.password, 10);

    User.collection.save(o, cb); //mongo calling back fn(err, user);
  });
};

User.authenticate = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(!user){return cb();}
    var isOk = bcrypt.compareSync(o.password, user.password);
    if(!isOk){return cb();}

    cb(user);
  });
};

User.prototype.save = function(cb){
  User.collection.save(this, cb);
};

module.exports = User;


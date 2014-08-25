'use strict';

var User = require('../models/user');

exports.new = function(req, res){
  res.render('users/new');
};

exports.create = function(req, res){
  User.register(req.body, function(err, user){
    if(user){
      res.redirect('/');
    } else {
      res.redirect('/register');
    }
  });
};

exports.login = function(req, res){
  console.log('looking into res.locals');
  console.log(res.locals);
  res.render('users/login');
};

exports.authenticate = function(req, res){
  User.authenticate(req.body, function(user){
    if(user){
      req.session.userId = user._id;
      req.session.save(function(){
        res.redirect('/');
      });

      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  });
};



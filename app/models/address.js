'use strict';

function Address(o,id){
  this.name = o.name;
  this.color = o.color;
  this.userId = id;
}

Object.defineProperty(Address, 'collection', {
  get: function(){return global.mongodb.collection('addresses');}
});

Address.all = function(cb){
  Address.collection.find().toArray(cb);
};

Address.create = function(o,id, cb){
  var address = new Address(o, id);
  Address.collection.save(address,cb);
};

Address.findAllByUserId = function(userId, cb){
  Address.collection.find({userId:userId}).toArray(cb); 
};

module.exports = Address;


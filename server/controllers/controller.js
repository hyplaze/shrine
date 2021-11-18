const user = require('../models/user');
const Website = require('../models/website');

exports.test = function (req,res){
  res.send("吸我的大牛子");
};

exports.register = async function (req, res){
  try{
    var useracount = await user.findOne({"username": req.body.username},(err, userEvent) => {});
    if(useracount != null){
      res.send(false);
    }
    else{
      const newuser = new user(
        req.body
      );
    }
  }
  catch{
    res.send(false);
  }
};

exports.login = async function(req, res){
  try{
      var useracount = await user.findOne({"username": req.query.username, "password": req.query.password}, (err, userEvent) => {});
      if(useracount != null){
        //generate cookie
        res.send("successfully connected cookie");
      }
  }
  catch{
    res.send(false);
  }
};

exports.addbox = async function(req, res){
  try{
    var useracount = await user.findOne({"cookie": req.query.cookie});
    if(useracount != null){
      const box = new website({
        MasterUser : useracount.username,
        boxid : req.body.boxid,
        username : req.body.username,
        boxname : req.body.boxname,
        password : req.body.password,
        url : req.body.url,
        twoFA : req.body.twoFA
      });
      box.save();
      res.send(true);
    }
    else{
      res.send(false)
    }
  }
  catch{
    res.send(false);
  }
};

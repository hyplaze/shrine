const user = require('../models/user');
const website = require('../models/website');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('../config.js');
const key = fs.readFileSync(__dirname + '/../config/private.key','utf8');

exports.test = function (req,res){
  res.send("吸我的大牛子");
};

exports.register = async function (req, res){
  try{
    var useracount = await user.findOne({"username": req.body.Email});
    //console.log("passed await");
    if(useracount != null){
      res.send("not working bruh this account exists "+false);
    }
    else{
      //console.log("attempting to create user\n");
      const newuser = new user({
        username : req.body.Email,
        masterPassword : req.body.mph,
        cookie : req.body.mph
      });
      newuser.save();
      res.json({Status: true});
  }
}
  catch{
    res.json({Status: false});
  }
};

exports.login = async function(req, res){
  try{
      var useracount = await user.findOne({"masterPassword": req.body.mph});
      if(useracount != null){
        //console.log("creating token");
        const token = jwt.sign(
          {mph: req.body.mph},
          key,
          {expiresIn: "3h"}
        );

        res.json({Status: true,
                  cookie: token});
      }
      else{
        //console.log("cant find user");
        res.json({Status: false,
                  cookie: 0});
      }

  }
  catch{
    res.send({Status: false,
              cookie: 0});
  }
};


exports.addbox = async function(req, res){
  try{
    //console.log(req.body.cookie);
    var useracount = await user.findOne({"masterPassword": req.user});
    //console.log("passed await");
    if(useracount != null){
      //console.log("creating box");
      const box = new website({
        MasterUser: req.user,
        boxid: req.body.boxid,
        boxname: req.body.boxname,
        twoFA: req.body.twoFA,
        username: req.body.username,
        url: req.body.url,
        password: req.body.password
      });
      box.save();
      res.json({Status: true,
                cookie: req.body.cookie});
    }
  else{
    //console.log("account doesn't exist");
      res.json({Status: false});
    }
  }
  catch{
    res.json({Status:false});
  }
};

//this function is currently wrong, please see addbox style
exports.getbox = async function(req, res){
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

exports.changebox = async function(req, res){
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

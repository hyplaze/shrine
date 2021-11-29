const user = require('../models/user');
const website = require('../models/website');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('../config.js');
const key = fs.readFileSync(__dirname + '/../config/private.key','utf8');
const blacklist = [];
exports.test = function (req,res){
  res.send("吸我的大牛子");
};

exports.register = async function (req, res){
  try{
    var useracount = await user.findOne({"username": req.body.Email});
    //console.log(useracount);

    //res.send(useracount.username);
    if(useracount != null){
      return res.json({Status: false,
                       Error:"user email already exists"});
    }
    else{
      //console.log("attempting to create user\n");
      const newuser = new user({
        username : req.body.Email,
        masterPassword : req.body.mph,
        cookie : req.body.mph
      });
      newuser.save();
      return res.json({Status: true});
  }
}
  catch{
    return res.json({Status: false, Error:"unkown error"});
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

        return res.json({Status: true,
                  cookie: token});
      }
      else{
        //console.log("cant find user");
        return res.json({Status: false,
                  cookie: 0,
                  Error:"username or password does not exist"});
      }

  }
  catch{
    return res.json({Status: false,
              cookie: 0,
              Error:"unknown error"});
  }
};


exports.addbox = async function(req, res){
  try{
    //console.log(req.body.cookie);
    if(req.user == null){
      return res.json({Status: false,
                       Error:"missing or invalid token"});
    }
    if(blacklist.includes(req.body.cookie)){
      return res.json({Status:false,
                      Error:"user already logged out"});
    }
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
      return res.json({Status: true,
                cookie: req.body.cookie});
    }
  else{
    //console.log("account doesn't exist");
      return res.json({Status: false,
                Error: "user does not exist"});
    }
  }
  catch{
    return res.json({Status:false, Error:"unknown error"});
  }
};



exports.changebox = async function(req, res){
  try{
    if(req.user == null){
      return res.json({Status: false,
                       Error:"missing or invalid token"});
    }
    if(blacklist.includes(req.body.cookie)){
      return res.json({Status:false,
                      Error:"user already logged out"});
    }
    var useracount = await user.findOne({"cookie": req.user});
    if(useracount != null){
      var box = await website.findOne({"MasterUser": req.user, "boxid":req.body.boxid});
    }
    else{
      return res.json({Status:false,Error: "user does not exist"});
    }
    if(box != null){
      box = await website.findOneAndUpdate({"MasterUser": req.user, "boxid":req.body.boxid},
                                           {"MasterUser": req.user,"boxid":req.body.boxid, "username":req.body.username,
                                            "boxname": req.body.boxname, "url": req.body.url, "twoFA": req.body.twoFA,
                                            "password": req.body.password});
      //box.save();
      return res.json({Status: true});
    }
    else{
      return res.json({Status:false,Error:"user box does not exist"});
    }
  }
  catch{
    return res.json({Status:false,Error:"unknown error"});
  }
};

exports.getbox = async function(req, res){
  try{
    if(req.user == null){
      return res.json({Status: false,
                       Error:"missing or invalid token"});
    }
    if(blacklist.includes(req.body.cookie)){
      return res.json({Status:false,
                      Error:"user already logged out"});
    }
    var useracount = await user.findOne({"masterPassword": req.user});
    if(useracount != null){
      var userbox = await website.findOne({"MasterUser": req.user, "boxid": req.body.boxid});
    }
    else{
      return res.json({Status:false,Error: "user does not exist"});
    }
    if(userbox != null){
      res.json({Status: true,
                username: userbox.username,
                url: userbox.url,
                password: userbox.password,
                twoFA: userbox.twoFA
                });
    }
    else{
      return res.json({Status: false,Error: "user box does not exist"});
    }
  }
  catch{
    return res.json({Status:false,Error:"unknown error"});
  }
};

exports.basicrequest = async function(req, res){
  try{
    if(req.user == null){
      return res.json({Status: false,
                       Error:"missing or invalid token"});
    }
    if(blacklist.includes(req.body.cookie)){
      return res.json({Status:false,
                      Error:"user already logged out"});
    }
    var useracount = await user.findOne({"masterPassword": req.user});
    if(useracount != null){
      var userbox = await website.find({"MasterUser": req.user});
      res.json(userbox);
    }
    else{
      return res.json({Status: false,Error: "user does not exist"});
    }
  }
  catch{
    return res.json({Status: false,Error:"unknown error"});
  }
};

exports.deletebox = async function(req, res){
  try{
    if(req.user == null){
      return res.json({Status: false,
                       Error:"missing or invalid token"});
    }
    if(blacklist.includes(req.body.cookie)){
      return res.json({Status:false,
                      Error:"user already logged out"});
    }
    var useracount = await user.findOne({"masterPassword": req.user});
    if(useracount != null){
      var userbox = await website.findOne({"MasterUser": useracount.masterPassword, "boxid": req.body.boxid});
    }
    else{
      return res.json({Status: false,Error: "user does not exist"});
    }
    if(userbox != null){
       userbox = await website.deleteOne({"MasterUser": req.user, "boxid": req.body.boxid});
      return res.json({Status: true});
    }
    else{
      return res.json({Status: false,Error: "user box does not exist"});
    }
  }
  catch{
      return res.json({Status: false,Error:"unknown error"});
    }
};

exports.logout = async function(req, res){
  try{
    if(req.user == null){
      return res.json({Status: false,
                       Error:"missing or invalid token"});
    }
    if(blacklist.includes(req.body.cookie)){
      return res.json({Status:false,
                      Error:"user already logged out"});
    }
    blacklist.push(req.body.cookie);
    return res.json({Status:true});
  }
  catch{
    return res.json({Status: false,Error:"unknown error"});
  }
};

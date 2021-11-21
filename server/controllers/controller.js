const user = require('../models/user');
const Website = require('../models/website');

exports.test = function (req,res){
  res.send("吸我的大牛子");
};

exports.register = async function (req, res){
  try{
    var useracount = await user.findOne({"username": req.body.Email});
    console.log("passed await");
    if(useracount != null){
      res.send("not working bruh this account exists bruh"+false);
    }   
    else{
      console.log("attempting to create user\n");
      const newuser = new user({
        username : req.body.Email,
        masterPassword : req.body.mph,
        cookie : req.body.mph
      });
      newuser.save();
      res.send(true);
  }
}
  catch{
    res.send(false);
  }
};

exports.login = async function(req, res){
  try{
      var useracount = await user.findOne({"username": req.body.Email, "masterPassword": req.body.mph});
      if(useracount != null){
        //generate cookie
        res.send("successfully connected cookie");
      }
      else{
        res.send(false);
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

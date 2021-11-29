const jwt = require('jsonwebtoken');
const fs = require('fs');
const key = fs.readFileSync(__dirname + '/config/private.key','utf8');

exports.verifyToken = function (req,res,next){
  //console.log("verify is being called");
  const token = req.body.cookie || req.query.cookie || req.headers["x-access-token"];
  if(!token){
    req.user=null;
  }
  try{
    const decode = jwt.verify(token,key);
    req.user = decode.mph;
  }
  catch{
    req.user=null;
  }
  next();
};

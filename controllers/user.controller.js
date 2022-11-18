const UserModel = require("../models/user.model.js");
const ObjectID = require("mongoose").Types.ObjectId;
var fs =require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { signUpErrors, signInErrors } = require('../utils/errors.utils.js');

const maxAge = 3 * 24 * 60 * 60 * 1000;

module.exports.signUp = async (req, res) => {
  const {username, email, password, phone, age} = req.body
  console.log({username, email, password, phone, age });
    try {
      const user = await UserModel.create({username, email, password, phone, age });
      console.log(user);
      res.status(200).send({ message: "Success",user});
    }catch(err) {
      const errors = signUpErrors(err);
      res.status(500).send({ message : errors })
    }
  }


module.exports.signIn = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await UserModel.login(username, password);
    let token = jwt.sign({id: user._id, nom: user.pseudo, role: user.role}, process.env.TOKEN_SECRET,{expiresIn:'3h'});
    res.header('x-access-token',token).json({ 
      message : 'Success' ,
      id : user._id,
      username : user.username,
      email : user.email,
    });

  } catch (err){
    res.status(201).send({ message : err.message });
  }
}
module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

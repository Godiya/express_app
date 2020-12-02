const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const passport = require('passport');
const user = require('../models/user');
const multerConfig = require('../config/multer');
const multer = require('multer');
// const { token } = require('morgan');
const jwtStrategy = require('passport-jwt').Strategy;


async function getUsers(req, res){
    const view = await models.User.findAll();
    res.json(view);
};

async function getSingleUser(req, res){
    const view = await models.User.findOne({where:{id:req.user.id}});
    res.json(view);
};

async function login(req, res){
    var data = req.body;
    const email = data.email;
    const password = data.password;
    
    const user = await models.User.findOne({where: {email}});

    if(!user){
        return res.json("Try again")
    }

    const checkPassword = bcrypt.compareSync(password, user.password);
    if(!checkPassword){
        return res.json("password incorrect")
    }
    const payload = {
        id:user.id,
    }
    const token = jwt.sign(payload, "myVerySecret");
    res.json({
        "token": token,
        "msg": "SUCCESSFUL",
        "user": user,
        "statusCode": 200
    })
};

async function register(req, res){
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);

    var data = req.body;
    data.password = hash;
    const content = await models.User.create({firstName: data.firstName, lastName: data.lastName, email: data.email, password: data.password});
   return res.json("Successfull");
};

async function uploadProfilePicture(req, res){
    multerConfig.singleUpload(req, res, function(err){
        if(err instanceof multer.MulterError){
            return res.json(err.message);
        }
        else if(err){
            return res.json(err);
        }
        else if (!req.file){
            return res.json({"image": req.file, "msg": 'please select an image to upload'});
        }
        if(req.file){
            return res.json({
                'msg': 'uploaded',
                'file': req.file
            });
        }
    })
}


module.exports = {
    register,
    login,
    getUsers,
    getSingleUser,
    uploadProfilePicture   
}
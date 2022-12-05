const db = require('../config/db')


const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secret_access_token = "DJOEUOI#**+%*($40953080983409806093KLJEKnkdlkoiojl2JDLKe";
const secret_refresh_token = "ijrtjJDKELklkjl45898454985";

const validateToken = (req,res,next) => {
    var token = req.headers.authorization;
    if(token){
        token = token.split(" ")
        token = token[1]
        jwt.verify(token,secret_access_token,(err,objectInof)=>{
            if(!err){
                // res.json({
                //     message: "Incorrect token",
                //     user : objectInof.user
                // })
                req.user = objectInof.user;
                next();

            }else{
                res.json({
                    error: true,
                    message: err
                })
            }
        })
    }else{
        res.json({
            error: true,
            message: "Plaase fill in token!"
        })
    }
}

const refreshToken = (req,res) => {
    var refresh_token = req.body.refresh_token;
    if(refresh_token == "" || refresh_token == null){
        res.json({
            error:true,
            message:"Please fill in refresh toekn!"
        })
    }else{
        jwt.verify(refresh_token,secret_refresh_token,(err,objInfo)=>{
            if(!err){
                // provide new user info and token,refresh to client
                var access_token = jwt.sign({user:objInfo.user},secret_access_token,{expiresIn:60})
                var refresh_token = jwt.sign({user:objInfo.user},secret_refresh_token,{expiresIn:"1h"})
                res.json({
                    message : "login success!",
                    user : objInfo.user,
                    access_token : access_token,
                    refresh_token : refresh_token
                })
            }else{
                res.json({
                    error : true,
                    message:err
                })
            }
        })
    }
}

const index = (req,res)=>{
    // res.send("getCustomer");
    db.query("select * from tb_user",(err,result)=>{
        if(!err){
            res.json({
                result 
            })
        }else{
            res.json({
                error : true,
                message : err
            })
        }
    })
}

const save = (req,res)=>{
    var body = req.body;
    var message = {};
    validateSave(message,body);
    if(Object.keys(message).length>0){
        res.json({
            error : true,
            message : message
        })
        return false
    }
    var password = bcrypt.hashSync(body.password,10) // 123456 => JDKLEIOKSNLEKjkk398203808345980834590
    var sql = "INSERT INTO tb_user (username, password, email, telephone, status) VALUES (?,?,?,?,?)"
    db.query(sql,[body.username, password ,body.email, body.telephone, body.status],(err,result)=>{
        if(!err){
            res.json({
                error : false,
                message : "Insert successful!"
            })
        }else{
            res.json({
                error : true,
                message : err
            })
        }
    })
}

const login = (req,res) => {
    var body = req.body;
    var message = {};
    if(body.username == "" || body.username == null){
        message["username"] = "Please fill in  username!";
    }
    if(body.password == "" || body.password == null){
        message["password"] = "Please fill in  password!";
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
        return false
    }
    // check is existing user
    db.query("SELECT * , COUNT(user_id) as total FROM tb_user WHERE username = ?",[body.username],(err,result)=>{
        var user = result
        if(!err){
            if(user[0].total != 0){
                user = user[0];
                // check is correct password
                if(bcrypt.compareSync(body.password,user.password)){
                    user.password = undefined;
                    // generate jwt token for client
                    var access_token = jwt.sign({user:user},secret_access_token,{expiresIn:60})
                    var refresh_token = jwt.sign({user:user},secret_refresh_token,{expiresIn:"1h"})
                    res.json({
                        message : "login success!",
                        user : user,
                        access_token : access_token,
                        refresh_token : refresh_token
                    })
                }else{
                    res.json({
                        error : true,
                        message : "Incorrect password!"
                    })
                }
            }else{
                res.json({
                    error : true,
                    message : "User does not exist!"
                })
            }
           
        }
    })

}

const update = (req,res)=>{
    var body = req.body;
    var message = {};
    validateSave(message,body);
    if(Object.keys(message).length>0){
        res.json({
            error : true,
            message : message
        })
        return false
    }
  
    var sql = "UPDATE tb_user SET username = ?, email = ?, telephone = ?, status = ? WHERE user_id = ?"
    db.query(sql,[body.username, body.email, body.telephone, body.status, body.user_id],(err,result)=>{
        if(!err){
            res.json({
                error : false,
                message : "Update successful!"
            })
        }else{
            res.json({
                error : true,
                message : err
            })
        }
    })
}
const deleteUser =(req,res)=>{
    var body = req.body;
    var sql = "UPDATE tb_user SET  status = 0 WHERE user_id = ?"
    db.query(sql,[body.user_id],(err,result)=>{
        if(!err){
            res.json({
                error : false,
                message : "Delete successful!"
            })
        }else{
            res.json({
                error : true,
                message : err
            })
        }
    })
}


const validateSave =(message,body)=>{
    if(body.username == "" || body.username == null){
        message["first_name"] = "first_name require!"
    }

    if(body.telephone== "" || body.telephone== null){
        message["last_name"] = "last_name require!"
    }

    if(body.status === "" || body.status == null){
        message["status"] = "status require!"
    }
}

module.exports = {
    index,
    save,
    update,
    deleteUser,
    login,
    validateToken,
    refreshToken
}
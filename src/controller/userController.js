const db = require('../config/db')


index = (req,res)=>{
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

save = (req,res)=>{
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
    var sql = "INSERT INTO tb_user (username, password, email, telephone, status) VALUES (?,?,?,?,?)"
    db.query(sql,[body.username, body.password ,body.email, body.telephone, body.status],(err,result)=>{
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
update = (req,res)=>{
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
deleteUser =(req,res)=>{
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


validateSave =(message,body)=>{
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
    deleteUser
}
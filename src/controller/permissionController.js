const db = require('../config/db')


index = (req,res)=>{
    // res.send("getCustomer");
    db.query("select * from tb_permission",(err,result)=>{
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
    var sql = "INSERT INTO tb_permission (username, code, description, status) VALUES (?,?,?,?)"
    db.query(sql,[body.username, body.code ,body.description, body.status],(err,result)=>{
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
    var sql = "UPDATE tb_permission SET username = ?, code = ?, description = ?,  status = ? WHERE permission_id = ?"
    db.query(sql,[body.username, body.code, body.description, body.status, body.permission_id],(err,result)=>{
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
deletePermission =(req,res)=>{
    var body = req.body;
    var sql = "UPDATE tb_permission SET  status = 0 WHERE permission_id = ?"
    db.query(sql,[body.permission_id],(err,result)=>{
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
        message["username"] = "username require!"
    }

    if(body.code == "" || body.code == null){
        message["code"] = "code require!"
    }

    if(body.status === "" || body.status == null){
        message["status"] = "status require!"
    }
}

module.exports = {
    index,
    save,
    update,
    deletePermission
}
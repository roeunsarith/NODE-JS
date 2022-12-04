const db = require('../config/db')


index = (req,res)=>{
    // res.send("getCustomer");
    db.query("select * from tb_role",(err,result)=>{
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
    var sql = "INSERT INTO tb_role (name, code, status) VALUES (?,?,?)"
    db.query(sql,[body.name, body.code, body.status],(err,result)=>{
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
    var sql = "UPDATE tb_role SET name = ?, code = ?, status = ? WHERE role_id = ?"
    db.query(sql,[body.name, body.code, body.status, body.role_id],(err,result)=>{
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
deleteRole =(req,res)=>{
    var body = req.body;
    var sql = "UPDATE tb_role SET  status = 0 WHERE role_id = ?"
    db.query(sql,[body.role_id],(err,result)=>{
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
    if(body.name == "" || body.name == null){
        message["name"] = "name require!"
    }

    if(body.code == "" || body.code == null){
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
    deleteRole
}
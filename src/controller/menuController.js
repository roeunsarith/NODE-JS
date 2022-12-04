const db = require('../config/db')


index = (req,res)=>{
    // res.send("getCustomer");
    db.query("select * from tb_menu",(err,result)=>{
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
    var sql = "INSERT INTO tb_menu (title, description, icon, parent, status) VALUES (?,?,?,?,?)"
    db.query(sql,[body.title, body.description ,body.icon, body.parent, body.status],(err,result)=>{
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
    var sql = "UPDATE tb_menu SET title = ?, description = ?, icon = ?, parent = ?, status = ? WHERE menu_id = ?"
    db.query(sql,[body.title, body.description, body.icon, body.parent, body.status, body.menu_id],(err,result)=>{
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
deleteMenu=(req,res)=>{
    var body = req.body;
    var sql = "UPDATE tb_menu SET  status = 0 WHERE menu_id = ?"
    db.query(sql,[body.menu_id],(err,result)=>{
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
    if(body.title == "" || body.title == null){
        message["title"] = "title require!"
    }

    if(body.status === "" || body.status == null){
        message["status"] = "status require!"
    }
}

module.exports = {
    index,
    save,
    update,
    deleteMenu
}
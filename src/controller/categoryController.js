const db = require('../config/db')


const getCategorys = (req,res)=>{
    // res.send("getCustomer");
    var body = req.body;
    var sql = "select * from tb_category"
    if(body.name && body.name!=0 && body.name !=null){
        sql += " where name like concat('%',?,'%')"
    }
    db.query(sql,[body.name],(err,result)=>{
        if(!err){
            res.json({
                list : result 
            })
        }else{
            res.json({
                error : true,
                message : err
            })
        }
    })
}
const getCategory = (req,res)=>{
    var body =  parseInt(req.params.id);
    var sql = "select * from tb_category where Category_id = ?"
    db.query(sql,[body],(err,result)=>{
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
const addCategory = (req,res)=>{
    var body = req.body;
    var message = {};
    validateAdd(message,body);
    if(Object.keys(message).length>0){
        res.json({
            error : true,
            message : message
        })
        return false
    }
    var sql = "INSERT INTO tb_category (name, parent, image, od, status) VALUES (?,?,?,?,?)"
    db.query(sql,[body.name, body.parent, body.image, body.od, body.status],(err,result)=>{
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
const updateCategory = (req,res)=>{
    var body = req.body;
    var message = {};
    validateAdd(message,body);
    if(Object.keys(message).length>0){
        res.json({
            error : true,
            message : message
        })
        return false
    }
    var sql = "UPDATE tb_category SET name = ?, parent = ?, image = ?, od = ?, status = ? WHERE category_id = ?"
    db.query(sql,[body.name, body.parent, body.image, body.od, body.status, body.category_id],(err,result)=>{
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
const deleteCategory = (req,res)=>{
    var body = req.body;
    var sql = "DELETE FROM tb_category WHERE category_id = ?"
    db.query(sql,[body.Category_id],(err,result)=>{
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


const validateAdd =(message,body)=>{
    if(body.name == "" || body.name == null){
        message["name"] = "name require!"
    }
   
    if(body.status === "" || body.status == null){
        message["status"] = "status require!"
    }
}

module.exports = {
    getCategory,
    getCategorys,
    addCategory,
    updateCategory,
    deleteCategory
}
const db = require('../config/db')


const getCategorys = (req,res)=>{
    // res.send("getCustomer");
    var body = req.body;
    var sql = " SELECT c.category_id, c.parent_id, c.image,cd1.name as name1 , cd2.name as name2, cd3.name as name3 \n" +
    "FROM tb_category c \n " +
    "left join tb_category c1 on (c.parent_id = c1.category_id) \n" +
    "left join tb_category c2 on (c1.parent_id = c2.category_id) \n" +
    "left join tb_category_description cd1 on (c.category_id = cd1.category_id) \n" +
    "left join tb_category_description cd2 on (c1.category_id = cd2.category_id) \n" +
    "left join tb_category_description cd3 on (c2.category_id = cd3.category_id) \n" +
    "GROUP BY c.category_id order by cd1.name asc "       
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
const CategoryInfo = (req,res)=>{
    var body = req.body;
    var sql = "SELECT c.category_id, c.parent_id, c.created_at, c.created_by , c.image, cd.name , c.status \n" + 
            "from tb_category c \n" +
            "left join tb_category_description cd on (c.category_id = cd.category_id) \n" + 
            "where c.category_id = ?"
    db.query(sql,[body.category_id],(err,result)=>{
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
    getCategorys,
    CategoryInfo,
    addCategory,
    updateCategory,
    deleteCategory
}
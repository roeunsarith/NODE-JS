const db = require('../config/db')


const getCourses = (req,res)=>{
    // res.send("getCustomer");
    db.query("select * from tb_course",(err,result)=>{
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
const getCourse = (req,res)=>{
    var body =  parseInt(req.params.id);
    var sql = "select * from tb_course where course_id = ?"
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
const addCourse = (req,res)=>{
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
    var sql = "INSERT INTO tb_course (name, category_id, full_price, description, status) VALUES (?,?,?,?,?)"
    db.query(sql,[body.name, body.category_id, body.full_price, body.description, body.status],(err,result)=>{
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
const updateCourse = (req,res)=>{
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
    var sql = "UPDATE tb_course SET name = ?, category_id = ?, full_price = ?, description = ?, status = ? WHERE course_id = ?"
    db.query(sql,[body.name, body.category_id, body.full_price, body.description, body.status, body.course_id],(err,result)=>{
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


const validateAdd =(message,body)=>{
    if(body.category_id == "" || body.category_id  == null){
        message["category_id "] = "category_id  require!"
    }
    if(body.name == "" || body.name == null){
        message["name"] = "name require!"
    }  
    if(body.full_price == "" || body.full_price == null){
        message["full_price"] = "full_price require!"
    }
    if(body.status === "" || body.status == null){
        message["status"] = "status require!"
    }
}

module.exports = {
    getCourse,
    getCourses,
    addCourse,
    updateCourse
}
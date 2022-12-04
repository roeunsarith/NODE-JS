const db = require('../config/db')


getCustomers = (req,res)=>{
    // res.send("getCustomer");
    db.query("select * from tb_customer",(err,result)=>{
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
getCustomer = (req,res)=>{
    var body =  parseInt(req.params.id);
    var sql = "select * from tb_customer where customer_id = ?"
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
addCustomer = (req,res)=>{
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
    var sql = "INSERT INTO tb_customer (first_name, last_name, gender, email, phone, status) VALUES (?,?,?,?,?,?)"
    db.query(sql,[body.first_name, body.last_name, body.gender, body.email, body.phone, body.status],(err,result)=>{
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
updateCustomer = (req,res)=>{
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
    var sql = "UPDATE tb_customer SET first_name = ?, last_name = ?, gender = ?, email = ?, phone = ?, status = ? WHERE customer_id = ?"
    db.query(sql,[body.first_name, body.last_name, body.gender, body.email, body.phone, body.status, body.customer_id],(err,result)=>{
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
deleteCustomer = (req,res)=>{
    var body = req.body;
    var sql = "DELETE FROM tb_customer WHERE customer_id = ?"
    db.query(sql,[body.customer_id],(err,result)=>{
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


validateAdd =(message,body)=>{
    if(body.first_name == "" || body.first_name == null){
        message["first_name"] = "first_name require!"
    }

    if(body.last_name == "" || body.last_name == null){
        message["last_name"] = "last_name require!"
    }
    if(body.gender === "" || body.gender == null){
        message["gender"] = "gender require!"
    }

    if(body.status === "" || body.status == null){
        message["status"] = "status require!"
    }
}

module.exports = {
    getCustomer,
    getCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
}
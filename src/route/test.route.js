const db = require('../config/db')
const controllerTest = require('../controller/test.controller')
const test =(app) =>{
    app.get('/',(req,res)=>{
        db.query("select * from tb_category",(err,result)=>{
            res.json(result)
        })
        // res.send("Route");
    })

    app.get("/test/getlist",controllerTest.getlist);
    app.get("/test/add",controllerTest.addlist);
}
module.exports = test;
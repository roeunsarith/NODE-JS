const express = require('express');
const app = express();
const db = require('./src/config/db')
app.use(express.json());

require('./src/route/test.route')(app);
require('./src/route/customer.route')(app);
require('./src/route/roleRoute')(app);
require('./src/route/permissionRoute')(app);
require('./src/route/userRoute')(app);
require('./src/route/menuRoute')(app);
app.listen(8080,()=>{
    console.log("Server Run : localhost:8080");
})
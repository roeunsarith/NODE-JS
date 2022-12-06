const express = require('express');
const cors = require("cors")
const app = express();
const db = require('./src/config/db')
var corsOptions = {
    origin: "*"
};

app.use(express.json());
app.use(cors(corsOptions));

require('./src/route/test.route')(app);
require('./src/route/customer.route')(app);
require('./src/route/roleRoute')(app);
require('./src/route/permissionRoute')(app);
require('./src/route/userRoute')(app);
require('./src/route/menuRoute')(app);
require('./src/route/categoryRoute')(app);
require('./src/route/courseRoute')(app);
app.listen(8080,()=>{
    console.log("Server Run : localhost:8080");
})
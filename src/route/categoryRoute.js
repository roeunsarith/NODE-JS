const categoryController = require('../controller/categoryController')
const {validateToken} = require("../controller/userController")
const category = (app) =>{
    app.post('/api/category/getCategory',categoryController.getCategorys)
    app.get('/api/category/getCategory/:id',categoryController.getCategory)
    app.post('/api/category/addCategory',categoryController.addCategory)
    app.post('/api/category/updateCategory',categoryController.updateCategory)
    app.post('/api/category/deleteCategory',categoryController.deleteCategory)
}

module.exports = category;
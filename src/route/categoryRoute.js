const categoryController = require('../controller/categoryController')
const {validateToken} = require("../controller/userController")
const category = (app) =>{
    app.post('/api/category/getCategory',categoryController.getCategorys)   
    app.post('/api/category/CategoryInfo',categoryController.CategoryInfo)
    app.post('/api/category/autoComplete',categoryController.AutoComplete) 
    app.post('/api/category/addCategory',categoryController.addCategory)
    app.post('/api/category/updateCategory',categoryController.updateCategory)
    app.post('/api/category/deleteCategory',categoryController.deleteCategory)
}

module.exports = category;
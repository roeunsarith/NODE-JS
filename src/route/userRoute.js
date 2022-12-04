const userController = require('../controller/userController')
const user = (app) =>{
    app.get('/api/user',userController.index)
    app.post('/api/user',userController.save)
    app.put('/api/user',userController.update)
    app.delete('/api/user',userController.deleteUser)
    // app.post('/api/user/as',customerController.deleteCustomer)
}

module.exports = user;
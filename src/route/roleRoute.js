const roleController = require('../controller/roleController')
const role = (app) =>{
    app.get('/api/role',roleController.index)
    app.post('/api/role',roleController.save)
    app.put('/api/role',roleController.update)
    app.delete('/api/role',roleController.deleteRole)
    // app.post('/api/role/as',customerController.deleteCustomer)
}

module.exports = role;
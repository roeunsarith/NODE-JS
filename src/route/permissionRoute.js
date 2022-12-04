const permissionController = require('../controller/permissionController')
const permission = (app) =>{
    app.get('/api/permission',permissionController.index)
    app.post('/api/permission',permissionController.save)
    app.put('/api/permission',permissionController.update)
    app.delete('/api/permission',permissionController.deletePermission)
    // app.post('/api/permission/as',customerController.deleteCustomer)
}

module.exports = permission;
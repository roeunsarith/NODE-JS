const customerController = require('../controller/customerController')
const {validateToken} = require("../controller/userController")
const customer = (app) =>{
    app.get('/api/customer/getCustomer',customerController.getCustomers)
    app.get('/api/customer/getCustomer/:id',customerController.getCustomer)
    app.post('/api/customer/addCustomer',customerController.addCustomer)
    app.post('/api/customer/updateCustomer',customerController.updateCustomer)
    app.post('/api/customer/deleteCustomer',customerController.deleteCustomer)
}

module.exports = customer;
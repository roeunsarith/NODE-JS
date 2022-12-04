const menuController = require('../controller/menuController')
const menu = (app) =>{
    app.get('/api/menu',menuController.index)
    app.post('/api/menu',menuController.save)
    app.put('/api/menu',menuController.update)
    app.delete('/api/menu',menuController.deleteMenu)
    // app.post('/api/menu/as',customerController.deleteCustomer)
}

module.exports = menu;
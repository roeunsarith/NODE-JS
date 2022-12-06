const courseController = require('../controller/courseController')
const {validateToken} = require("../controller/userController")
const course = (app) =>{
    app.get('/api/course/getCourse',courseController.getCourses)
    app.get('/api/course/getCourse/:id',courseController.getCourse)
    app.post('/api/course/addCourse',courseController.addCourse)
    app.post('/api/course/updateCourse',courseController.updateCourse)
}

module.exports = course;
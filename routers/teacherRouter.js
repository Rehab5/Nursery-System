// teacherRoute.js
const express = require("express");
const teacherController = require("../controllers/teacherController");
const {
  insertValidator,
  updateValidator,
  deleteValidator,
  getByIdValidator,
} = require("../MiddleWare/validation/teacherValidator");
const validator = require("../MiddleWare/validation/validator");
const {changePasswordUser} = require("../controllers/teacherController")
const router = express.Router();

// Define routes for teachers
router.route("/teachers")
  .get(teacherController.getAllTeachers)
  .post(insertValidator, validator, teacherController.insertTeacher)
  .patch(updateValidator, validator, teacherController.updateTeacher);

// Define routes for individual teacher by ID
router.route("/teachers/:_id")
  .get(getByIdValidator, validator, teacherController.getTeacherById)
  .delete(deleteValidator, validator, teacherController.deleteTeacher);

// Route to get all class supervisors
router.get('/teachers/supervisors', teacherController.getAllClassSupervisors);

// Route to change password
router.patch('/teachers/change-password', changePasswordUser);

module.exports = router;

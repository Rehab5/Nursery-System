// classRoute.js
const express = require("express");
const classController = require("../controllers/classController");
const {
  classValidator,
  updateValidator,
  deleteValidator,
  getByIdValidator,
} = require("../MiddleWare/validation/classValidator");
const validator = require("../MiddleWare/validation/validator");
const router = express.Router();

router
  .route("/classes")
  .get(classController.getAllClasses)
  .post(classValidator, validator, classController.insertClass)
  .patch(updateValidator,validator, classController.updateClass);

router
  .route("/classes/:_id")
  .get(getByIdValidator, validator,classController.getClassById)
  .delete(deleteValidator, validator,classController.deleteClass)

router.get('/classes/child/:_id', getByIdValidator, validator,classController.getAllClassChildren);
router.get('/classes/teacher/:_id', getByIdValidator, validator,classController.getAllSupervisors);
module.exports = router;
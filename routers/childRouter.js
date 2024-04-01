// childRoute.js
const express = require("express");
const childController = require("../controllers/childController");
const {
  childValidator,
  updateValidator,
  deleteValidator,
  getByIdValidator,
} = require("../MiddleWare/validation/childValidator");
const validator = require("../MiddleWare/validation/validator");
const router = express.Router();

router
  .route("/children")
  .get(childController.getAllChildren)
  .post(childValidator, validator, childController.insertChild)
  .patch(updateValidator, validator, childController.updateChild);
router
  .route("/children/:_id")
  .get(getByIdValidator, validator, childController.getChildById)
  .delete(deleteValidator, validator, childController.deleteChild);

module.exports = router;
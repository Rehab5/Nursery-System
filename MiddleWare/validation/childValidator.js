const { body, param, query } = require("express-validator");

exports.childValidator = [
  body("_id")
    .isInt()
    .withMessage("Child ID should be an integer")
    ,
  body("fullName")
    .isString()
    .withMessage("Fullname should be a string"),

  body("age")
    .isInt({ min: 0 })
    .withMessage("Age should be a positive integer"),

  body("level")
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("Invalid level"),

  body("address.city")
    .isString()
    .withMessage("City should be a string"),

  body("address.street")
    .isString()
    .withMessage("Street should be a string"),

  body("address.building")
    .isString()
    .withMessage("Building should be a string")
];

exports.updateValidator = [
  body("_id")
    .optional()
    .isInt()
    .withMessage("Child ID should be an integer"),
  body("fullName")
    .optional()
    .isString()
    .withMessage("Fullname should be a string"),

  body("age")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Age should be a positive integer"),

  body("level")
    .optional()
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("Invalid level"),

  body("address.city")
    .optional()
    .isString()
    .withMessage("City should be a string"),

  body("address.street")
    .optional()
    .isString()
    .withMessage("Street should be a string"),

  body("address.building")
    .isString()
    .withMessage("Building should be a string")
];


exports.deleteValidator = [
  param('_id')
  .isInt()
  .withMessage('_id Must be an integer')
];

exports.getByIdValidator = [
  param('_id')
  .isInt()
  .withMessage('_id Must be an integer')
];
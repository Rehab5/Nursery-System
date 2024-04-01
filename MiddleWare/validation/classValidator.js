const { body, param, query } = require("express-validator");

exports.classValidator = [
  body("_id")
    .isInt()
    .withMessage("Class ID should be an integer")
    .custom(() => {
        next(new Error());
    }),
  body("name")
    .isString()
    .withMessage("Class name should be a string"),

  body("supervisor")
    .isInt()
    .withMessage("Supervisor ID should be an integer"),

  body("children")
    .isArray()
    .withMessage("Children should be an array"),
  body("children.*")
    .isInt()
    .withMessage("Child ID in children array should be an integer")
];

exports.updateValidator = [
  body("_id")
    .optional()
    .isInt()
    .withMessage("Class ID should be an integer"),
  
  body("name")
    .optional()
    .isString()
    .withMessage("Class name should be a string")
    .isLength({ min: 2 })
    .withMessage("Class name should have a minimum length of 2 characters"),
  
  body("supervisor")
    .optional()
    .isInt()
    .withMessage("Supervisor ID should be an integer"),
  
  body("children")
    .optional()
    .isArray()
    .withMessage("Children should be an array"),
  
  body("children.*")
    .optional()
    .isInt()
    .withMessage("Child ID in children array should be an integer")
];

exports.deleteValidator = [
  param("_id")
    .isInt()
    .withMessage("Class ID must be an integer")
];

exports.getByIdValidator = [
  param("_id")
    .isInt()
    .withMessage("Class ID must be an integer")
];
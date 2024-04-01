const { body, param, query } = require("express-validator");

exports.insertValidator = [
    body("_id")
      .isMongoId()
      .withMessage("Teacher id should be an object"),
    body("fullName")
      .isAlpha()
      .withMessage("Teacher fullName should be string")
      .isLength({ max: 25 })
      .withMessage(" Teacher fullName lenght<25"),
    body('email')
        .trim()
        .isEmail()
        .withMessage("Invalid Email"),
    body("password")
        .isLength({min:6})
        .withMessage("Password should be more than 6"),
    body("image")
        .isString()
        .withMessage("Image should be a string")
  ];

exports.updateValidator =[
  body("_id")
    .optional()
    .isMongoId()
    .withMessage("Teacher id should be an object"),
  body("fullName")
    .optional()
    .isAlpha()
    .withMessage("Teacher fullName should be string")
    .isLength({ min: 25 })
    .withMessage(" Teacher fullName lenght>25"),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage("Invalid Email"),
  body("password")
    .optional()
    .isLength({min:6})
    .withMessage("Password should be more than 6"),
  body("image")
    .optional()
    .isString()
    .withMessage("Image should be a string")
]

// 
exports.deleteValidator = [
  param('_id')
  .isMongoId()
  .withMessage('_id Must be an objectID')
];

exports.getByIdValidator = [
  param('_id')
  .isMongoId()
  .withMessage('_id Must be an objectID')
];
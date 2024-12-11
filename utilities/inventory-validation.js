const utilities = require(".")
const { body, validationResult } = require("express-validator")
const accountModel = require("../models/account-model")
const validate = {}


/*  **********************************
  *  Inventory Update Data Validation Rules
  * ********************************* */
validate.checkUpdateData = () => {
  return [
    // inv_make is required and must be string
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a make."), // on error this message is sent.

    // inv_model is required and must be string
    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide a model."), // on error this message is sent.

    // inv_year is required and must be a number
    body("inv_year")
      .trim()
      .escape()
      .notEmpty()
      .isInt()
      .withMessage("Please provide a year."), // on error this message is sent.

    // inv_description is required and must be string
    body("inv_description")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide a description."), // on error this message is sent.
    
    // inv_image is required and must be string
    body("inv_image")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide an image."), // on error this message is sent.
    
    // inv_thumbnail is required and must be string
    body("inv_thumbnail")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide a thumbnail."), // on error this message is sent.

    // inv_price is required and must be a number
    body("inv_price")
      .trim()
      .escape()
      .notEmpty()
      .isFloat()
      .withMessage("Please provide a price."), // on error this message is sent.

    // inv_miles is required and must be a number
    body("inv_miles")
      .trim()
      .escape()
      .notEmpty()
      .isInt()
      .withMessage("Please provide a mileage."), // on error this message

    // inv_color is required and must be string
    body("inv_color")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide a color."), // on error this message is sent.

    // classification_id is required and must be a number
    body("classification_id")
      .trim()
      .escape()
      .notEmpty()
      .isInt()
      .withMessage("Please provide a classification id."), // on error this message is sent.

    // inv_id is required and must be a number
    body("inv_id")
      .trim()
      .escape()
      .notEmpty()
      .isInt()
      .withMessage("Invalid inventory id."), // on error this message is sent.
  ]
}
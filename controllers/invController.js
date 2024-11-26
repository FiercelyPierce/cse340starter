const e = require("connect-flash")
const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.buildByVehicleDetail = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getVehicleDetailById(inv_id)
  const detail = await utilities.buildDetailGrid(data)
  let nav = await utilities.getNav()
  res.render("./inventory/detail", {
    title: data[0].inv_make + " " + data[0].inv_model,
    nav,
    detail,
  })
}

/* ***************************
 *  Build management view
 * ************************** */
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
  })
}

/* ***************************
 *  Build add classification view
 * ************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}

/* ***************************
 *  Process add classification
 * ************************** */
invCont.processAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body
  const data = await invModel.insertClassification(classification_name)

  if (data) {
    req.flash(
      "notice", 
      `${classification_name} classification added successfully.`
    )
    res.status(201).render("./inventory/management",{
      title: "Inventory Management",
      nav,
      errors: null,
    })
  } else {
    req.flash(
      "notice", 
      `Sorry, there was an error adding the ${classification_name} classification.`
    )
    res.status(500).render("./inventory/add-classification", {
      title: "Inventory Management",
      nav,
      errors: null,
    })
  }
}

/* ***************************
 *  Build add inventory view
 * ************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classifications = await invModel.getClassifications()
  res.render("./inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    classifications,
    errors: null,
  })
}

/* ***************************
 *  Process add inventory
 * ************************** */
invCont.processAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_color,
    inv_price,
    inv_condition,
    classification_id,
    inv_thumbnail,
    inv_description,
  } = req.body
  const data = await invModel.insertInventory(
    inv_make,
    inv_model,
    inv_year,
    inv_color,
    inv_price,
    inv_condition,
    classification_id,
    inv_thumbnail,
    inv_description
  )
  if (data.rowCount == 1) {
    req.flash(
      "notice", 
      "Inventory added successfully."
    )
    res.status(201).render("/inv", {
      title: "Inventory Management",
      nav,
      errors: null,
    })
  } else {
    req.flash(
      "notice", 
      "Sorry, there was an error adding the inventory."
    )
    res.status(500).render("/inv", {
      title: "Inventory Management",
      nav,
      errors: null,
    })
  }
}


module.exports = invCont
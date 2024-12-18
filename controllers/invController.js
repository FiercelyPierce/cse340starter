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
    errors: null,
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
    errors: null,
  })
}


/* ***************************
 *  Build management view
 * ************************** */
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  let data = await invModel.getClassifications()
  const classificationSelect = await utilities.buildClassificationList(data.rows)
  const accountType = utilities.checkEmployee
  res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
    classificationSelect,
    accountType,
    errors: null,
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
  let data = await invModel.getClassifications()
  let classifications = await utilities.buildClassificationList(data.rows)
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
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body

  let image_name = '/images/vehicles/' + inv_image
  let thumbnail_name = '/images/vehicles/' + inv_thumbnail
  
  const data = await invModel.insertInventory(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    image_name,
    thumbnail_name,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  )
  if (data.rowCount == 1) {
    req.flash(
      "notice", 
      "Inventory added successfully."
    )
    res.status(201).render("./inventory/management", {
      title: "Inventory Management",
      nav,
      errors: null,
    })
  } else {
    req.flash(
      "notice", 
      "Sorry, there was an error adding the inventory."
    )
    res.status(500).render("./inventory/management", {
      title: "Inventory Management",
      nav,
      errors: null,
    })
  }
}


/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}


/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.buildEditInventory = async (req, res, next) => {
  const inv_id = parseInt(req.params.invId)
  let nav = await utilities.getNav()
  const itemData = await invModel.getVehicleDetailById(inv_id)
  let data = await invModel.getClassifications()
  const classificationSelect = await utilities.buildClassificationList(data.rows)
  const itemName = `${itemData[0].inv_make} ${itemData[0].inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classifications: classificationSelect,
    errors: null,
    inv_id: itemData[0].inv_id,
    inv_make: itemData[0].inv_make,
    inv_model: itemData[0].inv_model,
    inv_year: itemData[0].inv_year,
    inv_description: itemData[0].inv_description,
    inv_image: itemData[0].inv_image,
    inv_thumbnail: itemData[0].inv_thumbnail,
    inv_price: itemData[0].inv_price,
    inv_miles: itemData[0].inv_miles,
    inv_color: itemData[0].inv_color,
    classification_id: itemData[0].classification_id
  })
}


/* ***************************
 *  Update inventory
 * ************************** */
invCont.processUpdateInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
    inv_id
  } = req.body

  const updateResult = await invModel.updateInventory(
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
    inv_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")
  } else {
    let data = await invModel.getClassifications()
    const classificationSelect = await utilities.buildClassificationList(data.rows)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("inventory/edit-inventory", {
      title: "Edit " + itemName,
      nav,
      classifications: classificationSelect,
      errors: null,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    })
  }
}


/* ***************************
 *  Build delete inventory
 * ************************** */
invCont.buildDeleteInventory = async function (req, res, next) {
  const inv_id = parseInt(req.params.invId)
  let nav = await utilities.getNav()
  const itemData = await invModel.getVehicleDetailById(inv_id)
  const itemName = `${itemData[0].inv_make} ${itemData[0].inv_model}`
  res.render("./inventory/delete-confirm", {
    title: "Delete " + itemName,
    nav,
    errors: null,
    inv_id: itemData[0].inv_id,
    inv_make: itemData[0].inv_make,
    inv_model: itemData[0].inv_model,
    inv_year: itemData[0].inv_year,
    inv_price: itemData[0].inv_price
  })
}


/* ***************************
 *  Delete inventory
 * ************************** */
invCont.processDeleteInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const inv_id = parseInt(req.body.inv_id)

  const deleteResult = await invModel.deleteInventory(inv_id)

  if (deleteResult) {
    req.flash("notice", `The deletion was successful.`)
    res.redirect("/inv/")
  } else {
    let data = await invModel.getClassifications()
    req.flash("notice", "Sorry, the insert failed.")
    res.redirect("/inv/delete-inventory/" + inv_id)
  }
}


module.exports = invCont
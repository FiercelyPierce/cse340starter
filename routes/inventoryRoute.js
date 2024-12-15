// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")

// Route to build inventory management view
router.get(
  "/", 
  utilities.checkEmployee,
  utilities.handleErrors(invController.buildManagement)
)
// Route to build inventory by classification view
router.get(
  "/type/:classificationId", 
  utilities.checkEmployee,
  utilities.handleErrors(invController.buildByClassificationId)
)
// Route to build vehicle detail view
router.get(
  "/detail/:invId", 
  utilities.checkEmployee,
  utilities.handleErrors(invController.buildByVehicleDetail)
)
// Route to build add classification view
router.get(
  "/add-classification", 
  utilities.checkEmployee,
  utilities.handleErrors(invController.buildAddClassification)
)
// Route to process add classification view
router.post(
  "/add-classification", 
  utilities.checkEmployee,
  utilities.handleErrors(invController.processAddClassification)
)
// Route to build add inventory view
router.get(
  "/add-inventory", 
  utilities.checkEmployee,
  utilities.handleErrors(invController.buildAddInventory)
)
// Route to process add inventory view
router.post(
  "/add-inventory", 
  utilities.checkEmployee,
  utilities.handleErrors(invController.processAddInventory)
)
// Route to process edit inventory view
router.get(
  "/getInventory/:classification_id", 
  utilities.checkEmployee,
  utilities.handleErrors(invController.getInventoryJSON)
)
// Route to process edit inventory view
router.get(
  "/edit-inventory/:invId", 
  utilities.checkEmployee,
  utilities.handleErrors(invController.buildEditInventory)
)
// Route to update inventory view
router.post(
  "/update/", 
  utilities.checkEmployee,
  utilities.handleErrors(invController.processUpdateInventory)
)
// Route to delete inventory view
router.get(
  "/delete-inventory/:invId", 
  utilities.checkEmployee,
  utilities.handleErrors(invController.buildDeleteInventory)
)
// Route to process delete inventory view
router.post(
  "/delete-inventory", 
  utilities.checkEmployee,
  utilities.handleErrors(invController.processDeleteInventory)
)


module.exports = router;
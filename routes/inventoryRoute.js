// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/", invController.buildManagement)
router.get("/add-classification", invController.buildAddClassification)
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:invId", invController.buildByVehicleDetail);

module.exports = router;
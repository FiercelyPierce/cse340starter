const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')


// Route to build account view
router.get(
  "/", 
  utilities.checkLogin, 
  utilities.handleErrors(accountController.buildManagement)
)
router.get(
  "/login", 
  utilities.handleErrors(accountController.buildLogin)
)
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)
router.get(
  "/register", 
  utilities.handleErrors(accountController.buildRegister)
)
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)
router.get(
  "/update",
  utilities.handleErrors(accountController.buildUpdate)
)
router.post(
  "/update",
  regValidate.updateRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(accountController.updateAccount)
)
router.get(
  "/logout",
  utilities.handleErrors(accountController.buildLogout)
)
router.post(
  "/logout",
  utilities.handleErrors(accountController.accountLogout)
)


module.exports = router;
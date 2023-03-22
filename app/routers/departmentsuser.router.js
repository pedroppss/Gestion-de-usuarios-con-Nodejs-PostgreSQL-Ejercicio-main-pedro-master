

/* Importing the userController and userAuth modules. */
const express = require('express')
const userController = require('../Controllers/departmentsuser.controller.js')
const { signup, login } = userController
const userAuth = require('../Middleware/userAuth')
const router = express.Router()

/* Calling the `userAuth.saveUser` middleware function and then the `signup` controller function. */
router.post("/signup",userAuth.saveUser,signup);
/* Calling the `login` controller function. */
router.post('/login', login )

module.exports = router
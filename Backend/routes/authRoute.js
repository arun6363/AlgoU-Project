const express = require("express")
const contoller =require("../controllers/authcontroller.js")

const router = express.Router();

router.post("/login",contoller.login)

router.post("/register",contoller.register)
router.post("/protect",contoller.protect)

module.exports = router;
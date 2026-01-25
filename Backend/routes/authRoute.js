import express from "express"
import * as controller from "../controllers/authcontroller.js"
import validateRequest from "../middlewares/valiadateRequest.js";


const router = express.Router();

router.post("/login",controller.loginValidationRules(),validateRequest,controller.login)
router.post("/register",controller.registerValidationRules(),validateRequest,controller.register)
router.post("/register/:id",controller.deleteuser)
router.patch("/updatepassword",controller.updateValidationRules(),validateRequest,controller.updatepassword)
router.post("/protect",controller.protect)

export default router
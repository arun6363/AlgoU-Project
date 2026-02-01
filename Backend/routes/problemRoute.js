import express from "express"
const router = express.Router()

import { createproblem, problemValidationRules,fetchproblems} from "../controllers/problemcontroller.js"
import  validateRequest from "../middlewares/valiadateRequest.js";

router.post("/createproblem",problemValidationRules(),validateRequest,createproblem)
router.post("/fetchproblems",fetchproblems)

export default router;
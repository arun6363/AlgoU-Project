import express from "express"
const router = express.Router()

import { createproblem, problemValidationRules,fetchproblems,getproblembyid,getcreatedproblems} from "../controllers/problemcontroller.js"
import  validateRequest from "../middlewares/valiadateRequest.js";

router.post("/createproblem",problemValidationRules(),validateRequest,createproblem)
router.get("/fetchproblems",fetchproblems)
router.post("/getproblembyid/:id",getproblembyid)
router.get("/getcreatedproblems",getcreatedproblems)

export default router;
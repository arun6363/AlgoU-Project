import express from "express"
const router = express.Router()

import { createproblem, problemValidationRules,fetchproblems,getproblembyid,getcreatedproblems,deleteproblem,editproblem} from "../controllers/problemcontroller.js"
import  validateRequest from "../middlewares/valiadateRequest.js";

router.post("/createproblem",problemValidationRules(),validateRequest,createproblem)
router.get("/fetchproblems",fetchproblems)
router.post("/getproblembyid/:id",getproblembyid)
router.get("/getcreatedproblems",getcreatedproblems)
router.post("/deleteproblem",deleteproblem)
router.patch("/editproblem",editproblem)

export default router;
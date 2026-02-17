import express from "express"
const router = express.Router()

import { createproblem, problemValidationRules,fetchproblems,getproblembyid,getcreatedproblems,deleteproblem,editproblem, fetchTestcase, fetchdata, deleteaccount, fetchdata_user, fetchtestcase_submit, updateSolved, getsolvedproblems} from "../controllers/problemcontroller.js"
import  validateRequest from "../middlewares/valiadateRequest.js";

router.post("/createproblem",problemValidationRules(),validateRequest,createproblem)
router.get("/fetchproblems",fetchproblems)
router.post("/getproblembyid/:id",getproblembyid)
router.get("/getcreatedproblems",getcreatedproblems)
router.get("/getsolvedproblems",getsolvedproblems)
router.post("/deleteproblem",deleteproblem)
router.patch("/editproblem",problemValidationRules(),validateRequest,editproblem)
router.post("/fetchtestcase",fetchTestcase)
router.post("/fetchtestcase_submit",fetchtestcase_submit)
router.post("/fetchdata",fetchdata)
router.post("/fetchdata_user",fetchdata_user)
router.post("/deleteaccount",deleteaccount)
router.post("/update_solved",updateSolved)

export default router;
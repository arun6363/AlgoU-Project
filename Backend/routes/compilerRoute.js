import express from "express"
import { codeRun, run_submissions, run_testcases } from "../controllers/compilercontroller.js"


const router = express.Router();

router.post("/run",codeRun)
router.post("/run_testcases",run_testcases)
router.post("/run_submissions",run_submissions)

export default router
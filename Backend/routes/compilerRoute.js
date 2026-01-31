import express from "express"
import { codeRun } from "../controllers/compilercontroller.js"


const router = express.Router();

router.post("/run",codeRun)

export default router
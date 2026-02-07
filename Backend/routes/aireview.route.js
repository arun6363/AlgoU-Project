import express from "express"
import {aireview} from "../controllers/aireview.controller.js"
const router = express.Router()


router.post("/ai-review",aireview)

export default router;
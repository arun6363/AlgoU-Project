import express from "express"
const router = express.Router()

import userprofile from "../controllers/usercontroller.js"

router.get("/userprofile",userprofile)

export default router;
const express = require('express')
const router = express.Router()
const {getCategories, newCategory, deleteCategory, saveAttribute} = require("../controllers/categoryController")

const { vaildToken, checkIfAdmin } = require("../settings/vaildToken")

router.get("/", getCategories)

router.use(vaildToken)
router.use(checkIfAdmin)
router.post("/", newCategory)
router.delete("/:category", deleteCategory)
router.post("/atrybut", saveAttribute)

module.exports = router

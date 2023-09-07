const express = require('express')
const router = express.Router()
const { getProducts, getProductsById, getBestsellers, getProductsAdmin, deleteProductAdmin, createProductAdmin, updateProductAdmin, uploadAdmin, deleteImgAdmin } = require("../controllers/productController")


const { vaildToken, checkIfAdmin } = require("../settings/vaildToken")

router.get("/kategoria/:categoryName/szukaj/:searchQuery", getProducts)
router.get("/kategoria/:categoryName", getProducts)
router.get("/szukaj/:searchQuery", getProducts)
router.get("/", getProducts)
router.get("/bestsellers", getBestsellers)
router.get("/get-one/:id", getProductsById)

//admin
router.use(vaildToken)
router.use(checkIfAdmin)
router.get("/admin", getProductsAdmin)
router.delete("/admin/:id", deleteProductAdmin)
router.delete("/admin/img/:imgPath/:productId", deleteImgAdmin)
router.put("/admin/:id", updateProductAdmin)
router.post("/admin/przeslij", uploadAdmin)
router.post("/admin", createProductAdmin)



module.exports = router

const express = require('express')
const router = express.Router()
const { vaildToken, checkIfAdmin } = require("../settings/vaildToken")
const { userOrders, userOrder, createOrder, updateOrderToPaid, updateOrderToDelivered, adminOrders, adminOrderStats } = require("../controllers/orderController")

//user
router.use(vaildToken)
router.get("/", userOrders)
router.get("/uzytkownik/:id", userOrder)
router.post("/", createOrder)
router.put("/oplacone/:id", updateOrderToPaid);

//admin
router.use(checkIfAdmin)
router.put("/dostarczone/:id", updateOrderToDelivered)
router.get("/admin", adminOrders)
router.get("/statystki/:date", adminOrderStats)

module.exports = router

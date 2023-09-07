const express = require('express')
const router = express.Router()
const { vaildToken, checkIfAdmin } = require("../settings/vaildToken")
const { getUsers, registerUser, loginUser, updateProfile, userProfile, writeReview, getUser, updateUser, deleteUser } = require("../controllers/userController")

router.post("/zarejestruj", registerUser)
router.post("/zaloguj", loginUser)

//user
router.use(vaildToken);
router.put("/profil", updateProfile)
router.get("/profil/:id", userProfile)
router.post("/recenzja/:productId", writeReview)

//admin
router.use(checkIfAdmin)
router.get("/", getUsers)
router.get("/:id", getUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

module.exports = router

const jwt = require("jsonwebtoken")

//verifyAdmin
const vaildToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token
    if (!token) {
      return res.status(403).send("Błąd validacja tokena!")
    }

    try {
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.user = decodeToken
      next()
    } catch (error) {
      return res.status(401).send("Niepoprawny token podczas autoryzacji!")
    }

  } catch (error) {
    next(error)
  }
}

const checkIfAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    return res.status(401).send("Brak uprawnień administartora!")
  }
}

module.exports = { vaildToken, checkIfAdmin }

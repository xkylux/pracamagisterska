const express = require("express")
const app = express()
const productRoutes = require("./productRoutes")
const categoryRoutes = require("./categoryRoutes")
const userRoutes = require("./userRoutes")
const orderRoutes = require("./orderRoutes")

const jwt = require("jsonwebtoken");

app.get("/wyloguj", (req, res) => {
  return res.clearCookie("access_token").send("access token deleted");
});

app.get("/get-token", (req, res) => {
  try {
    const accessToken = req.cookies["access_token"];
    const decodeToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    return res.json({ token: decodeToken.name, isAdmin: decodeToken.isAdmin });
  } catch (error) {
    return res.status(401).send(" ")
  }
})

app.use("/produkty", productRoutes)
app.use("/kategorie", categoryRoutes)
app.use("/uzytkownicy", userRoutes)
app.use("/zamowienia", orderRoutes)

module.exports = app




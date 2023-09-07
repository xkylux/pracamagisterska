const User = require("../models/userModel")
const Review = require("../models/reviewModel")
const Product = require("../models/productModel")
const { hashPassword, comparePassword } = require("../settings/hashPassword")
const authorizationToken = require("../settings/authorizationToken")
const { use } = require("../routes/userRoutes")

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password")
    return res.json(users)
  } catch (error) {
    next(error)
  }
}

const registerUser = async (req, res, next) => {
  try {

    const { name, lastName, email, password } = req.body
    if (!(name && lastName && email && password)) {
      return res.status(400).send("Wszystkie pola są wymagane!")
    }

    const busyEmail = await User.findOne({ email })
    if (busyEmail) {
      return res.status(400).send("Użytkownik o takim e-mailu już istnieje!")
    } else {
      const hashedPassword = hashPassword(password)
      const user = await User.create({
        name, lastName, email: email.toLowerCase(), password: hashedPassword
      });
      res
        .cookie("access_token", authorizationToken(user._id, user.name, user.lastName, user.email, user.isAdmin), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict"
        })
        .status(201)
        .json({ success: "Konto zostało utworzone!", userCreated: { _id: user._id, name: user.name, lastName: user.lastName, email: user.email, isAdmin: user.isAdmin } })
    }

  } catch (error) {
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body
    if (!(email && password)) {
      return res.status(400).send("Wszystkie pola są wymagane!")
    }

    const user = await User.findOne({ email }).orFail();
    if (user && comparePassword(password, user.password)) {
      // compare password
      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
      }

      if (doNotLogout) {
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 8 } //1000 = 1ms
      }

      return res.cookie("access_token", authorizationToken(user._id, user.name, user.lastName, user.email, user.isAdmin), cookieParams).json({ success: "Użytkownik zalogowany", userLoggedIn: { _id: user._id, name: user.name, lastName: user.lastName, email: user.email, isAdmin: user.isAdmin, doNotLogout } });
    } else {
      return res.status(401).send("Błędne dane!")
    }
  } catch (error) {
    next(error)
  }
}

const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    // user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.country = req.body.country;
    user.zipCode = req.body.zipCode;
    user.city = req.body.city;
    user.state = req.body.state;
    if (req.body.password !== user.password) {
      user.password = hashPassword(req.body.password);
    }
    await user.save();

    res.json({
      success: "user updated",
      userUpdated: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
};

const userProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    return res.send(user);
  } catch (error) {
    next(error)
  }
}

const writeReview = async (req, res, next) => {
  try {

    const session = await Review.startSession();

    // get comment, rating from request.body:
    const { comment, rating } = req.body;
    // validate request:
    if (!(comment && rating)) {
      return res.status(400).send("All inputs are required");
    }

    // create review id manually because it is needed also for saving in Product collection
    const ObjectId = require("mongodb").ObjectId;
    let reviewId = ObjectId();

    session.startTransaction();

    await Review.create([
      {
        _id: reviewId,
        comment: comment,
        rating: Number(rating),
        user: { _id: req.user._id, name: req.user.name + " " + req.user.lastName },
      }
    ], { session: session })

    const product = await Product.findById(req.params.productId).populate("reviews").session(session);

    const onlyOneReview = product.reviews.find((r) => r.user._id.toString() === req.user._id.toString());
    if (onlyOneReview) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send("Produkt już oceniony!");
    }

    let prc = [...product.reviews];
    prc.push({ rating: rating });
    product.reviews.push(reviewId);
    if (product.reviews.length === 1) {
      product.rating = Number(rating);
      product.reviewsNumber = 1;
    } else {
      product.reviewsNumber = product.reviews.length;
      let ratingCalc = prc.map((item) => Number(item.rating)).reduce((sum, item) => sum + item, 0) / product.reviews.length;
      product.rating = Math.round(ratingCalc);
    }

    await product.save();

    await session.commitTransaction();
    session.endSession();

    res.send('Przesłano recenzję')
  } catch (error) {
    await session.abortTransaction();
    next(error)
  }
}

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("name lastName email isAdmin").orFail();
    return res.send(user);
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();

    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    await user.save();

    res.send("Profil użytkownika został zaaktualizowany!");

  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();

    await user.remove();

    res.send("Profil użytkownika został usunięty!")
  } catch (error) {
    next(error)
  }
}

module.exports = { getUsers, registerUser, loginUser, updateProfile, userProfile, writeReview, getUser, updateUser, deleteUser }
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ObjectId = require("mongodb").ObjectId;

const userOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: ObjectId(req.user._id) });
    res.send(orders);
  } catch (error) {
    next(error)
  }
}

const userOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "-password -isAdmin -_id -__v -createdAt -updatedAt").orFail();

    res.send(order);

  } catch (error) {
    next(error)
  }
}

const createOrder = async (req, res, next) => {
  try {

    const { cartItems, orderTotal, paymentMethod } = req.body;

    if (!cartItems || !orderTotal || !paymentMethod) {
      return res.status(400).send("Wszystkie pola są wymagane!");
    }

    let ids = cartItems.map((item) => {
      return item.productID;
    })

    let qty = cartItems.map((item) => {
      return Number(item.quantity)
    })

    await Product.find({ _id: { $in: ids } }).then((products) => {
      products.forEach(function (product, index) {
        product.sales += qty[index];
        product.save();
      })
    })

    const order = new Order({
      user: ObjectId(req.user._id),
      orderTotal: orderTotal,
      cartItems: cartItems,
      paymentMethod: paymentMethod
    })

    const newOrder = await order.save();
    res.status(201).send(newOrder);

  } catch (error) {
    next(error)
  }
}

const updateOrderToPaid = async (req, res, next) => {
  try {

    const order = await Order.findById(req.params.id).orFail();
    order.isPaid = true;
    order.paidAt = Date.now();

    const updateOrder = await order.save();
    res.send(updateOrder);

  } catch (error) {
    next(error)
  }
}

const updateOrderToDelivered = async (req, res, next) => {
  try {

    const order = await Order.findById(req.params.id).orFail();
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updateOrder = await order.save();
    res.send(updateOrder);

  } catch (error) {
    next(error)
  }
}

const adminOrders = async (req, res, next) => {
  try {

    const orders = await Order.find({}).populate("user", "-password").sort({ paymentMethod: "desc" });

    res.send(orders);

  } catch (error) {
    next(error)
  }
}

const adminOrderStats = async (req, res, next) => {
  try {

    const start = new Date(req.params.date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(req.params.date);
    end.setHours(23, 59, 59, 999);

    const order = await Order.find({
      createdAt: {
        $gte: start,
        $lte: end
      }
    }).sort({ createdAt: "asc" });

    res.send(order);

  } catch (error) {
    next(error)
  }
}

module.exports = { userOrders, userOrder, createOrder, updateOrderToPaid, updateOrderToDelivered, adminOrders, adminOrderStats }
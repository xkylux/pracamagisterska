const mongoose = require("mongoose")
const User = require("./userModel")

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: User,
  },

  orderTotal: {
    itemsCount: { type: Number, require: true },
    cartSubtotal: { type: Number, require: true },
  },

  cartItems: [
    {
      name: { type: String, require: true },
      price: { type: Number, require: true },
      image: { path: { type: String, require: true } },
      quantity: { type: Number, require: true },
      count: { type: Number, require: true }
    }
  ],

  paymentMethod: {
    type: String,
    require: true,
  },

  transactionResult: {
    status: { type: String },
    createTime: { type: String },
    amount: { type: Number },
  },

  isPaid: {
    type: Boolean,
    require: true,
    default: false,
  },

  paidAt: {
    type: Date,
  },

  isDelivered: {
    type: Boolean,
    require: true,
    default: false
  },

  deliveredAt: {
    type: Date,
  }
}, {
  timestamps: true
})

const Order = mongoose.model("Order", orderSchema)
Order.watch().on("change", (data) => {
  if (data.operationType === "insert") {
    io.emit("newOrder", data.fullDocument);
  }
})
module.exports = Order
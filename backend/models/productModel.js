const mongoose = require("mongoose")

const Review = require("./reviewModel")
const imageSchema = mongoose.Schema({
  path: { type: String, require: true }
})

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  count: {
    type: Number,
    require: true,
  },

  price: {
    type: Number,
    require: true,
  },

  rating: {
    type: Number,
  },

  reviewsNumber: {
    type: Number,
  },

  sales: {
    type: Number,
    default: 0,
  },

  attributes: [
    { key: { type: String }, value: { type: String } }
  ],
  images: [imageSchema],

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Review
    }
  ]
}, {
  timestamps: true,
})

const Product = mongoose.model("Product", productSchema)

productSchema.index({ name: "text" }, { description: "text" }, { name: "TextIndex" })
productSchema.index({ "attributes.key": 1, "attributes.value": 1 })

module.exports = Product
const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
  name: { type: String, require: true, unique: true},
  description: { type: String, default: "default category desc"},
  image: { type: String, default: "/img/tablets-category.png"},
  attributes: [
    { key: { type: String }, value: [{ type: String }] }]
});

categorySchema.index({description:1})

const Category = mongoose.model("Category", categorySchema)

module.exports = Category;
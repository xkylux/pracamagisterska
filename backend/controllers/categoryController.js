const Category = require("../models/categoryModel")

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ name: "asc" }).orFail()
    res.json(categories)
  } catch (error) {
    next(error)
  }
}

const newCategory = async (req, res, next) => {
  try {
    const { category } = req.body
    if (!category) {
      res.status(400).send("Category input required")
    }
    const categoryExist = await Category.findOne({ name: category })
    if (categoryExist) {
      res.status(400).send("Category alredy exists")
    } else {
      const categoryCreated = await Category.create({
        name: category
      })
      res.status(201).send({ categoryCreated: categoryCreated })
    }
  } catch (error) {
    next(error)
  }
}

const deleteCategory = async (req, res, next) => {
  try {
    if (req.params.category !== "Wybierz kategorię") {
      const categoryExists = await Category.findOne({
        name: decodeURIComponent(req.params.category)
      }).orFail()
      await categoryExists.remove()
      res.json({ categoryDeleted: true })
    }
  } catch (err) {
    next(err)
  }
}

const saveAttribute = async (req, res, next) => {
  const { key, val, categoryChoosen } = req.body
  if (!key || !val || !categoryChoosen) {
    return res.status(400).send("All inputs are required")
  }
  try {
    const category = categoryChoosen.split("/")[0]
    const categoryExists = await Category.findOne({ name: category }).orFail()
    if (categoryExists.attributes.length > 0) {
      var keyDoesNotExistsInDatabase = true
      categoryExists.attributes.map((item, index) => {
        if (item.key === key) {
          keyDoesNotExistsInDatabase = false
          var copyAttributeValues = [...categoryExists.attributes[index].value]
          copyAttributeValues.push(val)
          var newAttributeValues = [...new Set(copyAttributeValues)]
          categoryExists.attributes[index].value = newAttributeValues
        }
      })
      if (keyDoesNotExistsInDatabase) {
        categoryExists.attributes.push({ key: key, value: [val] })
      }
    } else {
      categoryExists.attributes.push({ key: key, value: [val] })
    }
    await categoryExists.save()
    let catego = await Category.find({}).sort({ name: "asc" })
    return res.status(201).json({ categoriesUpdated: catego })
  } catch (error) {
    next(error)
  }
}

module.exports = { getCategories, newCategory, deleteCategory, saveAttribute }
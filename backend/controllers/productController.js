const { error } = require("console");
const recordsOnPage = require("../config/pagination")
const Product = require("../models/productModel")
const imgValidate = require("../settings/imgValidate")

const getProducts = async (req, res, next) => {
  try {

    let query = {};
    let queryIf = false;

    let priceQuery = {};
    if (req.query.price) {
      queryIf = true
      priceQuery = { price: { $lte: Number(req.query.price) } }
    }

    let ratingQuery = {};
    if (req.query.rating) {
      queryIf = true
      ratingQuery = { rating: { $in: req.query.rating.split(",") } }
    }

    let categoryQuery = {}
    const categoryName = req.params.categoryName || ""
    if (categoryName) {
      queryIf = true
      let a = categoryName.replace(/,/g, "/")
      var regEx = new RegExp("^" + a)
      categoryQuery = { category: regEx }
    }
    if (req.query.category) {
      queryIf = true;
      let a = req.query.category.split(",").map((item) => {
        if (item) return new RegExp("^" + item);
      });
      categoryQuery = {
        category: { $in: a },
      };
    }

    let attributesQuery = [];
    if (req.query.attributes) {
      // attrs=RAM-1TB-2TB-4TB,color-blue-red
      // [ 'RAM-1TB-4TB', 'color-blue', '' ]
      attributesQuery = req.query.attributes.split(",").reduce((acc, item) => {
        if (item) {
          let a = item.split("-");
          let values = [...a];
          values.shift(); // removes first item
          let a1 = {
            attributes: { $elemMatch: { key: a[0], value: { $in: values } } },
          };
          acc.push(a1);
          // console.dir(acc, { depth: null })
          return acc;
        } else return acc;
      }, []);
      //   console.dir(attrsQueryCondition, { depth: null });
      queryIf = true;
    }

    //paginstion
    const pageNum = Number(req.query.pageNum) || 1


    //sort by name, price etc.
    let sort = {}
    const sortOption = req.query.sort || ""
    if (sortOption) {
      let sortOpt = sortOption.split("_")
      sort = { [sortOpt[0]]: Number(sortOpt[1]) }
      console.log(sort)
    }

    const searchQuery = req.params.searchQuery || ""
    let searchQueryContact = {}
    let select = {}
    if (searchQuery) {
      queryIf = true
      searchQueryContact = { $text: { $search: searchQuery } }
      select = {
        score: { $meta: "textScore" }
      }
      sort = { score: { $meta: "textScore" } }
    }

    if (queryIf) {
      query = {
        $and: [priceQuery, ratingQuery, categoryQuery, searchQueryContact, ...attributesQuery]
      };
    }



    const totalProducts = await Product.countDocuments(query)
    const products = await Product.find(query)
      .select(select)
      .skip(recordsOnPage * (pageNum - 1))
      .sort(sort)
      .limit(recordsOnPage);

    res.json({
      products,
      pageNum,
      paginationLinksNumber: Math.ceil(totalProducts / recordsOnPage),
    });
  } catch (error) {
    next(error);
  }
};

const getProductsById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("reviews").orFail()
    res.json(product)
  } catch (error) {
    next(error)
  }
}

const getBestsellers = async (req, res, next) => {
  try {
    const products = await Product.aggregate([
      { $sort: { category: 1, sales: -1 } },
      { $group: { _id: "$category", item_with_max_sales: { $first: "$$ROOT" } } },
      { $replaceWith: "$item_with_max_sales" },
      { $match: { sales: { $gt: 0 } } },
      { $project: { _id: 1, name: 1, images: 1, category: 1, description: 1 } },
      { $limit: 3 }
    ])
    res.json(products)
  } catch (error) {
    next(error)
  }
}

const getProductsAdmin = async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ category: 1 }).select('name price category');
    return res.json(products)
  } catch (error) {
    next(error)
  }
}

const deleteProductAdmin = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail()
    await product.remove()
    res.json({ message: "Produkt usunięty" })
  } catch (error) {
    next(error)
  }
}

const createProductAdmin = async (req, res, next) => {
  try {
    const product = new Product()
    const { name, description, category, count, price, attributes } = req.body
    product.name = name
    product.description = description
    product.category = category
    product.count = count
    product.price = price
    if (attributes.length > 0) {
      attributes.map((item) => {
        product.attributes.push(item)
      })
    }
    await product.save()
    res.json({ message: "Dodano produkt", productId: product._id })
  } catch (error) {
    next(error)
  }
}

const updateProductAdmin = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail()
    const { name, description, category, count, price, attributes } = req.body
    product.name = name || product.name
    product.description = description || product.description
    product.category = category || product.category
    product.count = count || product.count
    product.price = price || product.price
    if (attributes.length > 0) {
      product.attributes = []
      attributes.map((item) => {
        product.attributes.push(item)
      })
    } else {
      product.attributes = []
    }

    await product.save()
    res.json({ message: "Zaaktualizowano produkt!" })

  } catch (error) {
    next(error)
  }
}

const uploadAdmin = async (req, res, next) => {
  if (req.query.cloudinary === "true") {
    try {
      let product = await Product.findById(req.query.productId).orFail();
      product.images.push({ path: req.body.url });
      await product.save();
    } catch (err) {
      next(err);
    }
    return
  }
  try {
    if (!req.files || !!req.files.images === false) {
      return res.status(400).send("Plik nie został przesłany!")
    }

    const imgValidateResult = imgValidate(req.files.images)
    if (imgValidateResult.error) {
      return res.status(400).send(imgValidateResult.error)
    }

    const path = require("path")
    const { v4: uuidv4 } = require("uuid")
    const pathUpload = path.resolve(__dirname, "../../frontend/", "public", "img", "products")

    let product = await Product.findById(req.query.productId).orFail()

    let imgList = []

    if (Array.isArray(req.files.images)) {
      imgList = req.files.images
    } else {
      imgList.push(req.files.images)
    }

    for (let image of imgList) {
      var fileName = uuidv4() + path.extname(image.name)
      var uPath = pathUpload + "/" + fileName
      product.images.push({ path: "/img/products/" + fileName })
      image.mv(uPath, function (error) {
        if (error) {
          return res.status(500).send(error)
        }
      })
    }

    await product.save()
    return res.send("Plik przesłany!")

  } catch (error) {
    next(error)
  }
}

const deleteImgAdmin = async (req, res, next) => {
  const imgPath = decodeURIComponent(req.params.imgPath);
  if (req.query.cloudinary === "true") {
    try {
      await Product.findOneAndUpdate({ _id: req.params.productId }, { $pull: { images: { path: imgPath } } }).orFail();
      return res.end();
    } catch (er) {
      next(er);
    }
    return
  }
  try {
    const path = require("path")
    const finalPath = path.resolve("../frontend/public") + imgPath

    const fs = require("fs")
    fs.unlink(finalPath, (error) => {
      if (error) {
        res.status(500).send(error)
      }
    })

    await Product.findOneAndUpdate(
      { _id: req.params.productId },
      { $pull: { images: { path: imgPath } } }
    ).orFail();
    return res.end()

  } catch (error) {
    next(error)
  }

}



module.exports = { getProducts, getProductsById, getBestsellers, getProductsAdmin, deleteProductAdmin, createProductAdmin, updateProductAdmin, uploadAdmin, deleteImgAdmin }
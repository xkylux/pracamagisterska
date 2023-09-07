const connectDB = require("../config/db")
connectDB()

const categoryData = require("./categorySeeder")
const productData = require("./productSeeder")
const reviewData = require("./reviewSeeder")
const userData = require("./userSeeder")
const orderData = require("./orderSeeder")

const Category = require("../models/categoryModel")
const Product = require("../models/productModel")
const Review = require("../models/reviewModel")
const User = require("../models/userModel")
const Order = require("../models/orderModel")
console.log(process.argv[2]);

const importData = async () => {
    try {
        await Category.collection.dropIndexes()
        await Product.collection.dropIndexes()
        // await Review.collection.dropIndexes()

        await Category.collection.deleteMany({})
        await Product.collection.deleteMany({})
        await Review.collection.deleteMany({})
        await User.collection.deleteMany({})
        await Order.collection.deleteMany({})

        if (process.argv[2] !== "-d") {
            await Category.insertMany(categoryData)
            const reviews = await Review.insertMany(reviewData)
            const sampleProducts = productData.map((product) => {
                reviews.map((review) => {
                    product.reviews.push(review._id)
                })
                return { ...product }
            })
            await Product.insertMany(sampleProducts)
            await User.insertMany(userData)
            await Order.insertMany(orderData)

            console.log("Seeder pomyślnie zaimportowany")
            process.exit();
            return
        }
        console.log("Seeder pomyślnie usunięty")
        process.exit();
    } catch (error) {
        console.error("Błąd przy importowaniu seedera", error)
        process.exit(1);
    }
}
importData()


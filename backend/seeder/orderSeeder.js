const ObjectId = require("mongodb").ObjectId

const orderSeeder = Array.from({length: 22}).map((_, index) => {
    let day = 20
    if(index < 10) {
        var hour = "0" + index
        var subtotal = 100
    } else if(index > 16 && index < 21) {
        var hour = index
        var subtotal = 100 + 12*index
    } else {
        var hour = index
        var subtotal = 100
    }
    return {
        user:ObjectId("646c7f17bebd7c027309a965"),
        orderTotal: {
            itemsCount: 3,
            cartSubtotal: subtotal
        },
        cartItems: [
            {
                name: "Nazwa produktu",
                price: 34,
                image: {path: "/img/tablets-category.png"},
                quantity: 3,
                count: 12
            }
        ],
        paymentMethod: "Blik",
        isPaid: false,
        isDelivered: false,
        createdAt: `2023-03-${day}T${hour}:14:58.490+00:00`
    }
})

module.exports = orderSeeder

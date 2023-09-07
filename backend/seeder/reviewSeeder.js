const ObjectId = require("mongodb").ObjectId

const ReviewSeeder = [
    {
    comment: "Moim zdaniem Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dolor tellus, imperdiet vel cursus ac, vestibulum ut dui. Sed ac convallis est, tincidunt euismod arcu.",
    rating: 2,
    user: { _id: ObjectId(), name: "Rafał Czerwiński" },
  },
  {
    comment: "Moim zdaniem Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dolor tellus, imperdiet vel cursus ac, vestibulum ut dui. Sed ac convallis est, tincidunt euismod arcu.",
    rating: 3,
    user: { _id: ObjectId(), name: "Oskar Czarnecki" },
  },
  {
    comment: "Moim zdaniem Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dolor tellus, imperdiet vel cursus ac, vestibulum ut dui. Sed ac convallis est, tincidunt euismod arcu.",
    rating: 5,
    user: { _id: ObjectId(), name: "Heronim Jasiński" },
  },
  {
    comment: "Moim zdaniem Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dolor tellus, imperdiet vel cursus ac, vestibulum ut dui. Sed ac convallis est, tincidunt euismod arcu.",
    rating: 4,
    user: { _id: ObjectId(), name: "Adrianna Zielińska" },
  },
  {
    comment: "Moim zdaniem Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dolor tellus, imperdiet vel cursus ac, vestibulum ut dui. Sed ac convallis est, tincidunt euismod arcu.",
    rating: 4,
    user: { _id: ObjectId(), name: "Ewelina Sikora" },
  },
  {
    comment: "Moim zdaniem Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dolor tellus, imperdiet vel cursus ac, vestibulum ut dui. Sed ac convallis est, tincidunt euismod arcu.",
    rating: 1,
    user: { _id: ObjectId(), name: "Cecylia Brzezińska" },
  }
]

module.exports = ReviewSeeder

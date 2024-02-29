const mongoose = require('mongoose');

mongoose
  .connect("mongodb://localhost:27017/BlogAppDB")
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log("Error: ", error));
const ProductModel = mongoose.model('fromPOST',{
    id: Number,
    name: String,
    price: Number
})

module.exports = ProductModel
const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  name: String,
  address: { type: String, required: true },
  phone: String,
  order: String,
});






const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;

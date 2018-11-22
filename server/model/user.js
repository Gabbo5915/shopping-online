var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  "userId":String,
  "userNmae":String,
  "userPwd":String,
  "orderList":Array,
  "cartList":[
    {
      "productId":String,
      "productName":String,
      "productPrice":String,
      "productImage":String,
      "productNum":String,
      "checked":String
    }
  ],
  "addressList":Array
});

module.exports = mongoose.model("User",userSchema);

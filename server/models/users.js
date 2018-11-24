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
      "productPrice":Number,
      "productImg":String,
      "productNum":Number,
      "checked":String
    }
  ],
  "addressList":[
    {
      "addressId":String,
      "userName":String,
      "streetName":String,
      "postCode":Number,
      "tel":Number,
      "isDefault":Boolean
    }
  ]
});

module.exports = mongoose.model("User",userSchema);

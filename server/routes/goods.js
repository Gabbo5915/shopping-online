var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

mongoose.connect('mongodb://127.0.0.1:27017/shopping-online',{ useNewUrlParser: true });
mongoose.connection.on("connected",function () {
  console.log("MongoDB connected success.")
});
mongoose.connection.on("error",function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected",function () {
  console.log("MongoDB connected disconnected.")
});

router.get('/', function(req, res, next) {
  let page = parseInt(req.param('page'));
  let pageSize = parseInt(req.param('pageSize'));
  let priceLevel = req.param('priceLevel');
  let sort = req.param("sort");
  let skip = (page-1)*pageSize;
  let params={};
  let priceGt='',priceLte='';
  if(priceLevel!=='all'){
    switch(priceLevel){
      case'0':priceGt=0;priceLte = 100;break;
      case'1':priceGt=100;priceLte = 500;break;
      case'2':priceGt=500;priceLte = 1000;break;
      case'3':priceGt=1000;priceLte = 2000;break;
    }
    params = {
      productPrice:{
        $gt:priceGt,
        $lte:priceLte
      }
    }
  }
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'productPrice':sort});
  goodsModel.exec(function (err,doc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message
      })
    }else{
      res.json({
        status:"0",
        msg:"",
        result:{
          count:doc.length,
          list:doc

        }
      })
    }
  })
});

router.post("/addCart",function (req,res,next) {
  let userId = "10001";
  let productId = req.body.productId;
  let Users = require('../models/users');

  Users.findOne({userId:userId},function (err,userDoc) {
    if(err){
      res.json({
        status:"400",
        msg:err.message
      })
    }else{
      if(userDoc){
        let goodsitem='';
        userDoc.cartList.forEach(function (item) {
          if(item.productId==productId){
            goodsitem=item;
            item.productNum++;
          }
        });
        if(goodsitem){
          userDoc.save(function (err2,doc2) {
            if(err2){
              res.json({
                status:"1",
                msg:err2.message
              })
            }else{
              res.json({
                status:"0",
                msg:'',
                result:'success'
              })
            }
          })
        }else {
          Goods.findOne({productId: productId}, function (err1, doc) {
            if (err1) {
              res.json({
                status: "400",
                msg: err1.message
              })
            } else {
              if (doc) {
                console.log(doc);
                let newobj = {//新创建一个对象，实现转换mongoose不能直接增加属性的坑
                  productNum: 1,
                  checked: "1",
                  productId: doc.productId,
                  producName: doc.producName,
                  productPrice: doc.productPrice,
                  productName: doc.productName,
                  productImg: doc.productImg,
                }
                userDoc.cartList.push(newobj);
                userDoc.save(function (err2, doc2) {
                  if (err2) {
                    res.json({
                      status: "400",
                      msg: err2.message
                    })
                  } else {
                    res.json({
                      status: "200",
                      msg: '',
                      result: 'success'
                    })
                  }
                })
              }
            }
          })
        }
      }
    }
  })

});

module.exports = router;

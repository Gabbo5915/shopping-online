var express = require('express');
var router = express.Router();
var User = require('./../models/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',function (req,res,next) {
  let param = {
    userName:req.body.userName,
    userPwd:req.body.userPwd
  };
  User.findOne(param,(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message
      })
    }else{
      if(doc){
        res.cookie('userId',doc.userId,{
          path:'/',
          maxAge:1000*60*60
        });
        res.json({
          status:"0",
          msg:'',
          result:{
            userName:doc.userName
          }
        })
      }
    }
  })
});
//get production list
router.get('/cartList',function (req,res,next) {
  let userId="10001";
  User.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:"0",
        msg:'',
        result:doc.cartList
      })
    }
  })
});
//delete production in Cart
router.post('/cartDel',function (req,res,next) {
  var userId="10001";
  productId = req.body.productId;
  User.update({
    userId:userId
  },{
    $pull:{
      'cartList':{
        'productId':productId
      }
    }
  },function (err,doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: "0",
        msg: '',
        result: 'success'
      })
    }
  })
});
//edit numbers of product
router.post('/cartEdit',function (req,res,next) {
  let userId="10001";
  let productId=req.body.productId;
  let productNum=req.body.productNum;
  let checked = req.body.checked;
  User.update({userId:userId,"cartList.productId":productId},{
    "cartList.$.productNum":productNum,
    "cartList.$.checked":checked
  },function (err,doc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:"0",
        msg:'',
        result:"success"
      })
    }
  })
});
//edit all select option
router.post('/editAllCheck',(req,res,next)=>{
  let userId="10001";
  let checkAll = req.body.checkAll?"1":"0";
  User.findOne({userId:userId},(err,user)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:''
      })
    }else{
      if(user){
        user.cartList.forEach((item)=>{
          item.checked = checkAll;
        })
        user.save((err1,doc)=>{
          if(err1){
            res.json({
              status:"1",
              msg:err.message,
              result:''
            })
          }else{
            res.json({
              status:"0",
              msg:'',
              result:"success"
            })
          }
        })
      }
    }
  })
});

//check the address in db
router.get('/addressList',(req,res,next)=>{
  let userId="10001";
  User.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:doc.addressList
      })
    }
  })
});
//Default address
router.post('/setDefault',(req,res,next)=>{
  let userId='10001';
  let addressId = req.body.addressId;
  if(!addressId){
    res.json({
      status:"1",
      msg:err.message,
      result:''
    })
  }else{
    User.findOne({userId:userId},(err,doc)=>{
      if(err){
        res.json({
          status:"1",
          msg:err.message,
          result:''
        })
      }else{
        let addressList = doc.addressList;
        addressList.forEach((item)=>{
          if(item.addressId == addressId){
            item.isDefault = true;
          }else{
            item.isDefault = false;
          }
        });
        doc.save((err1,doc1)=>{
          if(err1){
            res.json({
              status:"1",
              msg:err1.message,
              result:''
            })
          }else{
            res.json({
              status:'0',
              msg:'',
              result:''
            })
          }
        })
      }
    })
  }
});

//delete address
router.post('/delAddress',(req,res,next)=>{
  let userId = "10001";
  let addressId = req.body.addressId;
  User.update({
    userId:userId
  },{
    $pull:{
      'addressList':{
        'addressId':addressId
      }
    }
  },function (err,doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: "0",
        msg: '',
        result: 'success'
      })
    }
  })
});
//create new address
router.post('/addAddress',function (req,res,next) {
  let userId="10001";
  let param = {
    addressId : req.body.addressId,
    userName : req.body.userName,
    streetName : req.body.streetName,
    postCode : req.body.postCode,
    tel : req.body.tel,
    isDefault : req.body.isDefault
  };
  User.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message
      })
    }else{
      if(doc){
        doc.addressList.push(param);
        doc.save((err1,doc1)=>{
          if(err1){
            res.json({
              status:"1",
              msg:err1.message,
              result:''
            })
          }else{
            res.json({
              status:'0',
              msg:'',
              result:"add new address success"
            })
          }
        })
      }
    }
  })
});
module.exports = router;

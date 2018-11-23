# shopping-online

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# import database data
add shopping-online db in mongoDB
follow the "result" of "mock/goods.json" (for-test is to test the vue-infinite-scroll function) to add goods Collection
follow the below syntax to add users Collection:
"userId" : "10001",-----Can not change!
"userNmae" : "gabbo1",-----customer by yourself
"userPwd" : "1234",-----customer by yourself
"orderList" : [],
"cartList" : [],
"addressList" : []

# run server
node server/bin/www

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

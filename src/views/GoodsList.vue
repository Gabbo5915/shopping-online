<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a @click="sortGoods" href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceZone=='all'}" @click="priceZone='all'">All</a></dd>
                <dd v-for="(price,index) in priceFilter">
                  <a href="javascript:void(0)" v-bind:class="{'cur':priceZone==index}" @click="setPriceZone(index)" >{{price.startPrice}} - {{price.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="item in goodsList">
                    <div class="pic">
                      <a href="#"><img v-lazy="item.productImg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.productPrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">ADD TO CART</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                  onloading...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFalg" @click="closePop"></div>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
  import '@/assets/css/base.css'
  import '@/assets/css/product.css'
  import '@/assets/css/checkout.css'
  import  '@/assets/css/login.css'
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from "@/components/NavBread";
  import axios from 'axios'
    export default {
    data(){
      return{
        goodsList:[],
        sortFlag:true,
        page:1,
        pageSize:12,
        busy:true,
        priceFilter:[
          {
            startPrice:'0.00',
            endPrice:'100.00'
          },
          {
            startPrice:'100.00',
            endPrice:'500.00'
          },
          {
            startPrice:'500.00',
            endPrice:'1000.00'
          },
          {
            startPrice:'1000.00',
            endPrice:'2000.00'
          }
        ],
        priceZone:'all',
        filterBy:false,
        overLayFalg:false
      }
    },
      name: "GoodsList",
      components: {NavBread, NavFooter, NavHeader},
      mounted:function(){
        this.getGoodsList();
      },
      methods:{
        getGoodsList(flag){
          let param = {
            page:this.page,
            pageSize:this.pageSize,
            sort:this.sortFlag?1:-1,
            priceLevel:this.priceZone
          }
          axios.get("/goods",{
            params:param
          }).then((goodsdata)=>{
            var res = goodsdata.data;
            if(res.status=="0"){
              this.busy=false;
              if(flag){
                this.goodsList = this.goodsList.concat(res.result.list);
                if(res.result.count == 0){
                  this.busy = true;
                }else{
                  this.busy = false;
                }
              }else{
                this.goodsList = res.result.list;
              }
            }else{
              this.goodsList = [];
            }
          })
        },
        sortGoods(){
          this.sortFlag = !this.sortFlag;
          this.page = 1;
          this.getGoodsList();
        },
        showFilterPop(){
            this.filterBy=true;
            this.overLayFalg=true;
        },
        closePop(){
          this.filterBy=false;
          this.overLayFalg=false;
        },
        setPriceZone(index){
          this.priceZone=index;
          this.page = 1;
          this.closePop();
        },
        loadMore(){
          this.busy=true;
          setTimeout(() => {
            this.page++;
            this.getGoodsList(true);
          }, 1000);
        }
      }
    }
</script>

<style scoped>

</style>

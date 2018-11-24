<template>
  <div>
  <nav-header></nav-header>
  <nav-bread>
    <span>Success</span>
  </nav-bread>
  <div>
    <div class="container">
      <h1>Congratulation!</h1>
      <h1>Your Order Has Been Placed!</h1>
    </div>
  </div>
  <nav-footer></nav-footer>
  </div>
</template>

<script>
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from "@/components/NavBread"
    export default {
        name: "FinalPage",
      components: {NavFooter, NavBread, NavHeader}
    }
</script>

<style scoped>
  .container{
    height:50vh;
  }
  h1{
    color: red;
    text-align: center;
    margin:10vh;
  }
</style>

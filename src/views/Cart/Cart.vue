<template>
  <div class="home">

<h2>Корзина</h2>
<!-- пустая козина -->
<div v-if = "getCartLength() == 0">
  <img src="/assets/images/empty-cart.jpg" alt="empty-cart">
</div>

<!-- Полная корзина -->
  <div v-else>
    
    <el-row 
    v-for="item of getCart.items"
    :key="item.vendor"
    >
      <el-col :span="8">
        <div class="grid-content bg-purple">
        <img 
        :src="'http://127.0.0.1:8000/images/l'+  item.vendor + '.jpg'" 
        alt=""
        class="image"
        >
          {{ item.item }}
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          {{ item.price }}
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
        </div>
      </el-col>
    </el-row>
  </div>

  </div>
</template>

<script>

export default {
  methods:{
        getCartLength(){                
          return this.$store.getters.getCart.items.length
        }  
  },
  computed:{
    getCart(){
      return this.$store.getters.getCart
    }
  }
}
</script>

<style>
 .image {
    width: 100%;
    display: block;
  }
.title{
text-align: center;
font-weight: bold;
}
.font-red{
color:#cc0104;
font-weight: bold;
}
.home{
padding-left: 7px;
padding-right: 7px;
}
/* Layout */
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

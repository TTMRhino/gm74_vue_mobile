<template>
  <div class="home">

<h2>Корзина</h2>
<!-- пустая козина -->
<div v-if = "getCartLength() == 0">
  <img src="/assets/images/empty-cart.jpg" alt="empty-cart">
</div>

<!-- Полная корзина -->
<div v-else>
  <div class="cart-pad" >

    <!-- Шапка  -->
    <el-row class="head-table">

    <el-col :span="12">
      Наименование
    </el-col>

    <el-col :span="4">
      цена
    </el-col>

    <el-col :span="4">
      колл.
    </el-col>

    <el-col :span="4">
      сумма
    </el-col>

    </el-row>

 <!-- Тело   -->
    <el-row 
    v-for="(item, index) of getCart.items"
    :key="item.vendor"
    >
    <el-col :span="3">    
      <el-button 
      type="default" 
      icon="el-icon-delete" 
      circle 
      size="mini"
      @click="deleteItem(index, item.quantity, item.price)">
      </el-button>
    </el-col>

      <el-col :span="9">
        <div class="grid-content bg-purple">
        <img 
        :src="'http://127.0.0.1:8000/images/l'+  item.vendor + '.jpg'" 
        alt=""
        class="image"
        >
          {{ item.item }}
        </div>
      </el-col>

      <el-col :span="2">
        <div class="grid-content bg-purple-light">
          {{ item.price }} 
        </div>
      </el-col>

      <el-col :span="7">
      <el-button 
      type="default" 
      class="countButton" 
      style="line-height:0;"
      @click="counter(item.vendor, 1, item.price, item.item, item.id)"
      >+</el-button>

        <div class="grid-content bg-purple">        
        {{ item.quantity }} шт.
        </div>
        <el-button 
        type="default" 
        class="countButton" 
        style="line-height:0;"
        @click="counter(item.vendor, -1, item.price, item.item, item.id)"
        >-</el-button>
        
      </el-col>

      <el-col :span="3">
        <div class="grid-content bg-purple">
        {{ item.price * item.quantity }} 
        </div>
      </el-col>
    </el-row>

     <!-- Подвал  -->
  <el-row class="head-table">
  <el-col :span="24">
    Итого: <span class="total">{{ getCart.totalPrice }} </span>руб.
  </el-col>
  </el-row>
</div>
  <h2>Доставка и оплата</h2>


  <order-form>
  </order-form>
   
  

  
</div>
  
  </div>
</template>

<script>
import OrderForm from "./Components/OrderForm";
export default {
  components: {OrderForm},
  methods:{
        getCartLength(){                
          return this.$store.getters.getCart.items.length
        },
        //изменение колличества товара в корзине (колличесво посылаем либо 1 или -1)
        counter(vendor, quantity, price, item,id) {         
           this.$store.dispatch('addGoodsToCart',{
             'vendor':vendor,
             'quantity':quantity,
             'price':price,
             'item':item,
             'id':id
             });
        },
        //удаление товара из корзины
        deleteItem(index,quantity,price){
          this.$store.dispatch('deleteGoodsToCart',{'index':index,'quantity':quantity,'price':price});         
        },

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
.cart-pad{
  background-color: white;
  color:darkslategray;
  font-size: 0.9em;
  text-align: center;
}
.head-table{
  font-size: 1em;
  font-weight: bold;
}
.el-row {
  border-bottom : 1px solid rgb(209, 209, 209); /* Параметры границы */
    margin-bottom: 10px;
      
    &:last-child {
      margin-bottom: 0;
    }
   
  }
 
  .bg-purple-dark {
    
  }
  .bg-purple {
    
  }
  .bg-purple-light {
    
  }
  .grid-content {
    margin-bottom: 10px;
    min-height: 36px;
    text-align: center;
    padding-bottom: 10px;
    padding-top: 10px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .total{
    font-style: italic;
    color: orangered;
  }

  .el-button{
    width: 100%;
    height: 70px;
  }
  .countButton{
    width: 20px;
    height: 20px;  
  }
</style>

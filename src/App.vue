<template>
  <div id="app">
  <img src="/assets/images/logo.png" alt="logo" class="logo">

  <div class="header">
    <h3> <i class="el-icon-phone"></i> +7 9000-741-791</h3>
    <p>
      с 9:00 до 19:00 с ПН. по ПТ.
    Заказы на сайте принимаются 24/7
    </p>
    <router-link to="/cart">
      <div class="cart">
        <i aria-hidden="true" class="el-icon-shopping-cart-1"></i>
        <span> {{ getCart.totalQuantity }}</span>
        <span> Итого: </span>
        {{ getCart.totalPrice }}       
      </div>
    </router-link>
  </div> 

      <div id="nav">
    <!-- Nav мею -->
  <el-col :span="24"> 

    <el-menu     
      class="el-menu-demo"
      mode="horizontal"
      
      background-color="#af4d14"
      text-color="azure"
      active-text-color="azure">

      <el-submenu index="1">
        <template slot="title"><i class="el-icon-s-order"></i></template>
               
        <el-menu-item index="1-1"><router-link to="/" class="link-menu">GoodMarket74</router-link></el-menu-item>

        <el-menu-item index="1-2"><router-link to="/catalog" class="link-menu">Каталог</router-link></el-menu-item>
        <el-menu-item index="1-3"><router-link to="/about" class="link-menu">О Нас</router-link></el-menu-item>
        <el-menu-item index="1-4"><router-link to="/delivery" class="link-menu">Оплата и доставка</router-link></el-menu-item>
        <el-menu-item index="1-5"><router-link to="/contacts" class="link-menu">Конатакты</router-link></el-menu-item>       
        
      </el-submenu> 
  </el-menu>

 </el-col>
     

    </div>
   <router-view></router-view>

  </div>
  
</template>

<script>


  export default {    
    computed:{
      getCart(){
        return this.$store.getters.getCart
      }
    },
    created:function(){
     
     //Проверяем запись корзины в куках перед созаднием приложения
      let cookiCart =   this.$cookie.get('mcart'); //берем куку   

      if (typeof cookiCart === "undefined" || cookiCart==null){
        console.log('Куки нет!');
      }else{
        cookiCart = JSON.parse(cookiCart);
        console.log('Кука Есть!');
        //добавляем куку в  store(глобальное хранилище vue) 
        cookiCart.items.forEach(item => { 
           this.$store.dispatch('addGoodsToCart',{
             "vendor":item.vendor,
             "quantity":item.quantity, 
             "price":item.price,
            "item":item.item ,
           });
        });       
      }
    
  },
  }
</script>


<style scoped>
.logo {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0px;
    margin-bottom: 0px;
    display: block;
}
.header{
background-color: #202020;
margin-top: 0px;
margin-bottom: 0px;
color: azure;
text-align: center;
display: block;
}
.header h3, .header p{
margin-top: 0px;
margin-bottom: 0px;
padding-bottom: 5px;
}
.el-menu-demo i{
color: azure;
}

.el-menu-demo{
color: azure;
}
.el-menu.el-menu--horizontal{
border-bottom-width: 0px;
}

.link-menu{
  color: aliceblue;
  text-decoration:none;
}
/*   Корзина  */
.cart{
background-color: #ffffff;
height: 30px;
width: 240px;
font-size:1.3rem;
color: cornflowerblue;
border-radius: 10px;
margin: auto;
    margin-top: auto;
margin-top: 10px;
padding-bottom:5px;
}


</style>

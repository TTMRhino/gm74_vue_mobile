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

    

  <!-- NEW MENU  -->
  <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="el-icon-s-order"></i>Меню
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
  <router-link to="/" class="dropdown-item link-menu">GoodMarket74</router-link>
    <router-link to="/catalog" class="dropdown-item link-menu">Каталог</router-link>
    <router-link to="/about" class="dropdown-item link-menu">О Нас</router-link>
    <router-link to="/delivery" class="dropdown-item link-menu">Оплата и доставка</router-link>
    <router-link to="/contacts" class="dropdown-item link-menu">Конатакты</router-link>    
  </div>
</div>

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
#dropdownMenuButton,.dropdown-menu{
  width:100%;
  background-color: #af4d14 ;
}
#dropdownMenuButton{
  padding-top: 20px;
  padding-bottom: 20px ;
}
.link-menu{
   padding-top: 10px;
  padding-bottom: 10px ;
 
}
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

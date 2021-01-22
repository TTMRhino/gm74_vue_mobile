<template>
  <div id="app">
  <img src="/assets/images/logo.png" alt="logo" class="logo">

  <div class="header">
    <h3> <i class="el-icon-phone"></i> +7 9000-741-791</h3>
    <p>
      с 9:00 до 19:00 с ПН. по ПТ.
    Заказы на сайте принимаются 24/7
    </p>
  </div> 

      <div id="nav">
    <!-- Nav мею -->
  <el-col :span="24"> 

    <el-menu     
      class="el-menu-demo"
      mode="horizontal"
      
      background-color="#cc0104"
      text-color="azure"
      active-text-color="azure">

      <el-submenu index="1">
        <template slot="title"><i class="el-icon-s-order"></i></template>
        <el-menu-item index="1-1"><router-link to="/">GoodMarket74</router-link></el-menu-item>
        <el-menu-item index="1-2"><router-link to="/catalog">Каталог</router-link></el-menu-item>
        <el-menu-item index="1-3"><router-link to="/">О Нас</router-link></el-menu-item>
        <el-menu-item index="1-4"><router-link to="/">Оплата и доставка</router-link></el-menu-item>
        <el-menu-item index="1-5"><router-link to="/">Конатакты</router-link></el-menu-item>
        
        
      </el-submenu> 
  </el-menu>

 </el-col>
     

    </div>
   <router-view></router-view>
  </div>
</template>

<script>
  export default {
    
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



</style>

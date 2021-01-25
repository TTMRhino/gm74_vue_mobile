<template>
  <div class="catalog">
  <h2 class="title">Каталог</h2>
   <!-- меню товара -->
    
      <el-col :span="24">     
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#af4d14"
          text-color="#fff"
          active-text-color="#ffd04b"
           unique-opened="true"
           
          >


          <el-submenu index="1">

            <template slot="title">
              <i class="el-icon-sell"></i>              
              <span>Товар</span>
            </template>

            <el-submenu index="1-1">
             <template slot="title">Группа№1</template>
              <el-menu-item index="1-1-1"                
                @click="clickMenu($event)"
              >Под_Группа№1
              </el-menu-item>              
            </el-submenu>

            <el-submenu index="1-2">
             <template slot="title">Группа№2</template>
              <el-menu-item index="1-2-1" 
              @click="clickMenu($event)"
              >Под_Группа№1</el-menu-item>
              <el-menu-item index="1-2-2"
              @click="clickMenu($event)"
              >Под_Группа№2</el-menu-item>              
            </el-submenu>

            <el-submenu index="1-3">
             <template slot="title">Группа№3</template>
              <el-menu-item index="1-3-1"
              @click="clickMenu($event)"
              >Под_Группа№1</el-menu-item>
              <el-menu-item index="1-3-2"
              @click="clickMenu($event)"
              >Под_Группа№2</el-menu-item>
              <el-menu-item index="1-3-3"
              @click="clickMenu($event)"
              >Под_Группа№3</el-menu-item>               
            </el-submenu>

          </el-submenu>
        </el-menu>
      </el-col>


    <!-- Карточки товаров -->
      <el-row>
      <el-col  >
        <el-card :body-style="{ padding: '0px' }" class="card">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div style="padding: 14px;">
            <span>Yummy hamburger</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">Operating</el-button>
            </div>
          </div>
        </el-card>



        <el-card :body-style="{ padding: '0px' }" class="card">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div style="padding: 14px;">
            <span>Yummy hamburger</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">Operating</el-button>
            </div>
          </div>
        </el-card>



      </el-col>
    </el-row>
   
</div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date()
    };
  }
}
</script>

<style scoped>

.el-icon-sell{
color:azure;
}
.title{
margin-bottom: 1px;
text-align: center;
}
/*картрочки товара*/
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .card{
  margin: 5px;
  }
</style>



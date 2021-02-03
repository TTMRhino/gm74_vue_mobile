<template>
  <div class="catalog">
  <h2 class="title">Каталог</h2>
   <!-- меню товара -->
    <el-row>
      <el-col :span="24">     
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"          
          text-color="#fff"
          active-text-color="#ffd04b"
           :unique-opened="true"
           
          >

<!--background-color="#af4d14"-->
          <el-submenu index="999">

            <template slot="title">
              <i class="el-icon-sell"></i>              
              <span>Группы товаров</span>
            </template>

            <el-submenu :index="'' + mainGroup.id" 
             v-for="mainGroup of mainGroups" :key="mainGroup.id"
             
             >
             <template slot="title" >{{ mainGroup.title }}</template>

              <el-menu-item :index=" '1-'+subGroup.id"
              v-for="subGroup of mainGroup['subgroup']" :key="subGroup.id"                  
                @click="clickMenu(subGroup.id)"
              >
              {{ subGroup.title }}
              </el-menu-item>              
            </el-submenu>
            

          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>

    <!-- Карточки товаров -->
      <el-row>
      <el-col  >

        <el-card 
        :body-style="{ padding: '0px' }" 
        class="card"
        v-for="item of items" :key="item.id"
        >
          <img :src="'https://127.0.0.1:8000/images/l'+ item.vendor +'.jpg'" class="image">
          <div style="padding: 14px;">
            <span>{{ item.item }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.description }}</time>
              <h3>{{item.price}} руб.</h3>
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
      currentDate: new Date(),      
      mainGroups:[],
      items:[],     
    };    
  },
  methods:{
      //реализация загрузки меню через API
     getMainGroups(){
      this.$http.get('https://127.0.0.1:8000/api/main_groups',{headers: {'accept': 'application/json' }})
      .then(response => {
        return response.json()
        })
        .then(mainGroups => {          
          this.mainGroups = mainGroups                         
            });           
      },
      clickMenu(id){
        console.log(id);
      },
      getItems(){
        this.$http.get('https://127.0.0.1:8000/api/items', {headers: {'accept': 'application/json' }})
        .then(response =>{
          return response.json()
        })
        .then(items =>{
          this.items = items
        });
      }       
      },     
 
  mounted: function (){  //закачиваем групы и под группы из апи при старте компонента  
        this.getMainGroups(); 
        this.getItems();     
        
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
   .el-menu{
    background-color:royalblue;
  }
  
  .el-submenu{
   background-color:#af4d14;
  }
  .el-menu-item{
    background-color:#9b4412;
  }
  .el-menu-item:focus{
  background-color:#7c370e;
  }
 
  
</style>



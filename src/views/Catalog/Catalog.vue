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
             v-for="mainGroup of getGroups" 
             :key="mainGroup.id"             
             >
             <template slot="title" >{{ mainGroup.title }}</template>

              <el-menu-item 
              :index=" '1-'+subGroup.id"
              v-for="subGroup of mainGroup['subgroup']" 
              :key="subGroup.id"                  
                @click="getPic('/api/items.jsonld?page=1','&subgroup='+subGroup.id)"
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
        v-for="item of getItems" 
        :key="item.id"
        >
          <img :src="'https://whamster.ru/images/l'+ item.vendor +'.jpg'" class="image">
          <div style="padding: 14px;">
            <span>{{ item.item }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.description }}</time>
              <h3>{{item.price}} руб.</h3>
              <el-button type="text" class="button">Operating</el-button>
            </div>
          </div>
        </el-card>

        <!-- кнопки навигации по карточкам товара -->
        <el-button-group>

          <el-button 
          type="primary" 
          icon="el-icon-d-arrow-left"
          @click="getPic(getFirstPage,getCurrentGroup)"
          >
          </el-button>

          <el-button 
          type="primary" 
          icon="el-icon-arrow-left"
          @click="getPic(getPreviousPage,getCurrentGroup)"
          >            
          </el-button>

          <el-button 
          type="primary" 
          icon="el-icon-arrow-right"
           @click="getPic(getNextPage,getCurrentGroup)"
          >            
          </el-button>

          <el-button 
          type="primary" 
          icon="el-icon-d-arrow-right"
          @click="getPic(getLastPage,getCurrentGroup)"
          >
          </el-button>

        </el-button-group>

      </el-col>
    </el-row>
   
</div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),               
    };    
  },
  methods:{
    //получаем items делая API запрос к сайту  (получаем новые данные)
    getPic(apiPage='/api/items.jsonld?page=1',apiGroup=''){    
       this.$store.dispatch('asyncGetItems',{ "apiPage":apiPage,"apiGroup":apiGroup })    
    }
    
      }, 
      computed:{
      getGroups(){
        return this.$store.getters.computedGroups
      },
      //получаем items из общего хранилища (получаем уже загруженные данные)
      getItems(){              
         return  this.$store.getters.computedItems["hydra:member"];
      },
      getNextPage(){
        return this.$store.getters.getNextPage
      },
      getPreviousPage(){
        return this.$store.getters.getPreviousPage
      },
      getLastPage(){
        return this.$store.getters.getLastPage
      },
      getFirstPage(){
        return this.$store.getters.getFirstPage
      },
      getCurrentGroup(){
        return this.$store.getters.getCurrentGroup
      }
    }, 
    mounted(){
      
        this.$store.dispatch('asyncGetGroups');
        this.$store.dispatch('asyncGetItems',{});
      
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



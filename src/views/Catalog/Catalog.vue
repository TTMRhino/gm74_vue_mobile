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

       <!-- кнопки управления страницвми (перелистования) -->
      <page-control>
      </page-control>

        <!-- Карточка товара -->
        <items-cards >
        </items-cards>

    <!-- кнопки управления страницвми (перелистования) -->
      <page-control>
      </page-control>

      <div class="scrollup">
      <!-- Иконка fa-chevron-up (Font Awesome) -->
        <i class="el-icon-top "></i>

      </div>
      
   
</div>
</template>

<script>

import PageControl from "./Components/PageControl";
import ItemsCards from "./Components/ItemsCards";


export default {
  components: {PageControl,ItemsCards},
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
      
     
    }, 
    mounted(){      
        this.$store.dispatch('asyncGetGroups');      
      
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
  
  .el-submenu{
   background-color:#af4d14;
  }
  .el-menu-item{
    background-color:#9b4412;
  }
  .el-menu-item:focus{
  background-color:#7c370e;
  }
 
 /*кнопка вверх*/
div.scrollup {
  position: fixed; /* фиксированная позиция */
  color: #fff; /* цвет текста */
  background-color: #286090; /* цвет заднего фона */
  right: 20px; /* расстояние от правого края */
  bottom: 0px; /* расстояние от нижнего края */
  padding: 4px 10px; /* отступы до содержимого блока */
  font-size: 20px; /* размер шрифта (иконки) */
  border-top-left-radius: 4px; /* скругление верхнего левого угла */
  border-top-right-radius: 4px; /* скругление верхнего правого угла */
  cursor: pointer; /* форма курсора */
  display: none; /* не отображать элемент */
  text-align: center; /*выравнивание содержимого элемента по центру */
  z-index: 999;
}
div.scrollup:hover {
  background-color: #000; /* цвет заднего фона при наведении */
}
  
</style>



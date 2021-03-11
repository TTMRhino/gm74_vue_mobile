<template>
  <div class="catalog">
  <h2 class="title">Каталог</h2>
   <!-- меню товара -->

<div class="accordion" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link "  type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          <span>Группы товаров</span>
        </button>
      </h5>
    </div>

    <div id="collapseOne" class="collapse " aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">        

            <!-- Подменю -->
            <div class="accordion" id="accordionMain">   
              <div
                v-for="mainGroup of getGroups" 
                  :key="mainGroup.id"
                >

                <div class="card-header" :id="'heading' + mainGroup.id"  >
                  <h5 class="mb-0">
                 
                    <a class="btn " 
                    href="#"
                    data-toggle="collapse" 
                    :data-target="'#collapse' + mainGroup.id"                                       
                    >
                      {{ mainGroup.title }}
                    </a>
                  </h5>
                </div>

                <div 
                  :id="'collapse' + mainGroup.id"
                  class="collapse"                  
                  data-parent="#accordionMain"
                  aria-labelledby="headingOne"                  
                  >
                  <div class="card-body"
                  v-for="subGroup of mainGroup['subgroup']" 
                  :key="subGroup.id"
                  >
                    <a href="#" 
                      class="btn subGroup-title"
                      data-parent="#accordionMain"
                      @click="getPic('/api/items.jsonld?page=1','&subgroup='+subGroup.id)"
                      >
                        {{ subGroup.title }} 
                      </a>
                  </div>
                </div>
              </div> 
            </div>
      </div>
    </div>
  </div>  
</div>
    
       <!-- кнопки управления страницвми (перелистования) -->
      <page-control>
      </page-control>

        <!-- Карточка товара -->
        <items-cards 
         v-loading.fullscreen.lock="$store.getters.getStatusLoading"
        
        >
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
      fullscreenLoading:this.$store.getters.getStatusLoading ,
      //loading:this.$store.getters.getStatusLoading
                     
    };    
  },
  methods:{
    
    //получаем items делая API запрос к сайту  (получаем новые данные и группы )
    getPic(apiPage='/api/items.jsonld?page=1',apiGroup=''){    
       this.$store.dispatch('asyncGetItems',{ "apiPage":apiPage,"apiGroup":apiGroup }) 
       console.log("Close!"); 
       
       let el = document.getElementById('collapseOne');
       el.classList.remove("show");
      
    }
    
      }, 
      computed:{
      getGroups(){
        return this.$store.getters.computedGroups
      },
      
     
    }, 
    mounted(){ 
     /* let loading = this.$loading({
          lock: true,
          text: 'Загрузка',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          
        });
      this.$store.getters.getStatusLoading ?   '' : loading.close() ;     */ 
        console.log('fullscreenLoading = '+this.fullscreenLoading);
        this.$store.dispatch('asyncGetGroups'); 
            
      
    },
    updated() { 
      console.log('Обновили!')  
      console.log('fullscreenLoading = '+this.fullscreenLoading);  
    }, 
 
}

</script>

<style scoped>
.card-header{
  background-color: #af4d14;
  
}
.btn{
  width: 100%;
}
.btn-link,.btn{
color:#fff;
}
.card-body{
  padding: 0;
 background-color: #9b4412;
}
.subGroup-title{
  
  padding-top: 10px;
  padding-bottom: 10px;


}

.el-icon-sell{
color:black;
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



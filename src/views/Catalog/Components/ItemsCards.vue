<template>
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


        <el-row>
          <counter-item>
          </counter-item>          
        </el-row>

        <el-button type="primary">Заказать</el-button>

        </el-card>

      

      </el-col>
    </el-row>
</template>

<script>

import CounterItem from "./CounterItem";

export default {
    name:"ItemsCards",
    components: {CounterItem},
    methods:{
        //получаем items делая API запрос к сайту  (получаем новые данные)
        getPic(apiPage='/api/items.jsonld?page=1',apiGroup=''){    
        this.$store.dispatch('asyncGetItems',{ "apiPage":apiPage,"apiGroup":apiGroup })    
        } 
    },
     computed:{
         //получаем items из общего хранилища (получаем уже загруженные данные)
      getItems(){              
         return  this.$store.getters.computedItems["hydra:member"];
      },    
    },
    mounted(){
        this.$store.dispatch('asyncGetItems',{});
    }
}
</script>
<style scoped>
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
  /*кнопка заказать*/
  .el-button{
    width: 100%;
    height: 60px;
  }
</style>
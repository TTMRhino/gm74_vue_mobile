<template>
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
</template>

<script>
export default {
    name:"PageControl",
    computed:{
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

    methods:{
        //получаем items делая API запрос к сайту  (получаем новые данные)
        getPic(apiPage='/api/items.jsonld?page=1',apiGroup=''){    
            this.$store.dispatch('asyncGetItems',{ "apiPage":apiPage,"apiGroup":apiGroup })    
        },
        
    },
}
</script>

<style scoped>
 .el-menu{
    background-color:royalblue;
  }
  .el-button--primary{
    width: 80px;   
  }
</style>
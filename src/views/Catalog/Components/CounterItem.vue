<template>
    <el-row>
        <el-input-number 
        v-model="num" 
        @change="handleChange" 
        :min="1" 
        size="large"
        >
        </el-input-number>
    </el-row>
    
</template>
<script>
export default {
    name:"CounterItem",
    data() {
    return {
      num: 1             
    };    
  },
  methods: {
      handleChange() {        
        
        this.$emit('quantityChange',this.num)
      },

      getNum(){
        return this.num
      }
    },

}
</script>

<style scoped>
.el-input-number{
    width: 100%;    
}
.el-input-number__decrease, .el-input-number__increase {
    width: 100%;
}

</style>
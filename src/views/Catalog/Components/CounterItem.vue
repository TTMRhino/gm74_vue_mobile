<template>
    <el-row>
        <el-input-number 
        v-model="num" 
        @change="handleChange" 
        :min="0" 
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
      num: 0             
    };    
  },
  methods: {
      handleChange(value) {
        console.log(value)
      }
    }
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
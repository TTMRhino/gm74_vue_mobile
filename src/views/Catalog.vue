<template>
  <div class="catalog">

   <!-- меню товара -->
    
      <el-col :span="24">     
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
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

  <h1>Catalog</h1>
   
  </div>
</template>

<script>
export default{
  
 
}
</script>

<style scoped>

.el-icon-sell{
color:azure;
}

</style>



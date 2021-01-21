<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    
      <el-col :span="24">     
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
           unique-opened='true'
           
          >


          <el-submenu index="1">

            <template slot="title">
              <i class="el-icon-location"></i>
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


    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
  
    methods: {
     
      clickMenu(subgroup){
        //console.log(subgroup.$el.innerText + " "+ index);
        console.log(subgroup.$el);       
       
      }
    }
  }
</script>

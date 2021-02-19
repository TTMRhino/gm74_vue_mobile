<template>
<div class="cart-pad" >

    <el-form 
    :model="ruleForm" 
    :rules="rules" 
    ref="ruleForm" 
    label-width="120px" 
    class="demo-ruleForm"
    label-position="top"
    >

        <!-- ФИО -->
        <el-form-item label="ФИО" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <!-- Телефон -->
        <el-form-item 
        label="Телефон"               
        >
            <el-input 
            v-model="ruleForm.phone"            
            ></el-input>
        </el-form-item>

        <!-- Индекс -->
        <el-form-item 
        label="Индекс"         
        >
            <el-input 
            v-model="ruleForm.mailIndex"
            ></el-input>
        </el-form-item>

        <!-- Город -->

        <el-form-item label="Город" prop="region">
        <el-select v-model="ruleForm.city" placeholder="Город">
        <el-option label="Челябинск" value="Челябинск"></el-option>
        <el-option label="Другой город" value="Другой город"></el-option>
        </el-select>
    </el-form-item>

    <!-- Адрес -->
        <el-form-item label="Адрес" prop="adress">
            <el-input v-model="ruleForm.adress"></el-input>
        </el-form-item>

        <!-- Коментарий  -->
        <el-form-item label="Коментарий" prop="coment" >
            <el-input type="textarea" class="areaText"  v-model="ruleForm.coment"></el-input>
        </el-form-item>


        <el-form-item size="large">
            <el-button type="warning" @click="onSubmit('ruleForm')">Офрмить заказ</el-button>           
        </el-form-item>



    </el-form>
</div>
</template>

<script>
import Vue from 'vue'

export default {
    name:"OrderForm",
    data() {
    return {
      ruleForm: {
          name: '',
          phone:'',
          mailIndex:'',
          city:'',
          adress:'',
          coment:'',
      },
       rules: {
          name: [
            { required: true, message: 'Ввдите ФИО', trigger: 'blur' },
            { min: 3, max: 40, message: 'Динна должна быть от 3 до 40!', trigger: 'blur' }
          ],
          phone:[
              { required: true, message: 'Введите телефон', trigger: 'blur' },
              { min: 3, max: 20, message: 'Динна должна быть от 3 до 20!', trigger: 'blur' }             
          ],
      mailIndex:[              
              { min: 0, max: 20, message: 'Динна должна быть до 20!', trigger: 'blur' }                            
      ],
      city:[
          { required: true,  trigger: 'blur' }
      ],
      adress:[
            { required: true, message: 'Ввдите Адрес', trigger: 'blur' },
            { min: 5, max: 40, message: 'Динна должна быть от 5 до 40!', trigger: 'blur' }
      ],
      coment:[
            { trigger: 'blur' },
            {  max: 190, message: 'Коментарий дожен быть до 150 символов!', trigger: 'blur' }
      ]
       }
    }
  },
  methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           
            this.$http.post('http://127.0.0.1:8000/api/customers',  {              

                name:this.ruleForm.name,
                phone:this.ruleForm.phone,
                mailindex:this.ruleForm.mailIndex,
                city:this.ruleForm.city,
                comments:this.ruleForm.coment,
                data:new Date(),
                status:"New",
                adress:this.ruleForm.adress
                }, {headers: { 'accept': 'application/json' }}).then(response => {
                    

                const items = this.$store.getters.getCart.items;
                console.log(items)
                        items.forEach(function(item){                           
                            Vue.http.post('http://127.0.0.1:8000/api/orders',{
                            item:"/api/items/" + item.id,
                            quantity:item.quantity,
                            customers:"/api/customers/"+ response.body.id
                        })
                    })
                    
                })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
}
</script>

<style scoped>
.cart-pad{
  background-color: white;
  color:darkslategray;
  font-size: 0.9em;
  
}

.areaText > textarea{
    line-height:5.5;
    height: 200px;
    min-height:100px
}
.el-form-item{
    padding: 0px;
    margin:0px;
}
.el-form-item__label{
    padding: 0px;
    margin:0px;
}
.label{
    margin-bottom: 0px;
}
</style>
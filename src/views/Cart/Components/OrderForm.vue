<template>
<div class="cart-pad" >
    <form @submit.prevent="onSubmit">
         <!-- ФИО -->
        
        <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
            <label class="form__label">ФИО</label>
            <input class="form__input" v-model.trim.lazy="$v.name.$model"/>
        </div>
        <div class="error" v-if="(!$v.name.required) &&  ($v.name.dirty)">Field is required</div>
        <div class="error" v-if="!$v.name.minLength">Динна ФИО должна быть больше {{$v.name.$params.minLength.min}} символов.</div>
        <div class="error" v-if="!$v.name.maxLength">Динна ФИО должна быть меньше {{$v.name.$params.maxLength.max}} символов.</div>

        <!-- Телефон -->
        <div class="form-group" :class="{ 'form-group--error': $v.phone.$error }">
            <label class="form__label">Телефон</label>
            <input class="form__input" v-model.trim.lazy="$v.phone.$model"/>
        </div>
        <div class="error" v-if="(!$v.phone.required) &&  ($v.phone.dirty)">Field is required</div>
        <div class="error" v-if="!$v.phone.minLength">Динна телефона должна быть больше {{$v.phone.$params.minLength.min}} цифр.</div>
        <div class="error" v-if="!$v.phone.numeric">Не корректный телефон.</div>
               
       <!-- Индекс-->
        <div class="form-group" :class="{ 'form-group--error': $v.mailindex.$error }">
            <label class="form__label">Индекс</label>
            <input class="form__input" v-model.trim.lazy="$v.mailindex.$model"/>
        </div>      
        <div class="error" v-if="!$v.mailindex.maxLength">Динна индекса не должна превышать {{$v.mailindex.$params.maxLength.max}} символов.</div>

       
      <!-- Город -->
      <div class="form-group" :class="{ 'form-group--error': $v.city.$error }">
        <label class="form__label">Город</label>

        <select class="form__input" v-model.trim.lazy="$v.city.$model" required>
                <option selected value="Челябинск" >Челябинск</option>
                <option value="Другой город">Другой город</option>
        </select>       
      </div>
      
      <!-- Адрес-->
        <div class="form-group" :class="{ 'form-group--error': $v.adress.$error }">
            <label class="form__label">Адрес</label>
            <input class="form__input" v-model.trim.lazy="$v.adress.$model"/>
        </div>
        <div class="error" v-if="!$v.adress.minLength">Динна  должна быть больше {{$v.adress.$params.minLength.min}} символов.</div>      
        <div class="error" v-if="!$v.adress.maxLength">Динна не должна превышать {{$v.adress.$params.maxLength.max}} символов.</div>

    <!-- Коментарии -->
        <div class="form-group" :class="{ 'form-group--error': $v.comments.$error }">
            <label class="form__label">Коментарий</label>
            <textarea class="form__input" v-model.trim.lazy="$v.comments.$model">
            </textarea>
        </div>              
        <div class="error" v-if="!$v.comments.maxLength">Динна не должна превышать {{$v.comments.$params.maxLength.max}} символов.</div>

    <!-- SUBMIT-->
    <button class="submit" type="submit" :disabled="submitStatus === 'PENDING'">Оформить</button>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>

  </form>
</div>
</template>

<script>
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import { required, minLength, maxLength, numeric } from 'vuelidate/lib/validators';

export default {
    
    data() {
    return {
         name: '', 
         phone:'',
         mailindex:'',
         city:'',
         adress:'',
         comments:'',
         submitStatus: null,     
    }
  },
   validations:{
          name:{
              required,
              minLength:minLength(3),
              maxLength:maxLength(45),
          },
          phone:{
              required,
              minLength:minLength(4),              
              numeric,
          },
           mailindex:{                              
               maxLength:maxLength(20),
           },
           city:{},
           adress:{
               required,
               minLength:minLength(5),
               maxLength:maxLength(30),
           },
           comments:{
               maxLength:maxLength(200),
           },
      },
  methods: {
     

      onSubmit() {
        this.$v.$touch()
        if (this.$v.$invalid) {
            this.submitStatus = 'ERROR'
        } else {
           
            this.$http.post('http://127.0.0.1:8000/api/customers',  {              

                name:this.name,
                phone:this.phone,
                mailindex:this.mailindex,
                city:this.city,
                comments:this.comments,
                data:new Date(),
                status:"New",
                adress:this.adress
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
                    
                }).then(() => {
                    //после отправки информации на сервер удаляем куки
                    VueCookie.delete('mcart');
                    this.$store.dispatch('clearCart');
                    this.$router.push('/successful');
                }
                )       
        }
      }
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
.form-group--error{
    position: relative;    
    color:crimson;
    margin:0;
    padding: 0;
}

/*input html*/
label{
display: block;
margin-bottom: 0px;
}
.form__input{
width: 100%;
padding:10px 1px 10px 1px;
border-radius: 4%;
}
.error{
color:crimson;
}
.cart-pad{
padding: 20px 0 30px 0;
}
select{
width:100% ;
padding:10px 1px 10px 1px;
}
textarea{
height: 100px;
}
.submit{
background-color: #e6a23c;
width: 100%;
padding:15px 1px 15px 1px;
font-size: large;

}
</style>
<template>
    <div class="order">
        <div class="msg">
            <h2>Спасибо!</h2>
            <h2>Ваш заказ принят!</h2>
            <p><i class="el-icon-check v"></i></p>
        </div>
    </div>
</template>

<script>


export default {
    
    data() {
    return {
          
    }
  },
}
</script>

<style scoped>
.order{
position:relative;
width: 100%;
margin:100px auto;
background-color:rgb(247, 247, 247);

border: 2px solid rgb(75, 170, 62);
}
.msg{
text-align: center;
color:slategray;
}
.v{
color:mediumspringgreen;
font-size:large;
font-weight: bolder;
}

</style>
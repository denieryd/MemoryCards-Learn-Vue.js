<template>
  <div id="app">
    <div class="saidbar-controls">
      <router-link :to="{name: 'Auth', params: {modePage: 'login'}}" class="btn btn-outline-primary" tag="button" >
        Войти
      </router-link>
      <router-link :to="{name: 'Auth', params: {modePage: 'Registered'}}" class="btn btn-outline-primary" tag="button" >
        Зарегистрироваться
      </router-link>
      <router-link :to="{name: 'Content'}" class="btn btn-outline-primary" tag="button" >
        Карточки
      </router-link>
    </div>
    <router-view class="content-cards">

    </router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>


<style>

  #app {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: 1fr;

    height: 100vh;
  }


  .saidbar-controls {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: center;

    background: wheat;
  }


  .content-cards {
    background: darkgray;
  }

  .btn {
    margin: 15px;
  }



</style>

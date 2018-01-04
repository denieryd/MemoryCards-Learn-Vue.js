<template>
  <div id="app">

    <div class="saidbar-controls">

      <router-link :to="{name: 'Auth', params: {modePage: 'Sign'}}" class="btn btn-outline-primary btn-router" tag="button" >
        <i class="fa fa-sign-in" aria-hidden="true"></i>
        <span class="text-router">Войти</span>
      </router-link>

      <router-link :to="{name: 'Auth', params: {modePage: 'Registration'}}" class="btn btn-outline-primary btn-router" tag="button" >
        <i class="fa fa-user-plus" aria-hidden="true"></i>
        <span class="text-router">Зарегистрироваться</span>
      </router-link>

      <router-link :to="{name: 'Content'}" class="btn btn-outline-success btn-router" tag="button" >
        <i class="fa fa-home" aria-hidden="true"></i>
        <span class="text-router">Главная</span>
      </router-link>

      <!--<form class="form-inline">-->
      <!--<label class="my-1 mr-2 text-blue" for="inlineFormCustomSelectPref">Выбрать теги</label>-->
      <!--<select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">-->
      <!--<option value="1">One</option>-->
      <!--<option value="2">Two</option>-->
      <!--<option value="3">Three</option>-->
      <!--</select>-->

      <!--<button type="submit" class="btn btn-primary my-1 btn-tags">Показать</button>-->
      <!--</form>-->

      <div class="profile">
        <div class="profile-avatar">
          <img src="https://www.appointbetterboards.co.nz/Custom/Appoint/img/avatar-large.png"  alt="avatar" class="avatar">
        </div>
        <div class="profile-info">
          <hr class="profile-hr">
          <span class="info-text">Ваш ник: <span class="text-green"> {{$store.state.userData.headerEmail.replace('@mail.ru', '') }}</span></span>
          <span class="info-text">Всего карточек: <span class="text-green"> {{ $store.state.userData.countCards }}</span></span>
          <form>
            <div class="form-group">
              <label for="exampleFormControlFile1">Example file input</label>
              <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="setAvatar" accept="image/*">
            </div>
          </form>
        </div>
      </div>

    </div>
    <router-view class="content">

    </router-view>
  </div>
</template>

<script>


  export default {
    name: 'app',
    data() {
      return {
      }
    },

    watch: {
      '$store.state.userData.loginSuccess': function () {
        if (this.$store.state.userData.loginSuccess) {
          console.log('33.L');
          document.querySelector('.avatar').src = localStorage.AVATAR;
        }
      }
    },

    methods: {
      setAvatar(e) {
        const fileImg = e.target.files[0];
        const img = URL.createObjectURL(fileImg);
        document.querySelector('.avatar').src = img;
        localStorage.AVATAR = img;
      }
    }
  }
</script>


<style>


  .fa {
    margin-right: 20px;
    font-size: 20px;
  }

  .text-router {
    font-size: 20px;
  }

  .btn-router {
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 15px;
  }

  .text-green {
    color: green;
  }



  #app {
    display: grid;
    grid-template-columns: 0.9fr 4fr;
    grid-template-rows: 1fr;

    height: 100vh;

    font-weight: 600;
  }


  .saidbar-controls {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: center;

    background: #485563;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #29323c, #485563);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #29323c, #485563); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


  }

  .form-inline {
    margin: auto 15px;
  }

  .btn-tags {
    margin-top: 5px;
  }

  .content {
    overflow-y:scroll;

    background: #2C3E50;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #4CA1AF, #2C3E50);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #4CA1AF, #2C3E50); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }

  .profile {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;


    margin: auto 15px;
    padding: 5px;

    border: 2px solid crimson;
    border-radius: 2%;
    background: #757F9A;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #D7DDE8, #757F9A);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #D7DDE8, #757F9A); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }

  .profile-avatar {
    width: 130px;
    height: 130px;
    margin: auto;
    margin-top: 5px;
    margin-bottom: 25px;

    border-radius: 50%;
    border: 2px solid green;
  }

  .avatar {
    width: 125px;
    height: 125px;

    border-radius: 50%;
  }

  .profile-info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: center;

    margin: auto 15px;
  }

  .profile-hr {
    width: 100%;
    height: 1px;
  }

  .info-text {
    font-weight: 700;
  }





</style>

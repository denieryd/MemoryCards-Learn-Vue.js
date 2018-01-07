<template>
  <div id="app">

    <div class="saidbar-controls">
      <i v-if="$route.name === 'Content'" @click="toggleMoveBar" class="fa fa-arrow-circle-up toggle-bar" aria-hidden="true"></i>

      <router-link :to="{name: 'Auth', params: {modePage: 'Sign'}}" v-if="!$store.state.userData.LoginSuccess" class="btn btn-outline-success btn-router animated zoomInRight" tag="button" >
        <i class="fa fa-sign-in" aria-hidden="true"></i>
        <span class="text-router">Войти</span>
      </router-link>

      <router-link :to="{name: 'Auth', params: {modePage: 'Registration'}}" v-if="!$store.state.userData.LoginSuccess" class="btn btn-outline-success btn-router animated zoomInRight" tag="button" >
        <i class="fa fa-user-plus" aria-hidden="true"></i>
        <span class="text-router">Зарегистрироваться</span>
      </router-link>

      <button v-if="$store.state.userData.LoginSuccess" @click="logOut" class="btn btn-outline-success btn-router animated zoomInRight">
        <i class="fa fa-sign-out" aria-hidden="true"></i>
        <span class="text-router">Выйти</span>
      </button>

      <router-link :to="{name: 'Content'}" v-if="!$store.state.userData.LoginSuccess" class="btn btn-outline-success btn-router animated zoomInRight" tag="button" >
        <i class="fa fa-home" aria-hidden="true"></i>
        <span class="text-router">Главная</span>
      </router-link>

      <form class="form-inline box-choos-tag" v-if="$store.state.userData.LoginSuccess">
        <select class="custom-select" id="inlineFormCustomSelectPref">
          <option selected disabled>Выбрать категорию</option>
          <option v-for="tag of cardTags"> {{ tag}} </option>
        </select>

        <button type="submit" class="btn btn-primary my-1 btn-tags">Показать</button>
      </form>

      <div class="profile animated zoomInDown">
        <div class="profile-avatar">
          <img :src=this.$store.state.userData.Avatar  alt="avatar" class="avatar">
        </div>
        <div class="profile-info">
          <hr class="profile-hr">

          <span class="info-text">Ваш ник: <span class="text-green"> {{ this.$store.state.userData.Name }}</span></span>
          <span class="info-text">Всего карточек: <span class="text-green"> {{ this.$store.state.userData.CountCards }}</span></span>

          <hr class="profile-hr">
          <form class="mt-1">
            <div class="form-group">
              <label for="exampleFormControlFile1">Выбрать аватар</label>
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

  import * as firebase from 'firebase'

  export default {
    name: 'app',
    data() {
      return {
        barMoved: false,
        loginSucces: false,
        cardTags: ['Обычная']
      }
    },

    created() {
      if (localStorage.getItem('USERDATA') !== null && localStorage.getItem('USERDATA') !== undefined) {
        this.$store.commit('setUserData', JSON.parse(localStorage.getItem('USERDATA')));
      }
    },
    watch: {
      '$store.state.userData.LoginSuccess': function () {
        this.loginSucces = this.$store.state.userData.LoginSuccess;
      }
    },

    methods: {

      logOut() {
        const defSettUser = {
          headerEmail: 'Anonim@mail.ru',
          Name: 'Anonim',
          LoginSuccess: false,
          UidUser: false,
          CountCards: 0,
          Avatar: 'https://www.appointbetterboards.co.nz/Custom/Appoint/img/avatar-large.png'
        };

        this.$store.commit('setUserData', defSettUser);
        localStorage.removeItem('USERDATA');
      },

      toggleMoveBar(e) {
        document.querySelector('.saidbar-controls').classList.toggle('saidbar-move');
        e.target.classList.toggle('toggle-bar-anim');
      },

      setAvatar (e) {
        const fileImg = e.target.files[0];
        const reader  = new FileReader();
        const _this = this;

        reader.onloadend = function () {
          _this.$store.commit('setAvatar', reader.result);
          firebase.database().ref().child(`/${_this.$store.state.userData.UidUser}/SettingsUser`)
            .update({ Avatar: reader.result});
        };

        reader.readAsDataURL(fileImg);
      },

    }
  }
</script>


<style>

  html {
    overflow: hidden;
    font-size: 10px;
  }

  .fa {
    margin-right: 20px;
    font-size: 2rem;
  }

  .text-router {
    font-size: 2rem;
  }

  .btn-router {
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 250px;
    margin: 15px;
  }

  .text-green {
    color: green;
  }


  #app {
    display: grid;
    grid-template-columns: 1fr 150fr;
    grid-template-rows: 1fr;
    height: 100vh;
    font-weight: 600;
  }


  .saidbar-controls {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: center;

    background: #485563;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #29323c, #485563);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #29323c, #485563); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    transition: 0.5s linear;
  }

  .saidbar-move {
    margin-left: -280px;
  }

  .toggle-bar-anim {
    transform: rotate(180deg);
  }

  .toggle-bar {
    cursor: pointer;
    position: absolute;
    top: 2%;
    right: -12.5%;
    margin-right: 0;
    font-size: 4rem;
    color: white;

    transition: 0.5s linear;
  }

  .form-inline {
    font-size: 2rem;
  }

  .form-inline button {
    margin: 15px;
    margin-top: 20px;
    font-size: 2rem;
  }

  .custom-select {
    margin: 15px;
    height: auto;
  }

  .content {
    overflow-y: scroll;

    background: #2C3E50;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #4CA1AF, #2C3E50);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #4CA1AF, #2C3E50); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }

  .profile {
    margin: 30px 15px;
    padding: 5px;

    font-size: 1.6rem;

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

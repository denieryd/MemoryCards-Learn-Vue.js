<template>
  <main>
    <div class="container">
      <div class="main__section section_center">
        <div class="section__main-auth animated rollIn">
          <h2 class="main-auth__title text-effect-shadow">{{ $store.state.modePage === 'Sign' ? 'Sign to memca' : 'Join to memca' }}</h2>
          <form class="main-auth__form" @submit.prevent="authorization">
            <label for="login">Email</label>
            <input type="text" class="margin-bot-md" v-model="userData.email" id="login" placeholder="example@mail.ru" required autofocus>
            <label for="password">Password</label>
            <input type="password" class="margin-bot-md" id="password" v-model="userData.pass" required>

            <div class="custom-control custom-checkbox my-1 mr-sm-2" v-if="$store.state.modePage === 'Sign'">
              <input type="checkbox" class="custom-control-input" id="customControlInline" v-model="restoreDataLogin">
              <label class="custom-control-label" for="customControlInline">Запомнить данные</label>
            </div>

            <div class="alert alert-danger margin-bot-lg" role="alert" v-if="errorsAuth">
              {{ messageError }}
            </div>
            <button type="submit" class="btn form__btn-submit margin-top-md">{{ $store.state.modePage === 'Sign' ? 'Войти на сайт' : 'Зарегистрироваться' }}</button>
          </form>
          <div class="main-auth__footer margin-bot-lg">
            <span>{{ $store.state.modePage === 'Sign' ? 'New here?': 'Registered on memca?'}}</span>
            <a href="#" @click.prevent="getAnotherPage">{{ $store.state.modePage === 'Sign' ? 'Create a account': 'Sign in account.' }}</a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import * as firebase  from 'firebase';

  export default {
    data () {
      return {
        modePage: '',
        errorsAuth: false,
        messageError: '',

        userData: {
          email: '',
          pass: ''
        },
        restoreDataLogin: true
      }
    },
    created() {
      this.recallLoginData();
      this.setModePage();
    },
    watch: {
      '$route': 'setModePage',
    },
    methods: {
      setModePage() {
        this.modePage = this.$route.params.modePage;
        this.$store.commit('setModePage', this.$route.params.modePage);
      },

      getAnotherPage () {
       let path;
       if (this.modePage === 'Sign') {
         path = {name: 'Auth', params: {'modePage': 'Registration'}}
       } else {
         path = {name: 'Auth', params: {'modePage': 'Sign'}}
       }
        this.$router.push(path);
      },

      authorization() {
        if (this.modePage === 'Registration') {
          firebase.auth().createUserWithEmailAndPassword(this.userData.email, this.userData.pass)
            .then(() => {
              let path = {name: 'Auth', params: {mode: 'Sign'}};
              this.$router.push(path);
            })
            .catch((error) => {
              this.errorsAuth = true;
              this.messageError = error.message;
            });
        } else if (this.modePage === 'Sign') {
          this.signIn();
        }
      },

      signIn() {
        firebase.auth().signInWithEmailAndPassword(this.userData.email, this.userData.pass)
          .then((response) => {
            let userData = {
              headerEmail: response.email,
              uidUser: response.uid,
              loginSuccess: true,
              countCards: 0,
            };
            this.$store.commit('setUserData', userData);

            if (this.restoreDataLogin) {
              this.saveDataAuthUser(this.userData.email, this.userData.pass)
            } else {
              localStorage.email = null;
              localStorage.pass = null;
            }
            this.$router.push({name: 'Content'})
          })
          .catch((error) => {
            this.errorsAuth = true;
            this.messageError = error.message;
          })
      },

      saveDataAuthUser(email, pass) {
        localStorage.email = email;
        localStorage.pass = pass;
      },

      recallLoginData() {
        if (localStorage.email !== undefined && localStorage.pass !== undefined) {
          this.userData.email = localStorage.email;
          this.userData.pass = localStorage.pass;
          this.restoreDataLogin = true;
        }
      }
    }
  }
</script>


<style scoped>

  input {
    box-shadow: 1px 3px 19px -12px #000000;
  }


  .text-effect-shadow {
    color: transparent;
    text-shadow: rgba(255, 255, 255, 0.5) 0 3px 3px;
    background-color: #666666;

    -webkit-background-clip: text;
  }

  .margin-bot-md {
    margin-bottom: 20px;
  }

  .margin-bot-lg {
    margin-bottom: 30px;
  }

  .margin-top-md {
    margin-top: 20px;
  }


  main {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;

    -moz-border-radius-bottomleft: 5px;
    -moz-border-radius-bottomright: 5px;
    background: #2b3237;
  }

  .container {
    margin: auto;
  }

  .section_center {
    position: relative;

    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-flow: row;
    justify-content: center;

    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-flow: row;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
  }

  .section__main-auth {
    width: 40%;
  }

  .main-auth__form {
    position: relative;

    padding: 20px;
    margin: 15px 0;

    border: 1px solid #d8dee2;
    border-radius: 5px;
    background: #fafbfc;
    box-shadow: 1px 3px 19px -8px #000000;
  }

  .main-auth__title {
    color: darksalmon;
    text-align: center;
  }


  .main-auth__form input {
    min-height: 34px;
    line-height: 34px;

    padding: 6px 8px;
    border: 1px solid #d1d5da;
    border-radius: 3px;
  }
  .main-auth__form label {
    margin-bottom: 3px;
  }
  .main-auth__form label, .main-auth__form input {
    display: block;
    width: 100%;
  }
  .main-auth__form .secondary-controls {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: flex-start;

    -webkit-box-pack: start;
    -ms-flex-pack: start;
    -webkit-box-align: center;
    -ms-flex-align: center;

    align-items: center;
  }



  .main-auth__footer {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-around;

    width: 100%;
    padding: 13px 15px;
    font-size: 14px;

    border: 1px solid #d8dee2;
    border-radius: 5px;
    background: #f9f9f9;
  }

  .form__btn-submit {
    position: relative;

    width: 100%;
    margin-left: auto;
    min-height: 35px;

    border-radius: 3px;
    border: 0;
    color: white;
    cursor: pointer;
    overflow: hidden;
    background: #26a69b;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, .4);
  }

  .form__btn-submit:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, .5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }

  .form__btn-submit:hover, form__btn-submit:active, form__btn-submit:focus {
    background: #2bbbae;
  }

  .form__btn-submit:focus:not(:active)::after {
    animation: ripple 0.8s ease-out;
  }

</style>

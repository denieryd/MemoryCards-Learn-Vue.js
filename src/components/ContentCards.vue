<template>
  <div class="wrap">
    <div class="animation-banner animated flipInX">
      <i class="fa fa-bell" aria-hidden="true"></i>
      <span class="banner-text">
        {{ bannerText }}
      </span>
    </div>

    <form class="setting-card">

      <div class="inputs-card">
        <div class="form-group">
          <input type="text" class="form-control" id="formGroupExampleInput" v-model="QuestionCard"  required placeholder="Вопрос карточки">
        </div>

        <div class="form-group">
          <input type="text" class="form-control" id="formGroupExampleInput2" v-model="AnswerCard" required placeholder="Ответ карточки">
        </div>
      </div>

      <button type="submit" class="btn btn-outline-warning btn-lg btn-create-card" @click.prevent="addNote"> Создать карточку </button>
    </form>


    <div class="main-content">
      <hr>


      <div class="help-banner-content" v-if="!$store.state.userData.loginSuccess">
        <span class="text-secondary"> Для получение карточек,вам нужно авторизоваться </span>
      </div>


      <div class="content-cards">

        <div class="card text-white bg-dark mb-3" style="max-width: 18rem;" v-for="card in listCards">
          <div class="card-header">
            <span>Карта #1</span>
            <button type="button" class="btn btn-outline-warning" @click="deleteCard($event, card.timeStamp)">Удалить карту</button>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ card.QuestionCard }}</h5>
            <p class="card-text hidden"> {{ card.AnswerCard }}</p>
            <button type="button" class="btn btn-outline-success" @click="toggleAnswer">Показать ответ</button>
          </div>
        </div>

      </div>


    </div>
  </div>
</template>

<script>
  import WOW from 'wow.js';
  import * as firebase from 'firebase'

  export default {
    data() {
      return {
        listCards: [],
        bannerText: 'Сперва нужно авторизоваться',

        QuestionCard: '',
        AnswerCard: ''
      }
    },

    created() {
      const wow = new WOW();
      wow.init();
      this.getContent();
      this.test();
    },

    methods: {

      test() {
        setTimeout(() => {
          console.log('r');
          document.querySelector('.animation-banner').classList.remove('flipInX');
          document.querySelector('.animation-banner').classList.add('flipOutX');

        }, 2500)
      },

      toggleAnswer(e) {
        e.target.previousElementSibling.classList.toggle('hidden');
      },

      addNote (e) {
        if (this.$store.state.userData.uidUser) {
          let timeStamp = new Date().getTime();
          let card = {
            QuestionCard: this.QuestionCard,
            AnswerCard: this.AnswerCard,
            timeStamp
          };
          this.listCards.push(card);

          let path = this.$store.state.userData.uidUser;

          firebase.database().ref(path + '/' + timeStamp).set(card);
          this.QuestionCard = '';
          this.AnswerCard = '';
        } else {
          alert('Сначала рег и вход');
        }
      },

      deleteCard (e, timeStamp) {
        if (this.$store.state.userData.uidUser) {
          firebase.database().ref(`${this.$store.state.userData.uidUser}/${timeStamp}`).remove();
          e.target.parentNode.parentNode.remove();
        }
      },

      getContent() {
        if (this.$store.state.userData.uidUser) {
        this.listCards = [];
        let path = this.$store.state.userData.uidUser;

          firebase.database().ref('/' + path).once('value').then((snapshot) => {
            getNotes(snapshot.val())
          });
          const that = this;

          function getNotes(card) {
            for (let key in card) {
              that.listCards.push({
                QuestionCard: card[key].QuestionCard,
                AnswerCard: card[key].AnswerCard,
                timeStamp: card[key].timeStamp,
              })
            }
          }
        }
      }


    }
  }
</script>


<style scoped>

  hr {
    margin-bottom: 50px;
  }

  input {
    box-shadow: 1px 3px 19px -12px #000000;
  }

  .hidden {
    display: none;
  }

  .animation-banner {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    height: 8%;
    top: 0;
    margin: 0;

    animation-duration: 1s;
    color: black;
    font-size: 23px;
    z-index: 1;
    background: rgba(139,197,65, 1);
  }

  .banner-text {
    margin-left: 15px;
  }

  .help-banner-content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px;

    font-size: 35px;
    font-weight: bold;

  }



  .wrap {
  }

  .setting-card {
    margin: 20px;
    margin-bottom: 30px;
  }

  .inputs-card {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;

    margin: 20px;
  }

  .btn-create-card {
    width: 350px;
    margin: 20px;
  }


  .main-content {
    padding: 20px;
    padding-top: 0;
  }

  .content-cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .card {
    display: inline-block;
    margin: 5px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;


  }

  .card-title {

  }

  .card-text {

  }




</style>

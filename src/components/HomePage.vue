<template>
  <div class="container-fluid m-0 p-0">
    <div id="home-page" class="full-height p-4">
      <div class="container">
        <div class="row pb-5">
          <div class="col-lg-6 pt-4 my-auto ">
            <div class="text-center mb-3 d-block d-lg-none">
              <h1 class="display-4">{{ title }}</h1>
              <h3>Dünyayı Bulun</h3>
            </div>
            <img id="iphone-img" src="../assets/iphone.png" class="img-fluid" />
          </div>
          <div class="col-lg-6 my-auto pt-4">
            <div class="text-center mb-3 d-none d-lg-block">
              <h1 class="display-4">{{ title }}</h1>
              <h3>Dünyayı Bulun</h3>
            </div>
            <div class="border pt-3 p-md-5 bg-white rounded shadow">
              <h2>Çok Yakında</h2>
              <form @submit.prevent="addEmail(email)">
                <div class="form-group">
                  <label for="emailSignup"
                    >Şimdiden yerinizi ayırtın, site aktif oldugunda sizinle
                    iletişim kurucağız</label
                  >
                  <input
                    v-model="email"
                    id="emailSignup"
                    type="email"
                    placeholder="Mail adresinizi giriniz."
                    class="form-control"
                  />
                  <small id="emailHelp" class="form-text text-muted"
                    >E-posta adresinizi asla paylaşmayacağız</small
                  >
                  <button type="submit" class="btn btn-success mt-3">
                    Bekleme listesine katılın
                  </button>
                  <div class="mt-4">
                    <p class="m-0">{{ message }}</p>
                  </div>
                </div>
              </form>
            </div>
            <div id="avaible" class="p-2">
              <h4 class="text-center mb-2 mt-3 text-light">
                Çok yakında mobilde
              </h4>
              <div class="row">
                <div class="col my-auto ">
                  <img
                    src="../assets/download_apple.png"
                    class="float-right img-fluid app_store_img"
                  />
                </div>
                <div class="col my-auto">
                  <img
                    src="../assets/download_apple.png"
                    class="float-left img-fluid app_store_img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="about" class="bg-light p-3 p-md-5">
      <div class="row">
        <div class="col-lg">
          <img src="../assets/icons/app.svg" height="120" class="m-4" />
          <h5 class="ml-md-4 mr-md-4">
            Harcamaları kategoriye göre ayırmayı kolaylaştırarak önemli şeyleri
            planlamanız için size daha fazla zaman tanıyoruz.
          </h5>
        </div>
        <div class="col-lg">
          <img src="../assets/icons/piggy-bank.svg" height="120" class="m-4" />
          <h5 class="ml-md-4 mr-md-4">
            Gezilerinizin toplam bütçe hedefi doğrultusunda ne kadar tasarruf
            ettiğinizi izlemek için uygulamayı kullanın. Daha ne kadar tasarruf
            etmeniz gerektiğini ve tasarruf etmek için ne kadar zamanınız
            kaldığını tam olarak bilin.
          </h5>
        </div>
        <div class="col-lg">
          <img src="../assets/icons/passport.svg" height="120" class="m-4" />
          <h5 class="ml-md-4 mr-md-4">
            Seyahatinizin günü geldiğinde, harcamalarınızı planladığınız için
            içiniz rahat olsun. Bir daha asla seyahatte para için
            endişelenmeyin!
          </h5>
        </div>
      </div>
    </div>
    <div id="contact" class="p-4">
      <div class="row justify-content-center mt-3 mb-3">
        <div v-if="show_contact== true" class="col-lg-4">
          <h2>Herhangi bir sorunuz var mı ?</h2>
          <p>Aşağıdaki bilgileri doldurarak bize ulaşın</p>
          <div v-if="contact_notice != ''" class="alert alert-warning">
            Mesajınızı gönderirken bir sorun oluştu, {{contact_notice}}
          </div>
          <form @submit.prevent="sendContactMessage()">
            <div class="form-group text-left">
              <input
              v-model="contact_email"
                type="email"
                class="form-control"
                placeholder="E-Posta adresinizi giriniz."
              />
              <textarea
              v-model="contact_message"
                rows="5"
                class="form-control mt-3"
                placeholder="Mesajınızı Giriniz"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Mesajı Gönder</button>
          </form>
        </div>
        <div v-else>
            <h3>Mesaj başarıyla gönderildi!</h3>
            <p>Bizimle iletişim kurduğunuz için teşekkür ederiz, mümkün olan en kısa sürede size geri döneceğiz.</p>
        </div>
      </div>
    </div>
    <div id="footer" class="p-4">
        <footer class="text-light p-4">
            <a href="https://github.com/xeorleon" target="_blank">Uygulama Sahibi</a>
            <a href="#" class="text-warning">Gizlilik Politikası</a>
            <br>
            <small>&copy; 2020, Seyahat Hazinesi</small>
        </footer>
    </div>
  </div>
</template>

<script>
import {Auth} from "@/firebase/auth.js";

export default {
  data() {
    return {
      title: "Seyahat Hazinesi",
      email: '',
      message: '',
      show_contact :true,
      contact_email: '',
      contact_message: '',
      contact_notice: '',
    };
  },
  methods : {
    async addEmail(email){
      console.log("We  in the function");
      console.log(email);
      var noticeMessage = "Hesabınız rezerve edildi";
      await Auth.createUserWithEmailAndPassword(email,  this.randomPassword(20)).catch(function(error){
        if(error.code == "auth/email-already-in-use"){
          noticeMessage = "Bu hesap rezerve edildi";
        }else{
          noticeMessage = error.message;
        }
      });
      this.message = noticeMessage;
      this.email = '';
    },
    randomPassword(length){
      var chars ="abcdefghijklmnopqrstuvxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
      var password = "";
      for(var x = 0;x<length;x++){
        var i = Math.floor(Math.random() * chars.length );
        password += chars.charAt(i);
      }
      return password;
    },
    sendContactMessage(){
        if(!this.validEmail(this.contact_email)){
          this.contact_notice = "E-posta adresi kötü biçimlendirilmiş!";
        }else if(this.contact_message.length < 10) {
          this.contact_notice = "Mesajınız Çok Kısa";
        }else{
          const url = `https://us-central1-seyahathazinesi.cloudfunctions.net/sendMail?email_from=${this.contact_email}&message=${this.contact_message}`;
          const requestOptions = {
            method: "GET",
            headers: {"Content-Type":"application/json"}
          };
          fetch(url, requestOptions);
          this.show_contact = false;
        }
    },
    validEmail(email){
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
};
</script>

<style scoped>
#home-page {
  background-color: #92d2f2;
  background: url("../assets/bg.jpg") no-repeat center center;
  background-size: cover;
}
#about {
  min-height: 40vh;
}
#contact{
    background-color:#57AEAF;
}
#footer{
    background-color: #252223;
}
#iphone-img {
  max-height: 80vh;
}
.app_store_img {
  max-height: 80px;
}
</style>

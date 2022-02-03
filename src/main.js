import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import FullpageModal from 'vue-fullpage-modal'
import color from "./assets/data/cor.json"  
import { moeda,lang } from "@/services/moeda"
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import VueCoreVideoPlayer from 'vue-core-video-player'


Vue.use(VueCoreVideoPlayer)

Vue.config.productionTip = false
Vue.use(Vuesax, {
    colors: {
    primary:color.primary,
    success:'rgb(23, 201, 100)',
    danger:'rgb(242, 19, 93)',
    warning:'rgb(255, 130, 0)',
    dark:'#2c313a'
  }
})



Vue.config.productionTip = false;
Vue.use(FullpageModal)




new Vue({
  data:{
  },
  router,
  store,
  vuetify,
  watch:{
    carregando(val,oldVal){
 
        

    }

  },
  methods:{

    moeda(v){

      return Number(v).toLocaleString(lang, moeda)
    },
  },
  computed:{

  },
  created() {

    this.$store.dispatch("getServerInfo");

  },
  mounted(){
    
    

  },
  render: (h) => h(App),
}).$mount("#app");









// import { EagleModal } from 'vue-eagle-modal'
// Vue.use(EagleModal);

    // let m = this.$modals.add({
    //   title: 'Title',
    //   theme: this.$vuetify.theme.dark ? 'osx' : 'mojave',
    //   items: [
    //     {
    //       label: 'Username',
    //       name: 'username',
    //       type: 'text',
    //       value: 'Daniel',
    //     },
    //     {
    //       label: 'Bio',
    //       name: 'bio',
    //       type: 'text',
    //       value: '',
    //     }
    //   ],
    // });
    // m.open();
    
    // m.onsave( (m) => {
    //   m.loading();
    //   setTimeout(() => {
    //     console.log(m.formData())
    //     console.log(m.getItems())
    //     m.loaded()
    // },500)
    // })
  
    // m.onreload( () => {
    //   console.log('Reloaded')
    // })
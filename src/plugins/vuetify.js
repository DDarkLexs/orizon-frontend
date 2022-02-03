import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import color from "../assets/data/cor.json"  
Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: false,
        themes: {
          light: {
            primary: color.primary,
          // secondary: '#FFB73C',

          },
          dark: {
            primary: color.primary,
         //   secondary: '#6f64ea',
           // topbarc:'#424242'
          },
        },
      },

});

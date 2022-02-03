<template>
  <v-app>
    <v-navigation-drawer app>
      <v-system-bar
        height="23"
        color="primary"
      dark
      >
    <v-icon>
      mdi-laptop
    </v-icon>
    <span>{{ server.usuario }}</span>
  <v-spacer></v-spacer>

  <v-icon @click="getServerInfo(server)">
    mdi-map-marker
  </v-icon>
  </v-system-bar>

      <v-img height="200"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)"
      src="@/assets/img/pexels-xxss-is-back-777001.jpg">
        <v-list dark nav dense>
          <!-- {{ server.usuario }} -->
          
          <v-list-item two-line>
            <v-list-item-content>
            <v-list-item-icon>
              <v-icon > mdi-folder-multiple </v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Destino
            </v-list-item-title>
            
            <v-list-item-subtitle>{{ server.dist }}</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>

        </v-list>
      </v-img>
      <v-list nav dense>
        <v-list-item>
          <v-switch small class="ml-3" v-model="$vuetify.theme.dark" inset dense
          :label="`Modo ${$vuetify.theme.dark ? 'escuro' : 'claro'}`"></v-switch>
        </v-list-item>
        <v-divider></v-divider>
        
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
              <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-img src="@/assets/pexels-andy-vu-3244513.jpg">
      <v-app-bar class="elevation-0" color="transparent" app>
        <v-toolbar color=primary class="elevation-0 rounded " dense dark>

          <div class="text-h6" >
            
            {{ titulo }}
          </div>

          <v-spacer></v-spacer>
          <v-expand-transition>
            <v-card
                v-show="loading"
                class="mx-auto transparent"
                outlined
                transparent
                color="transparent"
            >
             <span >
              
              <v-progress-circular :rotate="360" :size="43" :width="2" :value="$store.getters.p" color="success">

                <span class="white--text py-3">
                  {{ $store.getters.p }}%
                </span>
              </v-progress-circular>

            </span>
        </v-card>
        </v-expand-transition>
        </v-toolbar>

      </v-app-bar>

      <!-- Sizes your content based upon application components -->
      <v-main>

        <v-overlay :value="overlay">

          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- <video controls width="200" src="@/assets/img/pexels-caroline-veronez-9917770.mp4">

          </video>
 -->
          <!-- If using vue-router -->
          <router-view></router-view>

        </v-container>

      </v-main>
      <v-footer dark dense padless app>
        <v-card class="flex" flat tile>


          <v-card-text class="py-0 white--text text-center">
            {{ new Date().getFullYear() }} — <strong>Todos os direitos reservado</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-img>
  </v-app>

</template>

<script>
  export default {

    name: "App",

    data: () => ({
      titulo: `Orizon`.toUpperCase(),
      selectedItem: 1,
      overlay: false,

      items: [
        { text: 'Menu principal', icon: 'mdi-home', to: "/" },
        { text: 'Carregar', icon: 'mdi-cloud-upload', to: "/carregar" },
        { text: 'Servidor remoto', icon: 'mdi-server-network', to: "/servidorRemoto" },
        { text: 'Histórico', icon: 'mdi-history', to: "/historico" }
      ],

      //
    }),

    methods: {
      getServerInfo(info){

        this.$vs.notification({
          position: 'bottom-right',
          color: 'dark',
          title: `Servidor info`,
          square: true,
          text: `Servidor: ${info.servidorNome} <br>
                 Plataforma: ${info.plataforma}  <br>
                 Base - ${info.arq}  <br>
                 Directório principal: ${info.homeDir} <br>
                 `,
          duration: 60000
        })



      }

    },
    watch: {


      $route(to, from) {
        this.overlay = true

        this.$vs.notification({
          position: 'bottom-right',
          color: 'dark',
          title: "directorio atual",
          square: true,
          text: to.name,
          duration: 3000
        })

        setTimeout(() => {

          this.overlay = false


        }, 2000);

    
      },
      report(val,oldVal){

          this.$vs.notification({
            position: 'bottom-right',
            color: 'dark',
            title: `Carregamento terminado`,
            square: true,
            text: `Foi feito ${val.length} carregamento no total`,
            duration: 3000
          })

          /*         this.$vs.notification({
          position: 'bottom-right',
          color: 'dark',
          title: "directorio atual",
          square: true,
          text: val.length,
          duration: 3000
          })  */



          }



    },


    computed: {
      loading:function(){
        return this.$store.getters.l
      },

      server:function(){

        return this.$store.getters.server
      },
      p: function () {
        return this.$store.getters.p
      },
      
      report:function () {
      return this.$store.getters.reportData
      },
      
    },

    async mounted() {

      // this.$FModal.show({
      //   component: () => import("@/views/estatistica.vue"),
      //   },{/* produtos:[item],i:[item].length */});

    },
  };
</script>
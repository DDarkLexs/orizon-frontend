<template>
    <div>
    <v-card width="400">
        <v-img
          height="200px"
          src="@/assets/img/img1.jpg"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)"
        >
          <v-app-bar
            flat
            dark
            color="rgba(0, 0, 0, 0)"
          >
            <v-icon class="mr-3"> mdi-laptop </v-icon>

            <v-toolbar-title class="text-h6 white--text pl-0">
              {{ server.usuario }}
            </v-toolbar-title>

            <v-spacer></v-spacer>

            {{ curDate }}
          </v-app-bar>

          <v-card-title class="white--text display-2 mt-8">
            {{ server.plataforma }}
           </v-card-title>
           
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            {{ server.processador }}
          </div>
        
        </v-card-text>
      </v-card>

    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },

     computed: {
    curDate:function(){

        return new Date(this.$store.getters.server.time).toLocaleDateString("pt-br",{month:"long",year:"numeric",day:"numeric"})
      },
      server:function(){

        return this.$store.getters.server
      },
  },
}
</script>
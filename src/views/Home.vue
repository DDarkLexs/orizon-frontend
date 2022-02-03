<template>
 <v-row g-1>
    <v-col cols=12 sm=6 >

      <home-status/>

      
    </v-col>
    
    <v-col cols=12 sm=6>
      
     <!--  <ServerStatus /> -->
      
    </v-col>
    
    <v-col cols=12 sm=6>
      
    <!--   {{ server }} -->

    </v-col>

    <v-col cols=12 sm=6>
      

    </v-col>
 </v-row>
</template>

<script>
import axios from 'axios'
import homeStatus from "@/components/home/server.vue"
import ServerStatus from "@/components/home/status.vue"
export default {
  name: "Home",
  data:()=>{
    return {
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
  
    }
  },
  computed: {
      server:function(){

        return this.$store.getters.server
      },
  },
  mounted(){


  },
  components: {
    ServerStatus,
    homeStatus
  },
};
</script>

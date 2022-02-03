<template>
    <div>
      <form 
      
      @submit.prevent="assignCarregar" enctype="multipart/form-data" >
      <v-card 
      :loading="l"
      class="mx-auto"  max-width="500">
    <v-img
      src="@/assets/img/pexels-roberto-nickson-7238759.jpg"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)"
      height="250px" 
      dark >
    
    <v-card-title class="display-1">
      Carregamento
    </v-card-title>
    
    </v-img>

    <v-card-text>
    <v-file-input

    :loading="l"
    :disabled="l"
    color="primary"
    counter
    @change="assign"
    label="Selecione Arquivo"
    multiple
    v-model="files"
    prepend-icon="mdi-paperclip"
    outlined
  :show-size="1000"
  >
    <template v-slot:selection="{ index, text }">
      <v-chip
        v-if="index < 2"
        color="primary"
        dark
        label
        small >
        {{ text }}
      </v-chip>

      <span v-else-if="index === 2" >
        +{{ files.length - 2 }} arquivo(s)
        </span>
      </template>
    </v-file-input>

  <!--   <input type="number" v-model="$store.state.upload.percentagem"> -->
    </v-card-text>

    
    <v-card-actions>
      <v-btn
      :loading="l"
      :disabled="l"
      type="submit"
      small
      color="success" fab class="ma-2 white--text"  >
      <v-icon  dark >
        mdi-cloud-upload
      </v-icon>
    </v-btn>
    <v-btn
      small 
      fab
      :loading="l"
      :disabled="l"
      color="error" 
      class="ma-2 white--text"  >
      <v-icon dark >
        mdi-delete
      </v-icon>
    </v-btn>

    <v-spacer></v-spacer>
    
    <v-btn
    icon
    @click="tabela = !tabela"
  >
    <v-icon>{{ tabela ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
  </v-btn>

    </v-card-actions>

    <v-progress-linear
    bottom
    :active="show"
    v-model="p"
    color="primary"
  ></v-progress-linear>

  <v-expand-transition>
    <div v-show="tabela">
      <v-divider></v-divider>

      <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Nome
                </th>
                <th class="text-left">
                  <v-icon @click color="red" dark >
                    mdi-delete
                  </v-icon>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in uploadedList"
                :key="item.nome"
              >
                <td>{{ item.nome }}</td>
                <td> 
                  <v-icon @click color="red" dark >
                    mdi-delete
                  </v-icon>  
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      
      </v-card-text>
    </div>
  </v-expand-transition>

  </v-card>
    </form>
    </div>
</template>
<script>

  export default {
    data() {
      return {
        files:[],
      loading:false,
        show:true,
        tabela:false,
      }
    },


    methods: {
      assign(arg){

        this.$store.dispatch("getFiles", arg);

      },
      assignCarregar(){

        this.$store.dispatch("initUpload");




      }
      

    },
    computed: {
      p:function(){

    return this.$store.getters.p
    },
      l:function(){

        return this.$store.getters.l
      },
      uploadedList:function(){

        return this.$store.getters.updateUploadDone
      }
    },

    
    mounted() {
      
      /* this.$vs.notification({
        position: 'bottom-right',
        color: 'dark',
        title: "directorio atual",
        square: true,
        text: to.name,
        duration: 3000
      }) */
    },

   }
</script>
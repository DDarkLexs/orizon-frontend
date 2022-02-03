<template>
    <div>
        <v-card class="mx-auto"  max-height="700" max-width="900" >
            <v-img
            height="200px"
            src="@/assets/img/intricate-explorer-t11SFyhfjkk-unsplash.jpg"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)" >
          
            <v-app-bar
              flat
              dark
              color="rgba(0, 0, 0, 0)" >
              <v-icon class="mr-3"> mdi-folder </v-icon>

  
              <v-spacer></v-spacer>
              
              
              <v-text-field
                  v-model="$store.state.remoteServe.procura"
                  label="Procura"
                  dark
                  flat
                  prepend-icon="mdi-undo"
                  @click:prepend="voltar($store.state.remoteServe.procura)"
                  @change="changeDir($store.state.remoteServe.procura)"
                  solo-inverted
                  hide-details
                  append-icon="mdi-magnify"
                ></v-text-field>
            </v-app-bar>

            <v-card-title class="display-1">

              

            </v-card-title>
         
          </v-img>
          

       
    <div  style="overflow: scroll;height: 400px;" >

        <v-card-text  >
            <v-treeview
            v-model="tree"
            :items="directorio"
            activatable
            item-key="name" >
            
            <template v-slot:prepend="{ item, open }">
              <div>
                
                
                <v-icon>
                  {{ item.isFile ? 'mdi-file' : 'mdi-folder' }}
                </v-icon>
              
              </div>
            </template>


            <template v-slot:label="{ item, open }">

                <v-menu max-width="300" transition="scroll-y-reverse-transition">
                  
                  <template v-slot:activator="{ on, attrs }">
                    <div 
                    v-bind="attrs"
                    v-on="on"
                     >
                      
                      {{ item.name }}
                      
                    </div>
                  </template>
                  
                  <v-card  class="mx-auto"   max-width="300" tile>
                  <v-list dense>
                    <v-subheader> {{ item.name }} </v-subheader>
                    <v-list-item-group color="primary" >
                      <v-list-item 
                      
                      @click="item.isFile ? download(`${$store.state.remoteServe.procura}/${item.name}`) : changeDirByName(`${$store.state.remoteServe.procura}/${item.name}`)">

                        <v-list-item-icon>
                          <v-icon> {{ item.icon }} </v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title > {{ item.isFile ? 'Baixar':'Entrar' }} </v-list-item-title>
                        </v-list-item-content>

                      </v-list-item>

                      <v-list-item @click="ver(),
                      srcVid = service.getAddressSrc(`${$store.state.remoteServe.procura}/${item.name}`)">
                        <v-list-item-icon>
                          <v-icon> mdi-movie </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title > Reproduzir </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon> mdi-delete </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title > Apagar </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
                </v-menu>
                
            </template>

          </v-treeview>
        </v-card-text>
      </div>


      </v-card>
      <v-dialog
      v-model="video"  :max-width="vidFile.w">
      <v-card>
      <video :src="srcVid"></video>
         <v-card-actions>
           <v-slider
           :max="vidFile.fixed"
           v-model="vidFile.w"
           thumb-label >
          </v-slider>
          <v-spacer></v-spacer>
          
          <v-btn
          color="error"
          text @click="video = false" >
            fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    </div>
</template>

<script>
  
import service from "@/services/server/index.js"
export default {

  
  data: () => ({
    /*  initiallyOpen: ['public'], */
    video: false,
      srcVid:'null',
      service,
      vidFile:{
        fixed:0,
        w:0,
      },
      files: {
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-code-json',
        md: 'mdi-language-markdown',
        pdf: 'mdi-file-pdf',
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline',
        xls: 'mdi-file-excel',
      },
      tree: [],
    }),
      
    methods: {
      ver(file){
        try {

          // console.log(this.$refs.vid)

          
          this.video = true
          // this.
          this.vidFile.fixed = (Number(window.innerWidth) - 100)
          this.vidFile.w = (Number(window.innerWidth) - 100)
  
        } catch (error) {
          this.$vs.notification({
          position: 'bottom-right',
          color: 'dark',
          title: `Houve um erro!`,
          square: true,
          text: `${error}`,
          duration: 3000
        }) 
        }

      },
      download(file){

        this.$vs.notification({
          position: 'bottom-right',
          color: 'dark',
          title: `Baixando!`,
          square: true,
          // text: `${file}`,
          duration: 3000
        })

        this.$store.dispatch("downloadFile", file);
      },
      
      voltar(dir){

      var arr = String(dir).split('/')
      arr = arr.splice(0,arr.length - 1)
        arr = arr.map((v,i,arr) => {
          return v.replace(v[0],`/${v[0]}`)
        })
        
        const path = arr.join('')
        this.$store.dispatch("getServerDirByName", path);
        

      },

      changeDirByName(txt){
        try {
          
          
          this.$store.dispatch("getServerDirByName", txt);
          
        } catch (error) {

          this.$vs.notification({
          position: 'bottom-right',
          color: 'red',
          title: `Houve um erro!`,
          square: true,
          text: `${error}`,
          duration: 3000
        })

          
        }
      },
      changeDir(path){
        try {
          
          this.$store.dispatch("getServerDirByName", path);
          
          
        } catch (error) {

          this.$vs.notification({
          position: 'bottom-right',
          color: 'red',
          title: `Houve um erro!`,
          square: true,
          text: `${error}`,
          duration: 60000
        })

          
        }
          
      },
    
      
    },

    created() {


      
      
    this.$store.dispatch("getServerDir");

    },

    computed: {
      zoomSize:function(){
        return this.vidFile.w
      },
    curDate:function(){
        return new Date(this.$store.getters.server.time).toLocaleDateString("pt-br",{month:"long",year:"numeric",day:"numeric"})
      },
      directorio:function(){
        return this.$store.getters.directorio
      },
      server:function(){
        return this.$store.getters.server
      }
    }

    }
</script>

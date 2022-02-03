import Vue from "vue";
import axios from 'axios';
import Vuex from "vuex";
import service from '../services/upload'
import remoteServer from "../services/remoteServer"
import serverService from '../services/server'
import { ip } from "../services/networkPrefix";
import { moeda,lang } from "@/services/moeda"


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    l:false,

    serverInfo:{


    },

    remoteServe:{
      procura:"/root",
      procuraArr:["/root"],
      pasta:[ ]
    },
    upload: {
      percentagem: 0,
      l: false,
      arquivos: [],
      completo:[],
      report:[1,2,3,4,5,6]
    }


  },
  getters: {

    directorio: ({ remoteServe }) => {


      return remoteServe.pasta
    },

    server: state => {

      return state.serverInfo
    },
    p: state => {

      return state.upload.percentagem
    },
    l: state => {

      return state.upload.l
    },
    reportData: state => {

      return state.upload.report
    },
    updateUploadDone: state => {

      return state.upload.completo
    },

  },
 
  mutations: {
    updatePasta({ remoteServe }, files) {


      this.state.remoteServe.pasta = files.arquivos

    },
    updateDir({remoteServe},txt ){
      

      this.state.remoteServe.procura = txt
      
    },
    updateServerInfo({ serverInfo }, info) {

      this.state.serverInfo = info
      this.state.remoteServe.procura = info.homeDir
    },

    updateUploaded({ upload }, file) {

      this.state.upload.completo.push(file)
    },
    updateReport({ upload }, report) {
      this.state.upload.report = report.map((v,i,arr) => {
        const item = {nome: v.name,tamanho: v.size,tipo: v.type }
          return item
      })

    },
    updateFiles({ upload }, data) {


      this.state.upload.arquivos = data

    },
    setLoadingUpload({ upload }, status) {


      this.state.upload.l = status

    },


  },
  actions: {
    async downloadFile({ commit,state,getters },file){

      try {
      
        
        window.open(`${ip}/servidor/arquivo/baixar?file=${file}`)
        // (await axios.get(`${ip}/servidor/arquivo/baixar`, {params:{file:file},onDownloadProgress:(p) => {
          
        //   const formula = ((p.loaded / p.total) * 100 | 0) 
          
        //   // this.state.upload.percentagem = formula

        // } }))

       

      } catch (error) {
        
        alert(error)
        throw error
      }


    },
    async getServerDirByName({ commit,state,getters }, txt){
      try {

       const data = (await remoteServer.getDirectorio(txt))
       commit("updateDir", txt)
       commit("updatePasta", data)

      } catch (error) {
        
        
        throw error
      }


    },

    async getServerDir({ commit,state,getters }){
      try {
        
       // alert(state.remoteServe.procura)

       const data = (await remoteServer.getDirectorio(state.remoteServe.procura))
       commit("updatePasta", data)

      } catch (error) {
        
        
        throw error
      }


    },


    async getServerInfo({ commit, state, dispatch }) {

      try {


        const item = (await serverService.getServerInfo())
        commit("updateServerInfo", item)

        

      } catch (error) {

    
        throw error

      }


    },

    async initUpload({ commit, state, dispatch }) {



      try {
        
        commit("setLoadingUpload", true)
        
        const files = this.state.upload.arquivos
    
        for (var i = 0; i < files.length; i++) {
          
          
          const file = files[i];
          
        
          await dispatch("assignUpload", file)

          
          commit("updateUploaded", {nome: file.name,tamanho:file.size,tipo:file.type })
          
        }
        
        
        //updateReport
        commit("updateReport", files)


        commit("setLoadingUpload", false)
        
      } catch (error) {

        commit("setLoadingUpload", false)
        throw error

      }


    },
    getFiles({ commit, state }, obj) {
      commit("setLoadingUpload", true)

      commit("updateFiles", obj)

      

      console.table(obj)

      commit("setLoadingUpload", false)

    },
    assignUpload({ commit, state }, file) {

      return new Promise(async (resolve, reject) => {
        
        const formData = new FormData()
        formData.append("file",file)
        try {

          const data = (await axios.post(`${ip}/upload`,formData,{onUploadProgress:(p) => {
            const formula = ((p.loaded / p.total) * 100 | 0) 
            
            this.state.upload.percentagem = formula

          }}))
            
            resolve(data)


        } catch (error) {

          reject(error)


        }

      })






    },




  },
  modules: {


  },
});

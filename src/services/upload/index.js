import { ip } from '../networkPrefix'
import { get,post,patch } from 'axios'
import axios from 'axios'




export default {

    carregando(item,per){
         
        return new Promise(async (resolve,reject) => {
            try {
           
                /* const data = (await axios.post(`${ip}/upload`,{ item },{onUploadProgress:(event)=>{


                } })).data */
                resolve(data)
                
            } catch (error) {

                reject(error)

                throw error
            }


        })    

    },


}
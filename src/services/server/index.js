import { ip } from '../networkPrefix'
import axios, { get,post } from 'axios'



export default {
    getAddressSrc(fileDir){

        return `${ip}/servidor/arquivo/baixar?file=${fileDir}`
    },


    getServerInfo(){
    
        return new Promise(async (resolve,reject) => {

            try {
                
                const data = (await axios.get(`${ip}/servidor/identidade`)).data

                resolve(data)

            } catch (error) {

                reject(error)

                throw error
            }


        })    

    },





}
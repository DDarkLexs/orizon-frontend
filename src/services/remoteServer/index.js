import { ip } from '../networkPrefix'
import axios, { get,post } from 'axios'


export default {


    getDirectorio(dir){
    
        return new Promise(async (resolve,reject) => {

            try {
                
                const folder = (await axios.get(`${ip}/servidor/directorio`,{params:{nome:dir} })).data

                resolve(folder)

            } catch (error) {

                reject(error)

                throw error
            }


        })    

    },





}
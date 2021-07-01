//---------------------------------------------------------------------------------------------
//--------------------------Servicios de Consulta y consumo de App-----------------------------
//---------------------------------------------------------------------------------------------
import axios from 'axios';
import { BASE_API } from './constanst';
//---------------------------------------------------------------------------------------------
//-----------------------------------Servicios >> Character------------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------Direccion URL de peticiones de Backend-----------------------------
const URL_Character = BASE_API + 'character';
//----------------------------------Funcion >> Obtencion Personajes----------------------------
//Descripcion:  Envia una peticion GET mediante axios, con el fin de obtener los datos de los
//              personajes.
const character_get = ({ page = '1' }) => {
    return new Promise((resolve, reject) => {
        const response = axios({
            url: `${URL_Character}/?page=${page}`,
            method: 'get',
            data: undefined,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        resolve(response);
    });
}

export { character_get }
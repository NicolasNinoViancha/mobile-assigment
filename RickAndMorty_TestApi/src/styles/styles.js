//---------------------------------------------------------------------------------------------
//-----------------------------------Hoja de estilos-------------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale, scale } from './scale';
import { colors } from './colors';
//----------------------------------------Constantes-------------------------------------------
const { width, height } = Dimensions.get('screen');
const FONTSIZE_TEXT_TITLE = width < 350 ? moderateScale(12) : moderateScale(18);
const FONTSIZE_TEXT_LABEL = width < 350 ? moderateScale(10) : moderateScale(16);
//-----------------------------------------------------------------------------------
//---------------------------------Estilos >> Home-----------------------------------
//-----------------------------------------------------------------------------------
const HomeStyles = StyleSheet.create({
    //Estilo >> Contenedor de pantalla general
    ctnScreen: {
        flex: 0.92,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
//-----------------------------------------------------------------------------------
//---------------------------------Estilos >> Details--------------------------------
//-----------------------------------------------------------------------------------
const DetailsStyles = StyleSheet.create({
    //Estilo >> Contenedor de pantalla general
    ctnScreen: {
        flex: 0.78,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export { HomeStyles, DetailsStyles }
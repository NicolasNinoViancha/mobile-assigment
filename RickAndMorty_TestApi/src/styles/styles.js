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
    //Estilo >> Contenedor Loading Data
    ctnLoading: {
        position: 'absolute',
        bottom: 0,
        width,
        height: height * 0.1,
        backgroundColor: colors.Blue,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
    }

});
//-----------------------------------------------------------------------------------
//---------------------------------Estilos >> Details--------------------------------
//-----------------------------------------------------------------------------------
const DetailsStyles = StyleSheet.create({
    //Estilo >> Contenedor de pantalla general
    ctnScreen: {
        flex: 0.92,
        width,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
});
export { HomeStyles, DetailsStyles }
//---------------------------------------------------------------------------------------------
//------------------------------Archivo de componente: Wallpaper-------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View } from 'react-native';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors'
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyWallpaper = props => {
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar
                animated={true}
                backgroundColor={colors.Blue}
                barStyle={'dark-content'}
                showHideTransition={'fade'} />
            {props.children}
        </SafeAreaView>
    );
}
export default MyWallpaper;
const styles = StyleSheet.create({
    //Estilo de contenedor
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: colors.Gray,
    },
})

//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyLoading---------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { ActivityIndicator } from 'react-native';
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyLoading = props => {
    const { color } = props;
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <ActivityIndicator size="large" color={color} />
    );
}
export default MyLoading;

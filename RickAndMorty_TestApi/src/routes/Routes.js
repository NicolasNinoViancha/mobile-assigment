//---------------------------------------------------------------------------------------------
//----------------------------Archivo de navegacion de pantallas-------------------------------
//---------------------------------------------------------------------------------------------
//Nota: Para efectos de documentacion sobre algun tipo de navegador implementado remitirse
//      al siguiente enlace: https://reactnavigation.org/docs/getting-started V. 5.x
//      En este proyecto se utilizo un tipo de navegador : Navegadores de Pila.
//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//---------------------------------------Pantallas de App--------------------------------------
//--------------------------------Pantallas de navegador principal-----------------------------
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
//---------------------------------------------------------------------------------------------
//-----------------------------Declaracion de Navegadores de APP-------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------------Navegador de PILA principal----------------------------------
//---------------------------------------------------------------------------------------------
//Descripcion:  Navegador de Pila principal. Navegador Padre de la App, contiene las pantallas
//              de Home y Details.
const MainStack = createStackNavigator();//Objeto de pila
const Routes = (props) => {
    //-----------------------------------------------------------------------------------------
    //---------------------------------Instancia >> Navegador----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        //-------------------------------------------------------------------------------------
        //------------------------------Declaracion de pantallas de APP------------------------
        //-------------------------------------------------------------------------------------
        <NavigationContainer>
            <MainStack.Navigator initialRouteName="Home">
                {/*----------------------Estructura de declaracion--------------------------*/}
                {/*<Stack.Screen
                    name=nomb_screen
                    component={Component_import_screen
                    options{}}/>*/}
                {/*-------------------------------------------------------------------------*/}
                <MainStack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }} />
                <MainStack.Screen
                    name="Details"
                    component={DetailsScreen}
                    options={{ headerShown: false }} />
            </MainStack.Navigator>
        </NavigationContainer>
    );
}
export default Routes;


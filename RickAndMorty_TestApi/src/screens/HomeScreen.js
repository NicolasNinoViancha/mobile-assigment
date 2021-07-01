//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> Home------------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, Dimensions, Image, Alert, VirtualizedList } from 'react-native';
//-----------------------------------------Componentes-----------------------------------------
import MyWallpaper from '../components/MyWallpaper';
import MyDrawMenuButton from '../components/MyDrawMenuButton';
import MyLoading from '../components/MyLoading';
import MyCardItem from '../components/MyCardItem';
//-------------------------------------------Servicos------------------------------------------
import { character_get } from '../services/services';
//-------------------------------------------Estilos-------------------------------------------
import { HomeStyles } from '../styles/styles';
import { colors } from '../styles/colors';
import { moderateScale } from '../styles/scale';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('screen');
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
const HomeScreen = props => {
    const { navigation } = props;
    //-----------------------------------------------------------------------------------------
    //--------------------------------Declaracion >> Estados-----------------------------------
    //-----------------------------------------------------------------------------------------
    const [render, setRender] = useState(false);//Estado >> First Render Data.
    const [loading, setLoading] = useState(true);//Estado >> Loading Data.
    const [data, setData] = useState([]);//Estado >> Datos Api.
    const [info, setInfo] = useState([]);//Estado >> Info Api.
    const [page, setPage] = useState(1);//Estado >> Numero Pagina.
    //-----------------------------------------------------------------------------------------
    //--------------------------------Declaracion >> Funciones---------------------------------
    //-----------------------------------------------------------------------------------------
    //-------------------------------Funcion >> Obtencion Datos--------------------------------
    //Descripcion : Obtiene los datos del Api mediante una peticion 'GET'.
    const getData = async ({ page = '1' }) => {
        try {
            let response = await character_get({ page: page });
            console.group('Datos Api >> Rick and Morty');
            console.log(response.data.info);
            //console.log(response.data.results);
            console.groupEnd();
            if (response.data.info) {
                setInfo(response.data.info);
                setData(response.data.results);
                setRender(true);
            }
        } catch (e) {
            Alert.alert('Error', e);
        }
    }
    //------------------------------Funcion >> Seleccion Item----------------------------------
    //Descripcion : Genera la navegacion a la pagina de detalles.
    const selectItem = ({ item = {} }) => {
        console.group('Item Seleccionado');
        console.log(item.name);
        console.groupEnd();
    }
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion >> Componentes---------------------------------
    //-----------------------------------------------------------------------------------------
    //-------------------------------Componente >> MyList--------------------------------------
    //Descripcion : Renderiza los datos obtenidos de la api en una lista desplazable.
    const MyList = ({ data }) => {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={MyListItem}
                initialNumToRender={20}
            />
        );
    }
    //----------------------------------Componente >> MyListItem-------------------------------
    //Descripcion : Renderiza el item de la lista.
    const MyListItem = ({ item }) => {
        const { name, image, origin, created } = item;
        return (
            <MyCardItem
                name={name}
                image_url={image}
                origin={origin}
                created={created}
                onPress={() => selectItem({ item: item })}
            />
        );
    }
    //-----------------------------------------------------------------------------------------
    //--------------------------------Declaracion >> Effects-----------------------------------
    //-----------------------------------------------------------------------------------------
    //-------------------------------Effect >> Carga Datos Api---------------------------------
    useEffect(() => {
        if (loading)
            getData({ page: page });
    }, [loading])
    //-----------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <MyWallpaper>
            <MyDrawMenuButton
                title={'Characters'}
                type={true}
                route={''}
                navigation={navigation} />
            <View style={[HomeStyles.ctnScreen]}>
                {render && <MyList data={data} />}
                {!render && <MyLoading color={colors.Blue} />}
            </View>
        </MyWallpaper>
    );
};
export default HomeScreen;


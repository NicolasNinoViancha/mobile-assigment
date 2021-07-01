//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> Home------------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, Dimensions, Alert } from 'react-native';
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
    const [loading, setLoading] = useState(false);//Estado >> Loading Data.
    const [data, setData] = useState([]);//Estado >> Datos Api.
    const [info, setInfo] = useState([]);//Estado >> Info Api.
    //-----------------------------------------------------------------------------------------
    //--------------------------------Declaracion >> Funciones---------------------------------
    //-----------------------------------------------------------------------------------------
    //-------------------------------Funcion >> Obtencion Datos--------------------------------
    //Descripcion : Obtiene los datos del Api mediante una peticion 'GET'.
    const getData = async ({ page = '1' }) => {
        try {
            let response = await character_get({ page: page });
            if (response.data.info) {
                console.log('Estoy dentro');
                let characters = response.data.results;
                if (page === '1')
                    setData(characters)
                else
                    //setData(data.concat(characters));
                    setData(prevState => [
                        ...prevState,
                        ...characters,
                    ]);
                //const newCharacters = [...currentCharacters, ...characters];
                setInfo(response.data.info);
                setRender(true);
                setLoading(false);
            }
        } catch (e) {
            Alert.alert('Error', e);
        }
    }
    //------------------------------Funcion >> Carga de datos----------------------------------
    //Descripcion : Obtiene los datos de la siguiente pagina y los adiciona a los datos actuales.
    const loadingMoreData = () => {
        setLoading(true);
        if (info.next !== null) {
            let url = info.next;
            let page = url.split('=');
            getData({ page: page[1] });
        }
    }
    //------------------------------Funcion >> Seleccion Item----------------------------------
    //Descripcion : Genera la navegacion a la pagina de detalles.
    const selectItem = ({ item = {} }) => {
        navigation.navigate('Details', { item: item });
    }
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion >> Componentes---------------------------------
    //-----------------------------------------------------------------------------------------
    //-------------------------------Componente >> MyList--------------------------------------
    //Descripcion : Renderiza los datos obtenidos de la api en una lista desplazable.
    const MyList = () => {
        return (
            <FlatList
                initialScrollIndex={0}
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={MyListItem}
                initialNumToRender={20}
                onEndReached={loadingMoreData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={MyListFooter}
            />
        );
    }
    //----------------------------------Componente >> MyListItem-------------------------------
    //Descripcion : Renderiza el item de la lista.
    const MyListItem = ({ item }) => {
        const { name, image, origin, created, id } = item;
        return (
            <MyCardItem
                key={id.toString()}
                name={name}
                image_url={image}
                origin={origin}
                created={created}
                onPress={() => selectItem({ item: item })}
            />
        );
    }
    //----------------------------------Componente >> MyListFooter-----------------------------
    //Descripcion : Renderiza el footer de la lista de personajes.
    const MyListFooter = () => {
        if (!loading)
            return null
        return (
            <View style={[HomeStyles.ctnLoading]} >
                <MyLoading color={colors.Blue} />
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //--------------------------------Declaracion >> Effects-----------------------------------
    //-----------------------------------------------------------------------------------------
    //-------------------------------Effect >> Carga Datos Api---------------------------------
    useEffect(() => {
        getData({ page: '1' });
    }, [])
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
                {render && <MyList />}
                {!render && <MyLoading color={colors.Blue} />}
            </View>
        </MyWallpaper>
    );
};
export default HomeScreen;


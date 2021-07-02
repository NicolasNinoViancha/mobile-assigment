//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> Home------------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, Alert, Animated } from 'react-native';
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
const { width, height } = Dimensions.get('window');
const ITEM_HEIGHT_SIZE = height * 0.5;
const EMPTY_ITEM_SIZE = (height - ITEM_HEIGHT_SIZE) / 2;//Tamaño >> Espacio entre items
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
const HomeScreen = props => {
    const { navigation } = props;
    //-----------------------------------------------------------------------------------------
    //-----------------------Inicializacion de variables de animacion--------------------------
    //-----------------------------------------------------------------------------------------
    const scrollY = useRef(new Animated.Value(0)).current;//Estado de desplazamiento de flatList
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
                let characters = response.data.results;
                if (page === '1')
                    setData([{ id: 'empty-left' }, ...characters, { id: 'empty-right' }]);
                else
                    //setData(data.concat(characters));
                    setData(prevState => [
                        { id: 'empty-left' },
                        ...prevState.slice(1, prevState.length - 1),
                        ...characters,
                        { id: 'empty-right' }
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
            <Animated.FlatList
                pagingEnabled
                bounces={false}
                renderToHardwareTextureAndroid
                onScroll={
                    Animated.event([{
                        nativeEvent: { contentOffset: { y: scrollY } }
                    }], { useNativeDriver: true })
                }
                scrollEventThrottle={16}
                //decelerationRate={Platform.OS === 'ios' ? 0 : 0.9}//Número de punto flotante que determina qué tan rápido se desacelera la vista de desplazamiento después de que el usuario levanta el dedo.
                snapToInterval={ITEM_HEIGHT_SIZE}//La vista de desplazamiento se detenga en múltiplos del valor de snapToInterval.
                snapToAlignment='center'//Define la relación del ajuste a la vista de desplazamiento.
                disableIntervalMomentum={true}//la vista de desplazamiento se detiene en el siguiente índice.
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) =>
                    <MyListItem item={item} index={index} scrollY={scrollY} />
                }
                initialNumToRender={20}
                onEndReached={loadingMoreData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={MyListFooter}

            />
        );
    }
    //----------------------------------Componente >> MyListItem-------------------------------
    //Descripcion : Renderiza el item de la lista.
    const MyListItem = props => {
        const { item, index, scrollY } = props;
        const { name, image, origin, created, id } = item;
        //Condicional >> Espaciados Izquierdo/Derecho de lista.
        if (id === 'empty-left' || id === 'empty-right')
            return <View style={{ height: EMPTY_ITEM_SIZE }} />
        //Especificacion de limites de desplazamiento de elementos
        //Nota : La lista de items se realiza con un efecto de enfoque que depende del valor
        //      actual del scroll (Entiendase como 'scroll' al desplazamiento vertical que
        //      realiza el usuario con el fin de visualizar los items de lista).
        //      Para lograr el efecto de enfoque se realiza el calculo de los limites de los valores
        //      de desplazamiento del elemento.
        let FirstScroll, SecondScroll, ThirtScroll;//Scroll Position
        FirstScroll = (index - 2) * ITEM_HEIGHT_SIZE;
        SecondScroll = (index - 1) * ITEM_HEIGHT_SIZE;
        ThirtScroll = (index) * ITEM_HEIGHT_SIZE;
        const inputRange = [FirstScroll, SecondScroll, ThirtScroll];
        const outputOpacity = [0.5, 1, 0.5];//Salida >> Opacidad de tarjeta.
        const outputScale = [0.8, 1, 0.8];//Salida >> Escala de tarjeta.
        const opacity = scrollY.interpolate({
            inputRange,
            outputRange: outputOpacity,
            extrapolate: 'clamp',
        });
        const scale = scrollY.interpolate({
            inputRange,
            outputRange: outputScale,
            extrapolate: 'clamp',
        });
        return (
            <MyCardItem
                name={name}
                image_url={image}
                origin={origin}
                created={created}
                scale={scale}
                opacity={opacity}
                select={() => selectItem({ item: item })}
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


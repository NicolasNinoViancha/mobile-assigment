//---------------------------------------------------------------------------------------------
//------------------------------Archivo de componente: MyDrawMenuButton------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React, { Fragment } from 'react';
import { StyleSheet, Dimensions, TouchableHighlight, Image, View, Text } from 'react-native';
//------------------------------------Librerias Adicionales------------------------------------
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//----------------------------------------Componentes------------------------------------------
import MySpace from '../components/MySpace';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { moderateScale } from '../styles/scale';
//-------------------------------------Recursos Graficos---------------------------------------
import Logo from '../assets/Logo_RickAndMorty.jpg'
//-------------------------------------Constanntes Globales------------------------------------
const { width, height } = Dimensions.get('screen');
const FONTSIZE_TEXT_TITLE = width < 350 ? moderateScale(14) : moderateScale(18);
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyDrawMenuButton = props => {
    const { title, navigation, route, type } = props;
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------Componente >> MyTitle-----------------------------------
    //Descripcion : Renderiza el titulo de seccion.
    const MyTitle = ({ title }) => {
        return (
            <Fragment>
                <MySpace ctnSpace={{ height: '100%', flex: 0.05 }} />
                <View style={[styles.ctnHeader]}>
                    <Text style={[styles.title]}>{title}</Text>
                </View>
                <MySpace ctnSpace={{ height: '100%', flex: 0.05 }} />
            </Fragment>
        );
    }
    //-------------------------------------Componente >> MyLogo--------------------------------
    //Descripcion : Renderiza el logo de header.
    const MyLogo = ({ source }) => {
        return (
            <View style={styles.ctnLogo}>
                <Image
                    resizeMode="cover"
                    style={styles.logo}
                    source={source} />
            </View>
        );
    }
    //----------------------------------Componente >> MyButtonLeft-----------------------------
    //Descripcion : Renderiza el boton izquierdo del header.
    const MyButtonLeft = ({ route, navigation }) => {
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                style={[styles.buttonDrawer]}
                onPress={() => navigation.navigate(route)}>
                <Icon
                    name={"arrow-left"}
                    size={moderateScale(25)}
                    color={colors.White} />
            </TouchableHighlight>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <View style={[styles.ctnButtonDrawer]}>
            {
                route !== '' &&
                <MyButtonLeft
                    route={route}
                    navigation={navigation} />
            }
            <MyTitle title={title} />
            {
                type === true &&
                <MyLogo source={Logo} />
            }
        </View>
    );
}
export default MyDrawMenuButton;
const styles = StyleSheet.create({
    //Estilo de contenedor de boton de menu
    ctnButtonDrawer: {
        flex: 0.08,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.Blue
    },
    //Estilo de boton de menu
    buttonDrawer: {
        flex: 0.1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo de contenedor de logo de compañia
    ctnLogo: {
        position: 'absolute',
        right: width * 0.05,
        width: height * 0.04,
        height: height * 0.04,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: colors.Black
    },
    //Estilo >> Logo
    logo: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    //Estilo de contenedor de header
    ctnHeader: {
        height: '80%',
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        //borderBottomWidth: 2,
        //borderColor: colors.Blue,
    },
    //Estilo de texto de header
    title: {
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.White,
        textAlign: 'center'
    },
})

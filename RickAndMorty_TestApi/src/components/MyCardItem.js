//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyCardVideosLike--------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      data >> Objeto de propiedades de modulo. Contiene las siguientes propiedades :
//                  >> name        >> Nombre.
//                  >> image       >> Url Imagen.
//                  >> origin      >> Objeto origen.
//                  >> created     >> Fecha Creacion.

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { Animated, StyleSheet, View, Dimensions, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { moderateScale } from '../styles/scale';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const FONTSIZE_TEXT_TITLE = width < 350 ? moderateScale(12) : moderateScale(16);
const FONTSIZE_TEXT_LABEL = width < 350 ? moderateScale(10) : moderateScale(14);
const ITEM_HEIGHT_SIZE = height * 0.5;
const ITEM_WIDTH_SIZE = width * 0.8;
const ITEM_MARGIN_HORIZONTAL = width * 0.1;
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyCardItem = (props) => {
    const { name, image_url, origin, created, onPress } = props;//Recepcion Parametros >> Tarjeta Items.
    const { scale, opacity } = props;
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion de Componentes---------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------Componnete >> Header------------------------------------
    //Descripcion : Renderiza el header de tarjeta.
    const Header = ({ name }) => {
        return (
            <View style={[styles.ctnHeader]}>
                <Text style={[styles.textTitle]}>{name}</Text>
            </View>
        );
    }
    //---------------------------------Componente >> Logo--------------------------------------
    //Descripcion : Renderiza el logo del curso.
    const Logo = ({ source }) => {
        return (
            <View style={[styles.ctnLogo]}>
                <Image
                    style={[styles.logo]}
                    source={{ uri: source, }}
                    resizeMode={'cover'} />
            </View>
        );
    }
    //---------------------------------Componente >> Detalle-----------------------------------
    //Descripcion : Renderiza un detalle de la tarjeta de item.
    const Detail = ({ label, value }) => {
        return (
            <View style={[styles.ctnDetail]}>
                <View style={[styles.ctnLabel]}>
                    <Text style={[styles.textTitle, { color: colors.Blue }]}>
                        {label}
                    </Text>
                </View>
                <View style={[styles.ctnValue]}>
                    <Text style={[styles.textLabel, { color: colors.BlueLight }]}>
                        {value}
                    </Text>
                </View>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Animated.View style={[styles.ctnItem, opacity, { transform: [scale] }]}>
            <TouchableOpacity
                style={[styles.btnEventTouche]}
                onPress={onPress} />
            <Header name={name} />
            <Logo source={image_url} />
            <Detail
                label={'Origin'}
                value={origin.name} />
            <Detail
                label={'Created'}
                value={created} />
        </Animated.View>
    );
}
export default MyCardItem;
//---------------------------------------------------------------------------------------------
//------------------------------------Estilos de Componente------------------------------------
//---------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> ctn de item
    ctnItem: {
        position: 'relative',
        width: ITEM_WIDTH_SIZE,
        height: ITEM_HEIGHT_SIZE,
        marginHorizontal: ITEM_MARGIN_HORIZONTAL,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: 10,
        backgroundColor: colors.White,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    //Estilo >> Boton de evento de touche
    btnEventTouche: {
        ...StyleSheet.absoluteFill,
        width: '100%',
        height: '100%',
        zIndex: 10
    },
    //Estilo >> Contenedor de header
    ctnHeader: {
        width: '90%',
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    //Estilo >> Texto de titulo
    textTitle: {
        color: colors.BlueDark,
        fontSize: FONTSIZE_TEXT_TITLE,
        fontWeight: '800'
    },
    //Estilo >> Texto de label
    textLabel: {
        color: colors.BlueDark,
        fontSize: FONTSIZE_TEXT_LABEL
    },
    //Estilo >> Contenedor de logo
    ctnLogo: {
        width: '90%',
        flex: 0.65,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Logo
    logo: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Conteneodor de detalle
    ctnDetail: {
        width: '90%',
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    //Estilo >> Contenedor de label
    ctnLabel: {
        height: '100%',
        flex: 0.3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    //Estilo >> Contenedor de value
    ctnValue: {
        height: '100%',
        flex: 0.7,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: '10%',
    },
})

//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> Home------------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React from 'react';
import { View } from 'react-native';
//-----------------------------------------Componentes-----------------------------------------
import MyWallpaper from '../components/MyWallpaper';
import MyDrawMenuButton from '../components/MyDrawMenuButton';
import MyCardCharacter from '../components/MyCardCharacter';
//-------------------------------------------Estilos-------------------------------------------
import { DetailsStyles } from '../styles/styles';
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
const DetailsScreen = props => {
    const { navigation, route } = props;
    const { item } = route.params;
    //-----------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <MyWallpaper>
            <MyDrawMenuButton
                title={'Details Characters'}
                route={'Home'}
                type={true}
                navigation={navigation} />
            <View style={[DetailsStyles.ctnScreen]}>
                <MyCardCharacter details={item} />
            </View>
        </MyWallpaper>
    );
};
export default DetailsScreen;


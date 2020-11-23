import React from 'react';
import {View, Button, StyleSheet, Text, PermissionsAndroid, Alert, TouchableOpacity} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import Styled from 'styled-components/native';

const Container = Styled.View`
    flex : 1;
    background-color : #141414;
    justify-content: center;
    align-items: center;
`;

interface Props {
    navigation : NavigationScreenProp<NavigationState>;
}

const FirstView = ({navigation} : Props) => {

    const ClickBtn = (index : number) => {
        console.log(index);
        if(index == 0){
            navigation.navigate('TranslateNavigator');
        }
        else if(index == 1){
            requestExternalWrite();
            reqeustCameraPermission();
        }
        else if(index == 2){
            navigation.navigate('DictionaryViewNavigator');
        }
        else if(index == 3){
            //requestCorasePosition();
            //requestFinePosition();
            navigation.navigate('WeatherViewNavigator');
        }
    }

    //카메라 권한을 획득할려는 함수
    async function reqeustCameraPermission(){
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

        if(granted === PermissionsAndroid.RESULTS.GRANTED){
            navigation.navigate("TranslateImageViewNavigator");
        }
        else{
            Alert.alert('카메라 권한이 거부 되었습니다.');
            navigation.navigate("FirstView");
        }
    }

    //외부 저장소 권한 획득 함수
    async function requestExternalWrite(){
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

        if(granted === PermissionsAndroid.RESULTS.GRANTED){
            console.log("외부 저장소 권환 획득!")
        }
        else{
            Alert.alert('외부 저장소 권한이 거부 되었습니다.');
            navigation.navigate("FirstView");
        }
    }

    //위치 정보 가져오기
    async function requestCorasePosition(){
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_CORASE_LOCATION);

        if(granted === PermissionsAndroid.RESULTS.GRANTED){
            console.log("Corase Position 획득!")
        }
        else{
            Alert.alert('외부 저장소 권한이 거부 되었습니다.');
        }
    }

    async function requestFinePosition(){
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

        if(granted === PermissionsAndroid.RESULTS.GRANTED){
            console.log("FinePosition 획득!")
            navigation.navigate('WeatherViewNavigator');
        }
        else{
            Alert.alert('외부 저장소 권한이 거부 되었습니다.');
        }
    }

    return(
        <Container>
            <Text style={styles.title}>잡다한 어플</Text>
            <TouchableOpacity style={styles.button} onPress={() => ClickBtn(0)}>
                <Text>번역기(타이핑)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => ClickBtn(1)}>
                <Text>번역기(이미지)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => ClickBtn(2)}>
                <Text>사전</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => ClickBtn(3)}>
                <Text>날씨</Text>
            </TouchableOpacity>
        </Container>
    )
}

const styles = StyleSheet.create({
    title : {
        width : '100%',
        height : '70%',
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#F5FCFF',
        fontSize : 30,
    },
    button:{
        width : '100%',
        alignItems: "center",
        backgroundColor: "#DDFDDF",
        padding: 10
    },
})

export default FirstView;

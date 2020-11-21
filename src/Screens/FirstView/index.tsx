import React from 'react';
import {View, Button, StyleSheet, Text, PermissionsAndroid, Alert} from 'react-native';
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

    return(
        <Container>
            <Text style={styles.title}>잡다한 어플</Text>
            <Button title="번역기" onPress={() => ClickBtn(0)}/>
            <Button title="번역기(이미지)" onPress={() => ClickBtn(1)}/>
            <Button title="날씨" onPress={() => ClickBtn(2)}/>
        </Container>
    )
}

const styles = StyleSheet.create({
    title : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#F5FCFF',
        fontSize : 30,
    }
})

export default FirstView;

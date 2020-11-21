import React, { useEffect, useState } from 'react';
import {StyleSheet, Button, View} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {RNCamera} from 'react-native-camera';
import * as RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import base64 from 'base-64';

interface Props{
    navigation : NavigationScreenProp<NavigationState>;
}

const TranslateImageView = ({navigation} : Props) => {

    const cameraRef = React.useRef(null);
    const takePhoto = () => {
        const takePicture = async() => {
            if(cameraRef){
                const data = await cameraRef.current.takePictureAsync({
                    quality:1,
                    exif: true,
                });
                RNFS.readFile(data['uri'], 'ascii').then(imagedata => {
                      const imgdata = base64.encode(imagedata)
                      console.log(imgdata.length);
                      console.log(typeof(imgdata))
                      response(imgdata);
                }
                )
                .catch(err => {
                    console.log(err.message);
                });
            }
        }
        takePicture();
    }

    async function response(imagedata : string) {
        await RNFetchBlob.fetch('POST', 'http://192.168.219.102:50000/translate', {
        'Content-Type' : 'multipart/form-data',
        },[
            {name : 'file', type : 'image/*', data : imagedata}
        ]).then(res => {
            if(res.data != "None"){
                console.log('res : ', res.data)
                navigation.navigate("TranslatedViewNavigator", {
                    'translated_text' : res.data,
                });
            } 
        }
        )
        .catch(err => {
            console.log(err);
        })
    }
    
    return(
        <>
        <RNCamera
            style={styles.camera}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
            ref={cameraRef}
        />
        <View style={styles.for_button}>
        <Button 
            title="사진 찍기"
            onPress = {takePhoto}
        />
        <Button 
            title="되돌아가기"
            onPress = {() => {navigation.navigate("FirstView")}}
        />
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    camera:{
        width : '100%',
        height : '80%'
    },
    for_button:{
        width : '100%',
        height : '20%',
        justifyContent : 'center',
    }
})

export default TranslateImageView;
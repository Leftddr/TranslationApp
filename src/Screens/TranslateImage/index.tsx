import React, { useEffect, useState } from 'react';
import {StyleSheet, Button, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import * as RNFS from 'react-native-fs';

interface Props{}

const TranslateImageView = ({ } : Props) => {

    const cameraRef = React.useRef(null);
    const takePhoto = () => {
        const takePicture = async() => {
            if(cameraRef){
                const data = await cameraRef.current.takePictureAsync({
                    quality:1,
                    exif: true,
                });
                RNFS.readFile(data['uri'], 'ascii').then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err.message);
                });
            }
        }
        takePicture();
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
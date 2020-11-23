import React, { useEffect, useState } from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {RNCamera} from 'react-native-camera';
import * as RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import base64 from 'base-64';
import Styled from 'styled-components/native';

const LoadingView = Styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const Loading = Styled.ActivityIndicator`
    margin-bottom: 16px;
`;
const LoadingLabel = Styled.Text`
  font-size: 16px;
`;

interface Props{
    navigation : NavigationScreenProp<NavigationState>;
}

interface need{
    Loading ?: boolean;
}

const TranslateImageView = ({navigation} : Props) => {
    const [need, setNeed] = useState<need>({
        Loading : false
    }
    )

    const cameraRef = React.useRef(null);
    const takePhoto = () => {
        const takePicture = async() => {
            if(cameraRef){
                const data = await cameraRef.current.takePictureAsync({
                    quality:1,
                    exif: true,
                });
                setNeed({
                    Loading : true,
                })
                RNFS.readFile(data['uri'], 'ascii').then(imagedata => {
                      const imgdata = base64.encode(imagedata)
                      setNeed({
                          Loading : true,
                      })
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
        await RNFetchBlob.fetch('POST', 'http://192.168.219.100:50000/translate', {
        'Content-Type' : 'multipart/form-data',
        },[
            {name : 'file', type : 'image/*', data : imagedata}
        ]).then(res => {
            console.log('res : ', res.data)
            setNeed({
                Loading : false,
            })
            if(res.data != "None"){
                navigation.navigate("TranslatedView", {
                        'translated_text' : res.data,
                });
            }
            else{
                navigation.navigate("TranslatedView", {
                    'translated_text' : 'I cannot translate this sentence!',
                })
            }
        }
        )
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        
    }, [need.Loading]);

    
    if(need.Loading){
        return(
            <LoadingView>
                <Loading size="large" color="#1976D2" />
                <LoadingLabel>Loading...</LoadingLabel>
            </LoadingView>
        )
    }
    else{
        return(
            <>
            <RNCamera
                style={styles.camera}
                type={RNCamera.Constants.Type.back}
                captureAudio={false}
                ref={cameraRef}
            />
            <View style={styles.for_button}>
            <View style={styles.blank}></View>
            <Button 
                title="사진 찍기"
                onPress = {takePhoto}
            />
            <View style={styles.blank}></View>
            <Button 
                title="되돌아가기"
                onPress = {() => {navigation.navigate("FirstView")}}
            />
            </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    camera:{
        width : '100%',
        height : '70%'
    },
    for_button:{
        width : '100%',
        height : '10%',
    },
    blank:{
        height:'20%'
    },
    loading : {
        width:'100%',
        height : '100%',
        fontSize : 30,
        alignItems : 'center',
        justifyContent : 'center',
    }
})

export default TranslateImageView;
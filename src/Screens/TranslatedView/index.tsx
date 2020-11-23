import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

interface Props{
    navigation : NavigationScreenProp<NavigationState>;
}

const TranslatedView = ({navigation} : Props) => {

    const translated_text = navigation.getParam("translated_text", "I cannot Translate this sentence! Sorry!");
    const movePage = () => {
        navigation.navigate("TranslateImageView");
    }

    return(
        <>
        <View style={styles.view}>
            <Text style={styles.text}>{translated_text}</Text>
            <View style={styles.blank}></View>
            <Button title="캡처하기" onPress={movePage}/>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    view : {
        height : '100%',
        width : '100%',
    },
    text : {
        borderWidth : 3,
        borderColor : 'green',
        height : '80%',
        width : '100%',
        alignItems : 'center',
        justifyContent : 'center',
        fontSize : 20,
    },
    button : {
        width : '100%',
    },
    blank : {
        height : '10%',
    }
})

export default TranslatedView;
import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';

interface Props{
    navigation : NavigationScreenProp<NavigationState>;
}

const TranslatedView = ({navigation} : Props) => {

    const translated_text = navigation.getParam("translated_text");
    const movePage = () => {
        navigation.navigate("TranslateImageNavigator");
    }

    return(
        <>
        <View style={styles.view}>
            <Text style={styles.text}>{translated_text}</Text>
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
        heigth : '80%',
        width : '100%',
        alignItems : 'center',
        justifyContent : 'center',
    },
    button : {
        width : '100%',
    }
})
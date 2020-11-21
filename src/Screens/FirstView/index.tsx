import React from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
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
            navigation.navigate('WeatherViewNavigator');
        }
    }

    return(
        <Container>
            <Text style={styles.title}>잡다한 어플</Text>
            <Button title="번역기" onPress={() => ClickBtn(0)}/>
            <Button title="날씨" onPress={() => ClickBtn(1)}/>
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

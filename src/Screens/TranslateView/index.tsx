import React, {useEffect, useState} from 'react';
import {FlatList, Alert, StyleSheet, TextInput, Text} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import Styled from 'styled-components/native';
import { resolvePlugin } from '@babel/core';
import styled from 'styled-components';

const Container = Styled.SafeAreaView`
    flex: 1;
    background-color : #EEE;
`;

const TranslateContainer = Styled(FlatList)``;

const LoadingView = Styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
`;

const Loading = Styled.ActivityIndicator`
    margin-bottom: 16px;
`;

const LoadingLabel = Styled.Text`
    font-size : 16px;
`;

const TranslateItemContainer = Styled.View`
    height:100%;
    justify-content: center;
    align-items: center;
`;

const Translate = Styled.Text`
    margin-bottom : 16px;
    font-size: 24px;
    font-weight: bold;
`;

const Translated = Styled.Text`
    font-size : 16px;
`;

interface Props {}

const API_KEY = "af35956434233a16d98f0c2170840ca3";

interface ITranslate {
    before_translate ?: string;
    after_translate ?: string;
    src ?: string;
    isLoading : boolean;
}

const TranslateView = ({ } : Props) => {
    const [translateInfo, setTranslateInfo] = useState<ITranslate>({
        before_translate : "",
        after_translate: "",
        src : "",
        isLoading: false,
    });

    const getTranslated = (originalText : string) => {
        setTranslateInfo({
            ...translateInfo,
            before_translate : originalText,
            isLoading : false,
        });
        fetch('https://dapi.kakao.com/v3/translation/language/detect', {
            method : 'POST',
            headers : {'Authorization' : 'KakaoAK ' + API_KEY, 'Content-type' : 'application/x-www-form-urlencoded'},
            body : 'query=' + encodeURIComponent(originalText),
        })
        .then(res => res.json())
        .then(response => {
            setTranslateInfo({
              ...translateInfo,
                src : response["language_info"][0]["code"],
                isLoading : true,
            });

            let target_lang = "";
            if(translateInfo.src == "kr") target_lang = "en";
            else target_lang = "kr";

            console.log("src = " + translateInfo.src);
            console.log("target = " + target_lang);
            console.log("before : " + translateInfo.before_translate);
            fetch('https://dapi.kakao.com/v2/translation/translate',
            {
                method : 'POST',
                headers : {'Authorization' : 'KakaoAK ' + API_KEY, 'Content-type' : 'application/x-www-form-urlencoded'},
                body : 'src_lang=' + translateInfo.src + '&target_lang=' + target_lang + '&query=' + encodeURIComponent(originalText),
            })
            .then(res => res.json())
            .then(response => {
                setTranslateInfo({
                    ...translateInfo,
                    after_translate : response.translated_text,
                    isLoading : false,
                });
            })
            .catch(
                error => console.log(error)
            )
        })
        .catch(
            error => console.log(error)
        )
    };

    /*
    useEffect(() => {
        getTranslated();
    }, []);
    */
    /*
    const setValue = (originalText : string) => {
        setTranslateInfo({
            before_translate : originalText,
            isLoading : true,
        });
    }
    */

    const {isLoading, before_translate, after_translate} = translateInfo;
    return(
        <Container>
            <TextInput multiline={true} numberOfLines={4} style={style.TextInput2} onChangeText={value => getTranslated(value)}></TextInput>
            <Text style={style.plainText}>{translateInfo.after_translate}</Text>
        </Container>
    );

        /*
    <LoadingView>
        <Loading size = "large" color = "#1976D2"/>
        <LoadingLabel>Loading...</LoadingLabel>
    </LoadingView>
    */
};

const style = StyleSheet.create({
    root:{
        flex:1,
        padding:16,
    },
    TextInput:{
        borderWidth:2,
        backgroundColor:'white',
        borderColor:'green',
        borderRadius:8,
        paddingLeft:16,
        paddingRight:16,
        height:40,
    },
    plainText:{
        marginTop:16,
        fontWeight:'bold',
        paddingLeft:10,
        paddingRight:10,
    },
    TextInput2:{
        marginTop: 16,
        borderWidth:2,
        borderColor:'blue',
        borderRadius: 8,
        padding:16,

        maxHeight:150,
    },
});


export default TranslateView;
import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet, TextInput, FlatList, TouchableOpacity, Text} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import Styled from 'styled-components/native';

interface Props{
    navigation : NavigationScreenProp<NavigationState>;
}

interface IDictionary{
    data ?: Array<string>,
    isLoading : boolean
}

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #EEE;
`;

const DictionaryContainer = Styled(FlatList)``;

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

const DictionaryItemContainer = Styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Description = Styled.Text`
  margin-bottom: 16px;
  font-size: 12px;
  font-weight: bold;
`;

const client_id = '9dkkqRK1xJd5tmEjtPx0'
const client_secret = 'cP6Gq_uRNT'
const search_url = 'https://openapi.naver.com/v1/search/encyc.json'

const DictionaryView = ({navigation} : Props) => {
    const [dictionary, setDictionary] = useState<IDictionary>({
        data : [],
        isLoading : false,
    });

    const searchWord = (event : Object) => {
        let word = event.nativeEvent.text;
        let url = search_url + '?query=' + encodeURIComponent(word) + '&display=10&start=1&sort=sim';
        setDictionary({
            isLoading : false,
        });
        fetch(url, {
            method : 'GET',
            headers : {'X-Naver-Client-Id' : client_id, 'X-Naver-Client-Secret' : client_secret}
        })
        .then(res => res.json())
        .then((res) => {
            const arr : Array<string> = [];
            for(let i = 0 ; i < res.items.length ; i++)
                arr.push(res.items[i].description);

            setDictionary({
                data : arr,
                isLoading : false,
            });
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {

    }, [])

    return(
        <>
        <TextInput multiline={false} numberOfLines={1} style={styles.TextInput} onSubmitEditing={event => searchWord(event)} placeholder={'검색할 단어를 입력하세요'}></TextInput>
        <Container>
            <DictionaryContainer
               refreshing={dictionary.isLoading}
               data={dictionary.data}
               keyExtractor={(item, index)=>{
                   return `Dictionary-${index}`
               }}
               ListEmptyComponent={
                   <LoadingView>
                       <Loading size="large" color="#1976D2"/>
                       <LoadingLabel>Loading...</LoadingLabel>
                   </LoadingView>
               }
               renderItem={({item, index}) => (
                   <DictionaryItemContainer>
                       <Description>{item}</Description>
                   </DictionaryItemContainer>
               )}
               contentContainerStyle={{ flex: 1 }} 
            />
        </Container>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FirstView')}>
          <Text>되돌아가기</Text>
        </TouchableOpacity>
        </>
    )
}


const styles = StyleSheet.create({
    TextInput : {
        width : '100%',
        height : '20%',
        alignItems : 'center',
        justifyContent : 'center',
        fontSize : 20,
        borderWidth : 3,
        borderColor : 'green',
    },
    button:{
        width : '100%',
        alignItems: "center",
        backgroundColor: "#DDFDDF",
        padding: 10
    },
})

export default DictionaryView;
import React from 'react';
import Styled from 'styled-components/native';
import { StatusBar } from 'react-native';
import Navigator from '~/Screens/Navigator';

const Container = Styled.View`
  flex: 1;
  background-color: #EEE;
`;

interface Props {}

const App = ({  }: Props) => {
  return (
    <>
    <Navigator>
    <StatusBar barStyle="light-content" />
    </Navigator>
    </>
  );
};

export default App;

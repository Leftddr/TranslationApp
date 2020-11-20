import React from 'react';
import Styled from 'styled-components/native';

import TranslateView from '~/Screens/TranslateView';

const Container = Styled.View`
  flex: 1;
  background-color: #EEE;
`;

interface Props {}

const App = ({  }: Props) => {
  return (
    <Container>
      <TranslateView />
    </Container>
  );
};

export default App;

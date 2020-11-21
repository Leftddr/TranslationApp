import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import TranslateView from '~/Screens/TranslateView';
import WeatherView from '~/Screens/WeatherView';
import TranslateImageView from '~/Screens/TranslateImage';
import FirstView from '~/Screens/FirstView';

//화면 이동을 위한 navigator를 만든다.
const TranslateNavigator = createStackNavigator({
    TranslateView,
});

const WeatherViewNavigator = createStackNavigator({
    WeatherView,
});

const TranslateImageViewNavigator = createStackNavigator({
    TranslateImageView,
});

const AppNavigator = createSwitchNavigator(
    {
        FirstView,
        TranslateNavigator,
        WeatherViewNavigator,
        TranslateImageViewNavigator,
    },
    {
        initialRouteName: 'FirstView',
    }
);

export default createAppContainer(AppNavigator);
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScanScreen from './ScanScreen';
import DefaultBasketScreen from './DefaultBasketScreen';
import SessionSummaryScreen from './SessionSummaryScreen';
import InSessionScreen from './InSessionScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ConnectToBasketScreen">
      <Stack.Screen name="ConnectToBasketScreen" component={ScanScreen} options={{ title: 'Scan QR Code' }}/>
        {/* <Stack.Screen name="Scan" component={ScanScreen} options={{ title: 'Scan QR Code' }} /> */}
        <Stack.Screen name="DefaultBasket" component={DefaultBasketScreen} options={{ title: 'Default Basket' }} />
        <Stack.Screen name="InSession" component={InSessionScreen} />
        <Stack.Screen name="SessionSummary" component={SessionSummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

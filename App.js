// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import HomeScreen from './src/pages/Home';
import InAppWebScreen from './src/pages/InAppWeb';

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Send" component={InAppWebScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

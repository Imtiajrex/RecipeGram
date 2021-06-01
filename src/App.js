import React from 'react';
import {Text, View} from 'react-native';
import ThemeProvider from './contexts/Theme';
import HomeScreen from './screens/HomeScreen';
import MainStack from './stacks/MainStack';
const App = () => {
  return (
    <View style={{flex: 1}}>
      <ThemeProvider>
        <MainStack />
      </ThemeProvider>
    </View>
  );
};

export default App;

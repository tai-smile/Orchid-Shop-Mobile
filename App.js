import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import TabNavigations from './components/Navigations/TabNavigations';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'outfit': require('./font/static/Outfit-Regular.ttf'),
    'outfit-medium': require('./font/static/Outfit-Medium.ttf'),
    'outfit-bold': require('./font/static/Outfit-Bold.ttf'),
  });
  return (

    <View style={styles.container}>
      <NavigationContainer>
        <TabNavigations />
      </NavigationContainer>

      {/* <MenuItems /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  footerContainer: { backgroundColor: '#333333' },
});

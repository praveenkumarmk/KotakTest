/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import LoginScreen from './src/Login/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/Product/HomeScreen';
import productDetail from './src/Product/ProductDetail';
import CartProductDetail from './src/Product/CartProductDetail'

const Stack = createNativeStackNavigator();

function App(props) {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = {props.initialPage}>
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="home" component={HomeScreen} options={{ title: 'Home' }}/>
        <Stack.Screen name="productDetail" component={productDetail} options={{ title: 'Product Detail' }}/>
        <Stack.Screen name="cartProductDetail" component={CartProductDetail} options={{ title: 'Cart' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

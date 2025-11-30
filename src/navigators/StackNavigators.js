import React from 'react';
import { Image } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BookDetail from '../screens/BookDetail';
import FavoritesScreen from '../screens/FavoritesScreen';
import Home from '../screens/Home';
import Information from '../screens/Information';
import SearchResult from '../screens/SearchResult';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home}
        options={{ animationEnabled: false, header: () => null }} />
      <Stack.Screen name="Detail" component={BookDetail}
        options={{ animationEnabled: true, header: () => null }} />
      <Stack.Screen name="SearchResult" component={SearchResult}
        options={{ animationEnabled: true, header: () => null }} />
      <Stack.Screen name="BookDetail" component={BookDetail}
        options={{ animationEnabled: true, header: () => null }} />
    </Stack.Navigator>
  );
}
const FavoritesStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorites" component={FavoritesScreen} options={{
        animationEnabled: true,
        header: () => null
      }} />
      <Stack.Screen name="BookDetail" component={BookDetail} options={{
        animationEnabled: true,
        header: () => null
      }} />
    </Stack.Navigator>
  );
}

const AppNavigators = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Trang chủ" component={HomeStackNavigator} options={{
        tabBarIcon: () => (
          <Image
            source={require('../assets/images/home.png')}
            style={{ width: 20, height: 20 }}>
          </Image>
        )
      }} />
      <Tab.Screen name="Yêu Thích" component={FavoritesStackNavigator}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../assets/images/like.png')}
              style={{ width: 20, height: 20 }}>
            </Image>
          )
        }} /> 
      <Tab.Screen name="Giới Thiệu" component={Information}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../assets/images/infor.png')}
              style={{ width: 20, height: 20 }}>
            </Image>
          )
        }} />
        
    </Tab.Navigator>
  );
}
export default AppNavigators;
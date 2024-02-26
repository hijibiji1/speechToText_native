import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Record from '../containers/Record';
import RecordList from '../containers/RecordList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {themeColors} from '../theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  const menuIcons = (route, focused) => {
    let icon;

    if (route.name === 'Record') {
      icon = focused ? (
        <Icon name="record-rec" size={35} color={themeColors.bgLight} />
      ) : (
        <Icon name="record-rec" size={35} strokeWidth={2} color="black" />
      );
    } else if (route.name === 'RecordList') {
      icon = focused ? (
        <Icon name="record-circle" size={26} color={themeColors.bgLight} />
      ) : (
        <Icon name="record-circle" size={26} strokeWidth={2} color="black" />
      );
    }
    return <View>{icon}</View>;
  };

  const CustomTabButton = ({children, onPress}) => {
    return (
      <Pressable onPress={onPress}>
        <View>{children}</View>
      </Pressable>
    );
  };

  const BottomBar = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => menuIcons(route, focused),
          tabBarLabelStyle: {fontSize: 14},
        })}>
        <Tab.Screen name="Record" component={Record} />
        <Tab.Screen name="RecordList" component={RecordList} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={props => ({
          contentStyle: {backgroundColor: 'white'},
          // header: () => <NavHeader props={props} />,
        })}>
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={BottomBar}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;

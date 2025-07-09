// AuthNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { strings } from '../utils/strings';
import { colors } from '../utils/colors';
import { screens } from '../utils/screens';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens['LOGIN_SCREEN']}
        component={LoginScreen}
        options={getHeaderOptions(screens['LOGIN_SCREEN'])}
      />
      <Stack.Screen
        name={screens['SIGNUP_SCREEN']}
        component={SignUpScreen}
        options={getHeaderOptions(screens['SIGNUP_SCREEN'])}
      />
    </Stack.Navigator>
  );
};

const getHeaderOptions = title => ({
  title,
  headerStyle: {
    backgroundColor: colors.rootColor,
  },
  headerTitleStyle: {
    color: colors.white,
    fontSize: 20,
  },
  headerTintColor: colors.white,
  headerBackTitleVisible: false,
});

export default AuthNavigator;

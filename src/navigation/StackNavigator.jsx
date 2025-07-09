import { Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/WelcomeScreen';
import AddTask from '../screens/AddTaskScreen';
import ViewTask from '../screens/ViewTaskScreen';
import { strings } from '../utils/strings';
import { colors } from '../utils/colors';
import { screens } from '../utils/screens';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
      Alert.alert(
            "Log out",
            "You will be logged out of your account.",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Log Out",
                style: "destructive",
                onPress: async () => {
                  dispatch(logout())
                }
              },
            ]
          )
    }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens['WELCOME_SCREEN']}
        component={Welcome}
        options={{
          ...getHeaderOptions(screens['WELCOME_SCREEN']),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => handleLogout()}
              style={{ marginRight: 16 }}
            >
              <Icon name="sign-out" size={20} color={colors.white} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name={screens['ADD_TASK_SCREEN']}
        component={AddTask}
        options={getHeaderOptions(screens['ADD_TASK_SCREEN'])}
      />
      <Stack.Screen
        name={screens['VIEW_TASK_SCREEN']}
        component={ViewTask}
        options={getHeaderOptions(screens['VIEW_TASK_SCREEN'])}
      />
    </Stack.Navigator>
  );
};

const getHeaderOptions = title => ({
  title,
  headerStyle: {
    backgroundColor: colors['rootColor'],
  },
  headerTitleStyle: {
    color: colors['white'],
    fontSize: 20,
  },
  headerBackTitle: strings['back'],
  headerBackTitleStyle: {
    color: colors['white'],
  },
  headerTintColor: colors['white'],
});

export default StackNavigator;

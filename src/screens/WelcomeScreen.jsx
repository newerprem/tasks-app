import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../utils/colors';
import { screens } from '../utils/screens';
import { strings } from '../utils/strings';

export default function WelcomeScreen({ navigation }) {
  const navigateToAddTask = () => {
    navigation.navigate(screens["ADD_TASK_SCREEN"]);
  };
  const navigateToViewTask = () => {
    navigation.navigate(screens["VIEW_TASK_SCREEN"]);
  };
  return (
    <View style={styles.container}>
      <PrimaryButton text={strings["addTask"]} onPress={navigateToAddTask} />
      <PrimaryButton text={strings["viewTask"]} onPress={navigateToViewTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["backgroundColor"],
    justifyContent: 'center',
    alignItems: "center"
  },
});

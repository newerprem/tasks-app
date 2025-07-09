import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import PrimaryButton from '../components/PrimaryButton';
import { addAsync } from '../utils/localStorage';
import { colors } from '../utils/colors';
import { strings } from '../utils/strings';
import { useSelector } from 'react-redux';

export default function AddTaskScreen() {
  const [task, setTask] = useState('');
  const onTaskChange = text => setTask(text);
  const contactNumber = useSelector(state => state.auth.contactNumber);

  const handleAddTask = async () => {
    const success = await addAsync(task, contactNumber);
    if (success) {
      setTask('');
    }
  };

  return (
    <View style={styles.root}>
      <TextInput
        value={task}
        style={styles.textInput}
        onChangeText={onTaskChange}
      />
      <PrimaryButton
        text={strings['addTask']}
        width={'40%'}
        onPress={() => {
          handleAddTask(task);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors['backgroundColor'],
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors['black'],
    width: '90%',
    height: 50,
    borderRadius: 30,
    marginBottom: 20,
    paddingLeft: 8,
  },
});

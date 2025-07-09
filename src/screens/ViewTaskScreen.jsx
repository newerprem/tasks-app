import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Touchable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { getAsync, removeTask } from '../utils/localStorage';
import { colors } from '../utils/colors';
import { useSelector } from 'react-redux';

export default function ViewTaskScreen() {
  const [tasks, setTasks] = useState([]);
  const contactNumber = useSelector(state => state.auth.contactNumber);

  const fetchTasks = async () => {
    const parsed = await getAsync(contactNumber);
    setTasks(parsed);
  };

  const deleteTasks = async index => {
    Alert.alert(
      (title = 'Delete task'),
      (message = 'This task will be deleted.'),
      (buttons = [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedTasks = await removeTask(index, contactNumber);
            setTasks(updatedTasks);
          },
        },
      ]),
    );
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={styles.root}>
      <FlatList
        inverted={true}
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => deleteTasks(index)}>
            <View style={styles.taskBox}>
              <Text style={styles.taskText}>• {item}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: colors['rootColor'],
    paddingTop: 24,
    paddingHorizontal: 16,
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
  flatList: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    width: '50%',
  },
  taskText: {
    fontSize: 20,
    color: colors['white'],
  },
  taskBox: {
    borderBottomWidth: 1,
    borderBottomColor: colors['borderBottomColor'],
    paddingVertical: 8,
  },
});

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Save a task for a specific user
export const addAsync = async (task, contactNumber) => {
  if (task.trim() === '') {
    Alert.alert('Alert', 'Task cannot be empty');
    return false;
  }

  try {
    const key = `tasks_${contactNumber}`;
    const existingTasks = await AsyncStorage.getItem(key);
    const tasks = existingTasks ? JSON.parse(existingTasks) : [];

    const updatedTasks = [...tasks, task]; // or [task, ...tasks] if you want reverse order
    await AsyncStorage.setItem(key, JSON.stringify(updatedTasks));

    return true;
  } catch (error) {
    console.error('Error saving task:', error);
    return false;
  }
};

// Get tasks for a specific user
export const getAsync = async (contactNumber) => {
  try {
    const key = `tasks_${contactNumber}`;
    const tasks = await AsyncStorage.getItem(key);
    const parsed = tasks ? JSON.parse(tasks) : [];
    return parsed;
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

// Remove a task by index for a specific user
export const removeTask = async (taskIndex, contactNumber) => {
  try {
    const key = `tasks_${contactNumber}`;
    const tasks = await AsyncStorage.getItem(key);
    const parsedTasks = tasks ? JSON.parse(tasks) : [];

    const updatedTasks = parsedTasks.filter((_, index) => index !== taskIndex);
    await AsyncStorage.setItem(key, JSON.stringify(updatedTasks));
    return updatedTasks;
  } catch (error) {
    return [];
  }
};

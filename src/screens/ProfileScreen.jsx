import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { useReducer, useState } from 'react';
import { colors } from '../utils/colors';
import PrimaryButton from '../components/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { updateDetails } from '../redux/authSlice';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const stateName = useSelector(state => state.auth.name);
  const stateEmail = useSelector(state => state.auth.email);
  const [name, setName] = useState(stateName || '');
  const [email, setEmail] = useState(stateEmail || '');
  const contactNumber = useSelector(state => state.auth.contactNumber);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={contactNumber} editable={false} />
      <TextInput
        style={styles.input}
        placeholder="Update Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Update Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <PrimaryButton
        text="Update Details"
        onPress={() => {
          dispatch(updateDetails({ name, email }));
          navigation.pop();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  passwordContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  inputWithIcon: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
});

export default ProfileScreen;

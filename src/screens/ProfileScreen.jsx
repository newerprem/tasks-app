import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useReducer, useState } from 'react';
import { colors } from '../utils/colors';
import PrimaryButton from '../components/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfilePic, updateDetails } from '../redux/authSlice';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

const ProfileScreen = () => {
  const stateName = useSelector(state => state.auth.name);
  const stateEmail = useSelector(state => state.auth.email);
  const stateProfile = useSelector(state => state.auth.profilePic);
  const [name, setName] = useState(stateName || '');
  const [email, setEmail] = useState(stateEmail || '');
  const [uri, setUri] = useState(stateProfile || '');
  const contactNumber = useSelector(state => state.auth.contactNumber);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log(stateProfile)

  const imagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setUri(image.path);
      dispatch(changeProfilePic({ profilePic: image.path }));
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          imagePicker();
        }}
      >
        <Image
          source={uri ? { uri } : require('../assets/person.png')}
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={contactNumber}
          editable={false}
        />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    justifyContent: 'center',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: '50%',
    resizeMode: 'cover', // or 'cover', 'stretch', 'center'
    marginVertical: 36,
  },
  inputContainer: {
    width: '96%',
    flex: 1
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

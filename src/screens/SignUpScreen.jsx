import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount, clearErrors } from '../redux/authSlice';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';
import { strings } from '../utils/strings';
import { screens } from '../utils/screens';
import { isPasswordValid } from '../utils/validators';
import Icon from 'react-native-vector-icons/FontAwesome';
import PrimaryButton from '../components/PrimaryButton';

export default function SignUpScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { accountAlreadyExist } = useSelector(state => state.auth);

  const handleSignUp = () => {
    if (!isPasswordValid(password)) {
      return alert("Password must be 8+ characters, include 1 number and 1 special character");
    }
    dispatch(createAccount({ contactNumber, password }));
  };

  useEffect(() => {
    if (accountAlreadyExist) {
      alert("Account already exists.");
    }
  }, [accountAlreadyExist]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Contact Number"
        style={styles.input}
        keyboardType="phone-pad"
        value={contactNumber}
        onChangeText={setContactNumber}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          style={styles.inputWithIcon}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
          <Icon
            name={showPassword ? 'eye-slash' : 'eye'}
            size={20}
            color={colors.rootColor}
          />
        </TouchableOpacity>
      </View>

      <PrimaryButton text={strings["SIGN_UP"]} onPress={handleSignUp} />

      <PrimaryButton
        text={strings["ALREADY_HAVE_AN_ACCOUNT"]}
        onPress={() => {
          dispatch(clearErrors());
          navigation.replace(screens["LOGIN_SCREEN"]);
        }}
        backgroundColor={colors.white}
        fontColor={colors.rootColor}
      />
    </View>
  );
}


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
  errorText: {
    color: 'red',
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

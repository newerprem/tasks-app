import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors } from '../redux/authSlice';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';
import { strings } from '../utils/strings';
import { screens } from '../utils/screens';
import Icon from 'react-native-vector-icons/FontAwesome';
import PrimaryButton from '../components/PrimaryButton';

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { loginError } = useSelector(state => state.auth);

  const handleLogin = () => {
    if(contactNumber.length>=10) {
        dispatch(login({ contactNumber, password }));
    } else {
        Alert.alert("Phone number must be exactly 10 digits.")
    }
  };

  useEffect(() => {
    if (loginError) {
      Alert.alert("Invalid contact number or password.");
    }
  }, [loginError]);

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

      <PrimaryButton text={strings["LOGIN"]} onPress={handleLogin} />

      <PrimaryButton
        text={strings["DO_NOT_HAVE_AN_ACCOUNT"]}
        onPress={() => {
          dispatch(clearErrors());
          navigation.replace(screens["SIGNUP_SCREEN"]);
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
});

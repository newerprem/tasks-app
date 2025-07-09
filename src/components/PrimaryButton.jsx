import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';

export default function PrimaryButton({
  text,
  onPress,
  backgroundColor,
  fontColor,
  width
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor || colors["rootColor"], width: width || "90%"}]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: fontColor || colors["white"] }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors["backgroundColor"],
  },
  text: {
    color: colors["white"],
    fontSize: 18,
  },
  button: {
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 12,
    height: 48,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

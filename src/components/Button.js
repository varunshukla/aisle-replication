import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';

const Button = props => {
  const {onPress, text, style} = props;
  return (
    <TouchableHighlight
      underlayColor={'#F9CB10'}
      onPress={onPress}
      style={[styles.buttonStyle, style]}>
      <Text style={styles.buttonTextStyle}>{text}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#F9CB10',
    borderRadius: 20,
    maxWidth: 100,
    marginVertical: 10,
    marginRight: 5,
  },
  buttonTextStyle: {
    fontSize: 14,
    fontWeight: '700',
    fontStyle: 'normal',
    padding: 12,
    textAlign: 'center',
  },
});
export default Button;

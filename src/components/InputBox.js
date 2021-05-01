import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const InputBox = props => {
  const {maxLength, value, onChange, keyboardType, style, error} = props;
  return (
    <View>
      <TextInput
        style={[
          styles.inputBoxStyle,
          style,
          // eslint-disable-next-line react-native/no-inline-styles
          {borderColor: error ? 'red' : '#C4C4C4'},
        ]}
        maxLength={maxLength}
        value={value}
        onChangeText={val => onChange(val)}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBoxStyle: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 7,
    textAlign: 'center',
    borderStyle: 'solid',
    fontSize: 18,
    fontWeight: '700',
    fontStyle: 'normal',
  },
});
export default InputBox;

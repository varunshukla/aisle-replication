import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Api from '../helper/api';
import Button from './Button';
import InputBox from './InputBox';

const Screen1 = props => {
  const [phoneNumber, setphoneNumber] = useState(props.phoneNumber || '');
  const [countryCode, setcountryCode] = useState(props.countryCode || '+91');
  const [showError, setshowError] = useState(false);

  const callOTPApi = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setshowError(true);
    } else {
      setshowError(false);

      const url = 'https://testa2.aisle.co/V1/users/phone_number_login';
      Api.postData(url, {number: countryCode + phoneNumber}).then(response => {
        if (response.status) {
          props.navigation.navigate('screen2', {
            phoneNumber,
            countryCode,
          });
        }
      });
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <Text style={styles.getOtp}>Get OTP</Text>
        <Text style={styles.phoneNumberText}>Enter Your Phone Number</Text>
        <View style={styles.phoneNumber}>
          <InputBox
            maxLength={5}
            value={countryCode}
            onChange={setcountryCode}
            keyboardType="number-pad"
            style={styles.inputBoxCountryCode}
            error={showError}
          />
          <InputBox
            style={styles.inputBoxPhoneNumber}
            maxLength={10}
            value={phoneNumber}
            onChange={setphoneNumber}
            keyboardType="number-pad"
            error={showError}
          />
        </View>
        {showError && (
          <Text style={styles.textError}>
            Please enter a valid phone number
          </Text>
        )}
        <Button onPress={callOTPApi} text={'Continue'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 80,
    paddingLeft: 30,
  },
  getOtp: {
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'normal',
  },
  phoneNumberText: {
    marginTop: 8,
    width: 220,
    fontSize: 30,
    fontWeight: '800',
    fontStyle: 'normal',
  },
  phoneNumber: {
    marginTop: 12,
    flexDirection: 'row',
  },
  inputBoxCountryCode: {
    marginRight: 20,
    width: 65,
  },
  inputBoxPhoneNumber: {
    width: 150,
  },
  textError: {
    color: 'red',
    paddingTop: 5,
  },
});

export default Screen1;

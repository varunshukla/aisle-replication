/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  View,
  TouchableHighlight,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import Api from '../helper/api';

import CustomButton from './Button';
import InputBox from './InputBox';

const editImage = require('../assets/images/pencil.png');
const Screen2 = props => {
  const {countryCode, phoneNumber} = props.route.params;

  const [otp, setotp] = useState(null);
  const [hitResend, sethitResend] = useState(false);
  const [showError, setshowError] = useState(false);

  const callVerifyOTPApi = () => {
    if (!otp || otp.length < 4) {
      setshowError(true);
    } else {
      setshowError(false);

      const url = 'https://testa2.aisle.co/V1/users/verify_otp';
      Api.postData(url, {
        number: countryCode + phoneNumber,
        otp,
      }).then(response => {
        if (response.token) {
          props.navigation.navigate('discovertab', {
            screen: 'screen3',
            params: {
              token: response.token,
            },
          });
        }
      });
    }
  };

  const callResendApi = () => {
    sethitResend(false);
    CountDownTimer();

    // call prev page API with phone number
    const url = 'https://testa2.aisle.co/V1/users/phone_number_login';
    Api.postData(url, {number: countryCode + phoneNumber}).then(response => {
      if (response.status) {
        console.log('resend api called');
      }
    });
  };

  const gotoPreviousScreen = () => {
    props.navigation.navigate('screen1', {
      phoneNumber,
      countryCode,
    });
  };

  const hitResendAction = () => {
    sethitResend(true);
  };

  function CountDownTimer() {
    return (
      <CountDown
        until={59}
        onFinish={hitResendAction}
        timeToShow={['M', 'S']}
        timeLabels={{m: '', s: ''}}
        size={13}
        showSeparator
        digitStyle={{
          backgroundColor: '#FFF',
        }}
        digitTxtStyle={{color: 'black'}}
      />
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={[styles.flexRow, styles.verticalCenter]}>
          <Text style={[styles.phoneNumber, styles.marginRight5]}>
            {countryCode} {phoneNumber}
          </Text>
          <TouchableHighlight onPress={gotoPreviousScreen} underlayColor="gray">
            <Image source={editImage} />
          </TouchableHighlight>
        </View>
        <Text style={styles.enterOtpText}>Enter The OTP</Text>
        <View style={styles.otp}>
          <InputBox
            maxLength={4}
            value={otp}
            onChange={setotp}
            keyboardType="number-pad"
            style={styles.inputBoxCountryCode}
            error={showError}
          />
        </View>
        {showError && (
          <Text style={styles.textError}>Please enter a valid OTP</Text>
        )}
        <View
          style={[styles.flexRow, styles.verticalCenter, styles.marginRight5]}>
          <CustomButton onPress={callVerifyOTPApi} text={'Continue'} />
          {hitResend ? (
            <Button onPress={callResendApi} title="Resend" />
          ) : (
            CountDownTimer()
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 80,
    paddingLeft: 30,
  },
  marginRight5: {
    marginRight: 5,
  },
  flexRow: {
    flexDirection: 'row',
  },
  verticalCenter: {
    alignItems: 'center',
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'normal',
  },
  enterOtpText: {
    marginTop: 8,
    width: 220,
    fontSize: 30,
    fontWeight: '800',
    fontStyle: 'normal',
  },
  otp: {
    marginTop: 12,
    flexDirection: 'row',
  },
  inputBoxCountryCode: {
    width: 100,
  },
  textError: {
    color: 'red',
    paddingTop: 5,
  },
});

export default Screen2;

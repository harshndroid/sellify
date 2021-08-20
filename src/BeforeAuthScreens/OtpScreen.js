import React, {useEffect, useState} from 'react';
import {View, TextInput, Text, BackHandler} from 'react-native';
import Toast from 'react-native-simple-toast';
import Button from '../components/Button';
import TopBar from '../components/TopBar';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveUserInfo} from '../actions/user';
import {setUserType} from '../actions/userType';
import {confirmingOTP} from '../actions/apiCalls';

import AsyncStorage from '@react-native-async-storage/async-storage';

function OtpScreen(props) {
  const {confirm, phone, isSeller} = props.route.params;
  // const [resendCode, setResendCode] = useState(null);
  const [code, setCode] = useState('');
  const storeUserType = async userType => {
    await AsyncStorage.setItem('@user_type', userType);
  };
  function handleBackButtonClick() {
    storeUserType('');
    props.navigation.goBack();
    return true;
  }

  useEffect(() => {
    if (isSeller) {
      props.setUserType('seller');
      storeUserType('seller');
    } else {
      props.setUserType('buyer');
      storeUserType('buyer');
    }

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  function confirmCode() {
    console.log('confirming code...');
    props.confirmingOTP(true);
    confirm
      .confirm(code)
      .then(() => Toast.show('OTP verified'))
      .catch(() => {
        props.confirmingOTP(false);
        Toast.show('Invalid OTP. Try again');
      });
  }

  // TODO - Add resend OTP functionality
  // async function resendOTP() {
  //   Toast.show("Resending OTP");
  //   APIServices.getOtp(phoneNumber)
  //     .then(res => {
  //       res.confirm(code)
  //     .then(() => props.confirmingOTP(false))
  //     .catch(() => {
  //       props.confirmingOTP(false);
  //       Toast.show('Invalid OTP. Try again');
  //     });
  //       Toast.show('OTP sent again');
  //     })
  //     .catch(err => Toast.show(err));
  // }

  return (
    <>
      <TopBar
        title="Enter OTP"
        showLeftIcon={true}
        onPress={() => props.navigation.navigate('PhoneScreen')}
      />
      <View style={{alignItems: 'center', marginTop: 32}}>
        <Text>6-digit verification code is sent to</Text>
        <Text>{phone}</Text>
        <TextInput
          style={{margin: 8, textAlign: 'center'}}
          onChangeText={text => setCode(text)}
          placeholder="Enter 6-digit OTP"
        />
        <Button
          disabled={code.length < 6}
          callingAPI={props.apiCalls.confirmingOTP}
          title="Confirm OTP"
          onPress={confirmCode}
        />
        {/* <Text style={{margin: 16}}>Resend OTP</Text> */}
      </View>
    </>
  );
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      saveUserInfo: saveUserInfo,
      setUserType: setUserType,
      confirmingOTP: confirmingOTP,
    },
    dispatch,
  );
}

function mapStateToProps(state) {
  return {
    apiCalls: state.apiCalls,
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(OtpScreen);

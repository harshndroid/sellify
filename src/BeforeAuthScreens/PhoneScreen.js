import React, {useState, useEffect} from 'react';
import {View, TextInput} from 'react-native';
import Toast from 'react-native-simple-toast';
import TopBar from '../components/TopBar';
import Button from '../components/Button';
import Chip from '../components/Chip';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {gettingOTP} from '../actions/apiCalls';

import APIServices from '../APIServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

function PhoneScreen(props) {
  const [phone, setPhone] = useState('');
  const [valid, setValid] = useState(false);
  const [userIsSeller, setUserAsBuyer] = useState('');

  useEffect(() => {
    storeUserType('');
  }, []);

  const storeUserType = async userType => {
    await AsyncStorage.setItem('@user_type', userType);
  };

  async function signInWithPhoneNumber() {
    props.gettingOTP(true);
    if (userIsSeller === 'seller') storeUserType('seller');
    else storeUserType('buyer');
    const phoneNumber = '+91 ' + phone;
    console.log(phoneNumber);
    APIServices.getOtp(phoneNumber)
      .then(res => {
        props.gettingOTP(false);
        Toast.show('OTP sent');
        props.navigation.navigate('OtpScreen', {
          confirm: res,
          phone: phoneNumber,
          isSeller: userIsSeller === 'seller',
        });
      })
      .catch(err => Toast.show(err));
  }

  useEffect(() => {
    if (phone.length === 10) {
      const check = /^[0-9]*$/.test(phone);
      if (check) setValid(true);
      else setValid(false);
    }
  }, [phone]);

  return (
    <>
      <TopBar title="Login" showLeftIcon={false} />
      <View style={{margin: 16}}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            editable={false}
            placeholder="+91"
            placeholderTextColor="black"
            style={{fontSize: 16, margin: -4}}
          />
          <TextInput
            maxLength={10}
            style={{fontSize: 16, marginVertical: -4, marginLeft: 4}}
            keyboardType="number-pad"
            placeholder="Enter phone number"
            onChangeText={phone => setPhone(phone)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 16,
          }}>
          <View style={{flex: 1, marginRight: 16}}>
            <Chip
              callingAPI={props.apiCalls.gettingOTP}
              isSelected={userIsSeller === 'seller'}
              title="I want to sell"
              onPress={() =>
                userIsSeller !== 'seller' && setUserAsBuyer('seller')
              }
            />
          </View>
          <View style={{flex: 1, marginLeft: 16}}>
            <Chip
              callingAPI={props.apiCalls.gettingOTP}
              isSelected={userIsSeller === 'buyer'}
              title="I want to buy"
              onPress={() =>
                userIsSeller !== 'buyer' && setUserAsBuyer('buyer')
              }
            />
          </View>
        </View>
        <View style={{marginTop: 16}}>
          <Button
            disabled={
              !valid ||
              userIsSeller === '' ||
              phone.length < 10 ||
              props.apiCalls.gettingOTP
            }
            callingAPI={props.apiCalls.gettingOTP}
            title="Get OTP"
            onPress={signInWithPhoneNumber}
          />
        </View>
      </View>
    </>
  );
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      gettingOTP: gettingOTP,
    },
    dispatch,
  );
}

function mapStateToProps(state) {
  return {
    apiCalls: state.apiCalls,
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(PhoneScreen);

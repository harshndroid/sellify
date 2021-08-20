import React, {useState} from 'react';
import {View, TextInput, Text} from 'react-native';
import Button from '../components/Button';
import Toast from 'react-native-simple-toast';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userAuthorized, saveUserInfo} from '../actions/user';

import APIServices from '../APIServices';

function ProfileScreen(props) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');

  const submitUser = () => {
    const updateData = {
      name,
      address,
      age,
    };
    APIServices.updateSellerData(props.user, updateData)
      .then(res => {
        props.saveUserInfo({name, address, age});
        console.log(res);
      })
      .catch(e => console.log('error in updateSellerData', e));
  };

  const logout = () => {
    APIServices.logout().then(() => {
      props.userAuthorized(false);
      Toast.show('Logged out!');
    });
  };

  return (
    <View style={{marginTop: 100}}>
      <Text>Profile Screen {props.user.user_phoneNumber}</Text>
      <TextInput placeholder="Name" onChangeText={t => setName(t)} />
      <TextInput placeholder="Address" onChangeText={t => setAddress(t)} />
      <TextInput placeholder="Age" onChangeText={t => setAge(t)} />
      <Button title="Submit" onPress={submitUser} />
      <View style={{marginTop: 50}}>
        <Button title="Logout" onPress={logout} />
      </View>
    </View>
  );
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      userAuthorized: userAuthorized,
      saveUserInfo: saveUserInfo,
    },
    dispatch,
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(ProfileScreen);

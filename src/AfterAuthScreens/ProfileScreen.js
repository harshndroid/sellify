import React, {useState} from 'react';
import {View, TextInput, Text} from 'react-native';
import TopBar from '../components/TopBar';
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

  // useEffect(() => {
  //   const back = BackHandler.addEventListener('hardwareBackPress', () => {
  //     props.navigation.goBack();
  //     return true;
  //   });
  //   return () => {
  //     back.remove();
  //   };
  // }, []);

  const submitUser = () => {
    const updateData = {
      name,
      address,
      age,
    };
    APIServices.updateSellerData(props.user, updateData)
      .then(res => {
        props.saveUserInfo({name, address, age});
        Toast.show('Profile updated');
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
    <>
      <TopBar
        title="My Profile"
        showLeftIcon={true}
        onPress={() => props.navigation.goBack()}
      />
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          justifyContent: 'center',
          // alignItems: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>{props.user.user_phoneNumber}</Text>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'pink',
            alignItems: 'center',
            width: '50%',
            justifyContent: 'space-evenly',
          }}>
          <Text>Name</Text>
          <TextInput
            style={{backgroundColor: 'red'}}
            underlineColorAndroid="red"
            placeholder="Name"
            onChangeText={t => setName(t)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'pink',
            alignItems: 'center',
            width: '50%',
            justifyContent: 'space-evenly',
          }}>
          <Text>Address</Text>
          <TextInput placeholder="Address" onChangeText={t => setAddress(t)} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'pink',
            alignItems: 'center',
            width: '50%',
            justifyContent: 'space-evenly',
          }}>
          <Text>Age</Text>
          <TextInput placeholder="Age" onChangeText={t => setAge(t)} />
        </View>
        <Button title="Submit" onPress={submitUser} />
        <View style={{marginTop: 50, width: '100%'}}>
          <Button title="Logout" onPress={logout} />
        </View>
      </View>
    </>
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

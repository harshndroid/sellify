import React from 'react';
import {View, Text, Alert} from 'react-native';
import Toast from 'react-native-simple-toast';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/AntDesign';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userAuthorized} from '../actions/user';
import APIServices from '../APIServices';

const CustomDrawer = props => {
  console.log('=-=-=--', props.user.user_request_status);
  function logout() {
    APIServices.logout().then(() => {
      props.userAuthorized(false);
      Toast.show('Logged out!');
    });
  }
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          height: 140,
          justifyContent: 'flex-end',
          paddingHorizontal: 20,
          paddingBottom: 20,
          backgroundColor: '#80a1e8',
          position: 'absolute',
          width: '100%',
        }}>
        <Text
          style={{
            fontSize: 18,
            color: 'white',
            fontFamily: 'Montserrat-SemiBold',
          }}>
          {props.user.user_name}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: 'white',
            fontFamily: 'Montserrat-Medium',
            paddingTop: 5,
          }}>
          {props.user.user_address}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: 'white',
            fontFamily: 'Montserrat-Regular',
            paddingTop: 5,
          }}>
          {props.user.user_type === 'seller' ? 'Seller' : 'Buyer'}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: 'white',
            fontFamily: 'Montserrat-Regular',
            paddingTop: 5,
          }}>
          {props.user.user_phoneNumber}
        </Text>
      </View>
      <View style={{marginTop: 140}} />
      <DrawerItemList {...props} />
      {/* {props.user.user_request_status !== 0 && (
        <DrawerItem
          label="My Requestssss"
          labelStyle={{
            fontFamily: 'Montserrat-Medium',
            color: 'grey',
            marginLeft: 2,
          }}
          icon={() => <Icon2 name="history" size={20}></Icon2>}
          onPress={() => props.navigation.navigate('MyRequests')}
        />
      )} */}
      <DrawerItem
        label="Settings"
        labelStyle={{
          fontFamily: 'Montserrat-Medium',
          color: 'grey',
          // marginLeft: 2,
        }}
        icon={() => <Icon3 name="setting" size={20}></Icon3>}
        onPress={() => Alert.alert('This section is under development')}
      />
      <DrawerItem
        label="Logout"
        labelStyle={{
          fontFamily: 'Montserrat-Medium',
          color: 'grey',
          // marginLeft: 2,
        }}
        icon={() => <Icon3 name="logout" size={20}></Icon3>}
        onPress={logout}
      />
      <View style={{backgroundColor: '#ccc', height: 0.2}} />
    </DrawerContentScrollView>
  );
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      userAuthorized: userAuthorized,
    },
    dispatch,
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(CustomDrawer);

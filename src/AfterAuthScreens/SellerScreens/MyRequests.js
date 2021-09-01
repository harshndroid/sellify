import React, {useState, useEffect} from 'react';
import {View, Text, BackHandler} from 'react-native';
import TopBar from '../../components/TopBar';
import Button from '../../components/Button';
import BottomAlert from '../../components/BottomAlert';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveBuyers} from '../../actions/buyers';
import {raisingPickupRequest} from '../../actions/apiCalls';
import {updateUserInfo} from '../../actions/user';

import APIServices from '../../APIServices';

function MyRequests(props) {
  return (
    <View style={{zIndex: 0}}>
      <TopBar title="My Requests" />
      <Text>My Requests</Text>
    </View>
  );
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      saveBuyers: saveBuyers,
    },
    dispatch,
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
    apiCalls: state.apiCalls,
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(MyRequests);

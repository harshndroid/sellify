import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import TopBar from '../../components/TopBar';
import Button from '../../components/Button';
import Toast from 'react-native-simple-toast';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateUserInfo} from '../../actions/user';

import APIServices from '../../APIServices';

function ReviewScreen(props) {
  const [address, setAddress] = useState('');
  const proceed = () => {
    const userData = {
      phone: props.user.user_phoneNumber,
      address,
      pickupTime: props.route.params.selectedDay,
      items: props.selectedItems,
    };
    props.updateUserInfo(userData);
    const updateData = {address};
    APIServices.raisePickupRequest(userData)
      .then(() => {
        APIServices.updateSellerData(props.user, updateData)
          .then(() => {
            props.navigation.navigate('BuyersListScreen');
            Toast.show('Pickup request raised successfully');
          })
          .catch(e => console.log('===e===', e));
      })
      .catch(e => console.log('error', e));
  };
  return (
    <>
      <TopBar
        title="Review"
        showLeftIcon
        onPress={() => props.navigation.navigate('SelectItems')}
      />
      <View style={{margin: 16}}>
        {props.selectedItems.map(item => (
          <Text key={item.itemId}>{item.itemName}</Text>
        ))}
        <Text></Text>
        <Text>Address: </Text>
        <TextInput placeholder="Address" onChangeText={t => setAddress(t)} />
        <Text></Text>
        <Text>Date of pickup: {props.route.params.selectedDay}</Text>
      </View>
      <Button title="Proceed" onPress={proceed} />
    </>
  );
}

const Styles = StyleSheet.create({});

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateUserInfo: updateUserInfo,
    },
    dispatch,
  );
}

function mapStateToProps(state) {
  return {
    selectedItems: state.selectedItems,
    user: state.user,
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(ReviewScreen);

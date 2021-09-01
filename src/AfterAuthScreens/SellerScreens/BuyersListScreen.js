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

function BuyersListScreen(props) {
  const {address, pickupTime} = props.route.params;
  const [show, setShow] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!props.buyersList) {
      APIServices.fetchBuyers()
        .then(data => props.saveBuyers(data))
        .catch(e => console.log('error', e));
    }

    const back = BackHandler.addEventListener('hardwareBackPress', () => {
      if (show) {
        setShow(false);
      } else {
        props.navigation.goBack();
      }
      return true;
    });
    return () => {
      back.remove();
    };
  }, [show]);

  const send = () => {
    console.log('call');
    setTimeout(() => {
      fetch('https://scrape-notify.herokuapp.com/send-notification', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          token: token,
        }),
      });
    }, 5000);
  };

  const yesClick = () => {
    props.raisingPickupRequest(true);
    const userData = {
      phone: props.user.user_phoneNumber,
      address,
      pickupTime,
      items: props.selectedItems,
    };
    const updateData = {address};
    APIServices.raisePickupRequest(userData, props.user)
      .then(() => {
        APIServices.updateSellerData(props.user, updateData)
          .then(() => {
            props.updateUserInfo(userData);
            raisingPickupRequest(false);
            props.navigation.navigate('MyRequests');
            Toast.show('Pickup request raised successfully');
            send();
          })
          .catch(e => console.log('===e===', e));
      })
      .catch(e => console.log('error', e));
  };

  const noClick = () => {
    setShow(false);
  };
  const showPopup = tok => {
    setShow(true);
    setToken(tok);
    // console.log('called');
    // setTimeout(() => {
    //   fetch('https://scrape-notify.herokuapp.com/send-notification', {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({
    //       token: tok,
    //     }),
    //   });
    // }, 5000);
  };

  if (!props.buyersList) {
    return <Text>fetching...</Text>;
  }

  return (
    <>
      <BottomAlert
        isPrimaryDisabled={props.apiCalls.raisingPickupRequest}
        children={
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: '#f2f7ff',
                padding: 16,
                borderRadius: 50,
                opacity: 0.8,
              }}>
              <FontAwesome5 name="truck-pickup" color="#80a1e8" size={30} />
            </View>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                marginTop: 16,
              }}>
              Are you sure you want to request
            </Text>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                marginBottom: 16,
                marginTop: 2,
              }}>
              for pickup?
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlign: 'center',
                marginBottom: 8,
                color: 'grey',
              }}>
              Your request can't be changed.
            </Text>
          </View>
        }
        show={show}
        primaryBtnText="Yes"
        secondaryBtnText="No"
        onPrimaryBtnPress={() => yesClick()}
        onSecondaryBtnPress={() => noClick()}
      />
      <View style={{zIndex: 0}}>
        <TopBar
          title="Buyers List"
          showLeftIcon
          onPress={() => props.navigation.navigate('ReviewScreen')}
        />
      </View>
      {props.buyersList.length === 0 ? (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text>No buyer available.</Text>
          <Text>We will connect you to a buyer.</Text>
          <Text>Please call us on +91-8350873768</Text>
          <View style={{marginTop: 30, width: '100%', zIndex: 0}}>
            <Button onPress={showPopup} title="Raise Pickup Request" />
          </View>
        </View>
      ) : (
        <View style={{zIndex: -1}}>
          {props.buyersList.map((item, index) => (
            <View
              key={index}
              style={{
                elevation: 1,
                backgroundColor: 'white',
                marginTop: 16,
                marginHorizontal: 16,
                padding: 16,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'column', flex: 1}}>
                  <Text>Mobile Number</Text>
                  <Text>{item.phone}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Button
                    title="Request"
                    onPress={() => showPopup(item.notify_token)}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </>
  );
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      saveBuyers: saveBuyers,
      raisingPickupRequest: raisingPickupRequest,
      updateUserInfo: updateUserInfo,
    },
    dispatch,
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
    itemList: state.item.itemList,
    buyersList: state.buyers.buyersList,
    apiCalls: state.apiCalls,
    selectedItems: state.selectedItems,
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(BuyersListScreen);

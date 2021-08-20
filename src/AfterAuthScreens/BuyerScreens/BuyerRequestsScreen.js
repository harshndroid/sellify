import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import TopBar from '../../components/TopBar';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveRequests} from '../../actions/requests';

import APIServices from '../../APIServices';
function BuyerRequestsScreen(props) {
  useEffect(() => {
    APIServices.fetchRequests()
      .then(data => props.saveRequests(data))
      .catch(() => props.saveRequests([]));
  }, []);

  const RenderRequests = ({item, index}) => {
    return item.pickup_items.map((data, i) => (
      <View key={i}>
        <Text>{data.itemName}</Text>
      </View>
    ));
  };
  return (
    <>
      <TopBar title="Requests" showLeftIcon={false} />
      {!props.requestsList ? (
        <Text>fetching...</Text>
      ) : props.requestsList.length > 0 ? (
        <View>
          {props.requestsList.map((item, index) => (
            <View key={index} style={{backgroundColor: 'white', margin: 16}}>
              <Text>Request #{index + 1}</Text>
              <Text>{item.phone}</Text>
              <RenderRequests item={item} index={index} />
            </View>
          ))}
        </View>
      ) : (
        <Text>No pickup requests.</Text>
      )}
    </>
  );
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      saveRequests: saveRequests,
    },
    dispatch,
  );
}

function mapStateToProps(state) {
  return {
    requestsList: state.requests.requestsList,
  };
}

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(BuyerRequestsScreen);

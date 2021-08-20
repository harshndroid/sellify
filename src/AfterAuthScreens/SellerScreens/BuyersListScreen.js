import React from 'react';
import {View, Text, Button} from 'react-native';
import TopBar from '../../components/TopBar';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveBuyers} from '../../actions/buyers';

function BuyersListScreen(props) {
  const send = () => {
    setTimeout(() => {
      console.log('call');
      fetch('https://scrape-notify.herokuapp.com/send-notification', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          token:
            'cLDfffrQQBiH7sexKTtvGU:APA91bHbvtT8oKLczHX1enLRkmEdJgdaASPIa6oHLPjvudWICzvLYcawLyX8XOo4YQpPnaOpi_4ft41KRc0NOo9iMxrrv1YHyajcVy-tq5_4zu44V5hPOadCHRaTLxa28ynIlCGJVAZu',
        }),
      });
    }, 5000);
  };
  return (
    <>
      <TopBar title="Buyers List" showLeftIcon={false} />
      {props.buyersList ? (
        <View>
          {props.buyersList.map((item, index) => (
            <View
              key={index}
              style={{backgroundColor: 'lightpink', margin: 16}}>
              <Text>Buyer #{index + 1}</Text>
              <Text>{item.phone}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Button title="clicks" onPress={send} />
      )}
    </>
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
    buyersList: state.buyers.buyersList,
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(BuyersListScreen);

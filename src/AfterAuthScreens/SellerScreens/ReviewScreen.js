import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet, ScrollView} from 'react-native';
import TopBar from '../../components/TopBar';
import Button from '../../components/Button';
import Toast from 'react-native-simple-toast';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {connect} from 'react-redux';

function ReviewScreen(props) {
  const [address, setAddress] = useState('');

  const monthObject = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };
  const date = props.route.params.selectedDay.split('-')[2];
  const month = props.route.params.selectedDay.split('-')[1];
  const year = props.route.params.selectedDay.split('-')[0];
  const pickupTime = date + ' ' + monthObject[Number(month)] + ', ' + year;

  const proceed = () => {
    address
      ? props.navigation.navigate('BuyersListScreen', {address, pickupTime})
      : Toast.show('Please provide your address to proceed');
  };

  const RenderItem = ({cat}) => {
    const arr = props.selectedItems.filter(obj => obj.categoryName === cat);

    return (
      <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
        {arr.length > 0 ? (
          arr.map(item => (
            <View
              key={item.itemName}
              style={{
                ...Styles.chips,
                backgroundColor: '#fff',
              }}>
              <Text style={{color: '#80a1e8'}}>{item.itemName}</Text>
              <Text>
                <FontAwesome name="rupee" color="#000" size={15} />{' '}
                {item.itemRate ? item.itemRate : '- -'}
              </Text>
            </View>
          ))
        ) : (
          <Text style={{paddingLeft: 6}}>Not selected any item.</Text>
        )}
      </View>
    );
  };

  return (
    <>
      <TopBar
        title="Review"
        showLeftIcon
        onPress={() => props.navigation.navigate('SelectPickupTime')}
      />
      <ScrollView style={{padding: 0}}>
        <Text
          onPress={() => props.navigation.navigate('SelectItems')}
          style={{fontSize: 16, marginTop: 16, fontWeight: 'bold'}}>
          Click here to change your selections
        </Text>
        {props.selectedCategories.map((item, index) => {
          return (
            <View key={index}>
              <View
                style={{
                  elevation: 1,
                  backgroundColor: 'white',
                  marginTop: 8,
                  padding: 4,
                  borderRadius: 0,
                  borderColor: 'black',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    paddingLeft: 6,
                    marginVertical: 6,
                  }}>
                  {item.categoryName}
                </Text>
                <RenderItem cat={item.categoryName} />
              </View>
            </View>
          );
        })}
        <View
          style={{
            backgroundColor: 'white',
            elevation: 3,
            marginTop: 16,
            borderRadius: 0,
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', padding: 8}}>
            <AntDesign name="home" color="#80a1e8" size={20} />
            <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 8}}>
              Pickup Address:{' '}
            </Text>
          </View>
          <TextInput
            style={{marginBottom: 16, padding: 8}}
            underlineColorAndroid="#80a1e8"
            placeholder="Enter your address here..."
            multiline
            onChangeText={t => setAddress(t)}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            elevation: 3,
            marginVertical: 16,
            borderRadius: 0,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 8,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Fontisto name="date" color="#80a1e8" size={16} />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginLeft: 8,
                }}>
                Date of pickup
              </Text>
            </View>
            <Text onPress={() => props.navigation.navigate('SelectPickupTime')}>
              Change Date
            </Text>
          </View>
          <Text
            style={{
              fontWeight: 'normal',
              marginTop: 4,
              paddingLeft: 8,
              paddingBottom: 8,
            }}>
            {pickupTime}
          </Text>
        </View>
        {
          <View style={{margin: 16}}>
            <Button title="Choose Buyer" onPress={proceed} />
          </View>
        }
      </ScrollView>
    </>
  );
}

const Styles = StyleSheet.create({
  container: {backgroundColor: '#f3f3f3', flex: 1},
  chips: {
    alignSelf: 'flex-start',
    borderRadius: 4,
    borderWidth: 0.5,
    margin: 8,
    borderColor: '#80a1e8',
    padding: 8,
  },
});

function mapStateToProps(state) {
  return {
    selectedItems: state.selectedItems,
    selectedCategories: state.selectedCategories,
  };
}

export default connect(mapStateToProps, null)(ReviewScreen);

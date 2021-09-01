import React, {useState} from 'react';
import {View, Text} from 'react-native';
import TopBar from '../../components/TopBar';
import {Calendar} from 'react-native-calendars';
import Button from '../../components/Button';
import Toast from 'react-native-simple-toast';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateUserInfo} from '../../actions/user';

function SelectPickupTime(props) {
  const [selectedDay, setSelectedDay] = useState(Date());

  const proceed = () => {
    const todayDate = new Date().getDate();
    const todayMonth = new Date().getMonth() + 1;
    if (
      Number(selectedDay.split('-')[2]) === todayDate &&
      Number(selectedDay.split('-')[1]) === todayMonth
    ) {
      Toast.show('Select date other than today');
    } else if (selectedDay.length > 10) {
      Toast.show('Select a date');
    } else {
      props.navigation.navigate('ReviewScreen', {
        selectedDay,
      });
    }
  };
  return (
    <>
      <TopBar title="Pickup date" showLeftIcon={true} />
      <View style={{margin: 16}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="checkmark" color="green" size={25} />
          <Text style={{marginLeft: 8}}>
            We will come to pickup on the selected day.
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
          <Ionicons name="checkmark" color="green" size={25} />
          <Text style={{marginLeft: 8}}>
            We pickup between 09:00 AM - 06:00 PM
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
          <Ionicons name="warning" color="red" size={25} />
          <Text style={{marginLeft: 8}}>We do not pickup on the same day.</Text>
        </View>
        <Calendar
          style={{
            borderRadius: 8,
            borderColor: '#80a1e8',
            borderWidth: 0.5,
            marginTop: 16,
          }}
          markedDates={{
            [selectedDay]: {selected: true, selectedColor: 'green'},
          }}
          onDayPress={day => setSelectedDay(day.dateString)}
          theme={{
            arrowColor: '#80a1e8',
            todayTextColor: '#80a1e8',
            selectedDayBackgroundColor: '#80a1e8',
            selectedDayTextColor: '#fff',
          }}
          minDate={Date()}
        />
      </View>
      <Button title="Proceed" onPress={proceed} />
    </>
  );
}

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
    user: state.user,
    itemList: state.item.itemList,
    selectedItems: state.selectedItems,
    subCategoryList: state.item.subCategoryList,
    selectedCategories: state.selectedCategories,
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(SelectPickupTime);

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import TopBar from '../../components/TopBar';
import BottomAlert from '../../components/BottomAlert';
import Button from '../../components/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import APIServices from '../../APIServices';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveItems} from '../../actions/item';
import {
  resetSelectedItems,
  setSelectedItems,
} from '../../actions/selectedItems';

function SelectItems(props) {
  const [show, setShow] = useState(false);
  const [selectedDay, setSelectedDay] = useState(Date());
  useEffect(() => {
    props.resetSelectedItems();
    APIServices.fetchItems().then(data => {
      let arr = [];
      data.map((item, index) => {
        arr[index] = {
          itemId: index,
          categoryName: item.category_name,
          itemName: item.item_name,
          itemRate: item.item_rate,
          subcategoryName: item.subcategory_name,
          isSelected: false,
        };
      });
      props.saveItems(arr);
    });
  }, []);

  const selectionHandler = i => {
    props.itemList.map((item, index) => {
      if (i === item.itemName) {
        item.isSelected = !item.isSelected;
        props.setSelectedItems(item);
      }
      return {...item};
    });
  };

  const RenderItem = ({cat, subCat}) => {
    const arr = props.itemList.filter(obj => obj.categoryName === cat);
    const arr2 = arr.filter(obj => obj.subcategoryName === subCat);
    return (
      <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
        {arr2.length > 0 ? (
          arr2.map((item, index) => (
            <TouchableOpacity
              onPress={() => selectionHandler(item.itemName)}
              key={item.itemName}
              style={{
                ...Styles.chips,
                backgroundColor: item.isSelected ? '#80a1e8' : '#fff',
                elevation: item.isSelected ? 2 : 0,
              }}>
              <Text style={{color: item.isSelected ? 'white' : '#80a1e8'}}>
                {item.itemName}
              </Text>
              <Text>
                <FontAwesome name="rupee" color="#000" size={15} />{' '}
                {item.itemRate}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No item available to select.</Text>
        )}
      </View>
    );
  };

  const RenderSubcategories = ({cat}) => {
    var subCats;
    props.subCategoryList.map((item1, index1) => {
      if (Object.keys(item1)[0] === cat.categoryName) {
        subCats = item1[Object.keys(item1)[0]];
      }
    });
    if (subCats.length > 0) {
      return subCats.map((item, index) => (
        <View
          key={index}
          style={{backgroundColor: '#f3f3f3', borderRadius: 4, margin: 10}}>
          <Text style={{fontWeight: 'bold'}}>{item}</Text>
          <RenderItem cat={cat.categoryName} subCat={item} />
        </View>
      ));
    } else {
      return (
        <View>
          <RenderItem cat={cat.categoryName} />
        </View>
      );
    }
  };

  const proceed = () => {
    setShow(true);
  };

  const confirm = () => {
    setShow(false);
    props.navigation.navigate('ReviewScreen', {selectedDay: selectedDay});
  };

  const RenderCat = () => {
    return (
      <>
        {props.selectedCategories.map((item, index) => (
          <View key={index}>
            <View
              style={{
                elevation: 1,
                backgroundColor: 'white',
                marginTop: 16,
                padding: 4,
                borderRadius: 4,
                borderWidth: 0,
                borderColor: 'black',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  paddingLeft: 6,
                  marginVertical: 6,
                }}>
                {item.categoryName}
              </Text>
              <RenderSubcategories cat={item} />
            </View>
          </View>
        ))}
      </>
    );
  };

  return (
    <>
      <BottomAlert
        onSecondaryBtnPress={() => setShow(false)}
        onPrimaryBtnPress={() => confirm()}
        isPrimaryDisabled={selectedDay.length > 10}
        show={show}
        children={
          <>
            <Text style={{fontSize: 18, textAlign: 'center'}}>
              Select pickup time
            </Text>
            <Calendar
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
          </>
        }
      />
      <View style={Styles.container}>
        {props.itemList ? (
          <>
            <TopBar
              title="Choose items"
              showLeftIcon
              onPress={() => props.navigation.navigate('HomeScreen')}
            />
            <ScrollView style={{margin: 16, marginTop: 0}}>
              {props.selectedCategories && <RenderCat />}
            </ScrollView>
          </>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color="#80a1e8" size="large" />
          </View>
        )}

        {props.selectedItems.length > 0 && (
          <Button title="Proceed" onPress={proceed} />
        )}
      </View>
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

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      saveItems: saveItems,
      setSelectedItems: setSelectedItems,
      resetSelectedItems: resetSelectedItems,
    },
    dispatch,
  );
}

function mapStateToProps(state) {
  return {
    itemList: state.item.itemList,
    subCategoryList: state.item.subCategoryList,
    selectedCategories: state.selectedCategories,
    selectedItems: state.selectedItems,
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(SelectItems);

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  BackHandler,
} from 'react-native';
import TopBar from '../../components/TopBar';
import Button from '../../components/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import APIServices from '../../APIServices';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveItems} from '../../actions/item';
import {setSelectedItems} from '../../actions/selectedItems';

function SelectItems(props) {
  const [showSpinner, setShowSpinner] = useState(true);

  setTimeout(() => {
    setShowSpinner(false);
  }, 1000);
  useEffect(() => {
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

    const back = BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack();
      return true;
    });
    return () => {
      back.remove();
    };
  }, []);

  const selectionHandler = i => {
    props.itemList.map(item => {
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
        {arr2.map(item => (
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
        ))}
      </View>
    );
  };

  const RenderSubcategories = ({cat}) => {
    var subCats;
    props.subCategoryList.map(item1 => {
      if (Object.keys(item1)[0] === cat.categoryName) {
        subCats = item1[Object.keys(item1)[0]];
      }
    });
    if (subCats.length > 0) {
      return subCats.map((item, index) => {
        return (
          <View
            key={index}
            style={{backgroundColor: '#f3f3f3', borderRadius: 4, margin: 4}}>
            {item.split(' ')[1] > 0 && (
              <Text style={{fontWeight: 'bold'}}>{item.split(' ')[0]}</Text>
            )}
            {item.split(' ')[1] > 0 && (
              <RenderItem cat={cat.categoryName} subCat={item.split(' ')[0]} />
            )}
          </View>
        );
      });
    } else {
      return (
        <View>
          <RenderItem cat={cat.categoryName} />
        </View>
      );
    }
  };

  const proceed = () => {
    props.navigation.navigate('SelectPickupTime');
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

  if (showSpinner)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator color="#80a1e8" size="large" />
      </View>
    );
  return (
    <>
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

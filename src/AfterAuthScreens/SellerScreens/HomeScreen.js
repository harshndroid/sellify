import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';

import APIServices from '../../APIServices';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveCategories, saveSubCategories} from '../../actions/item';
import {setSelectedCategories} from '../../actions/selectedCategories';

function HomeScreen(props) {
  useEffect(() => {
    APIServices.fetchCategories().then(set => {
      set.delete('Other Items');
      set.add('Other Items');
      const data = Array.from(set);
      let arr = [];
      data.map((item, index) => {
        arr[index] = {categoryId: index, categoryName: item, isSelected: false};
      });
      props.saveCategories(arr);
      APIServices.fetchSubCategories(set).then(hashMap =>
        props.saveSubCategories(hashMap),
      );
    });
  }, []);

  const selectionHandler = i => {
    let _arr = props.categoryList.map((item, index) => {
      if (i === index) {
        item.isSelected = !item.isSelected;
        props.setSelectedCategories(item);
      }
      return {...item};
    });
    // props.saveCategories(_arr);
  };

  const proceed = () => {
    props.navigation.navigate('SelectItems');
  };

  const CategoryBoxLoading = () => {
    return [0, 1, 2, 3, 4].map(index => (
      <View
        key={index}
        style={[Styles.box, {justifyContent: 'center', alignItems: 'center'}]}>
        <ActivityIndicator color="#80a1e8" size="large" />
      </View>
    ));
  };

  const CategoryBox = ({item, index}) => {
    return (
      <TouchableOpacity
        style={item.isSelected ? Styles.boxSelected : Styles.box}
        onPress={() => selectionHandler(index)}>
        {item.isSelected && (
          <View style={{position: 'absolute', top: 4, right: 4}}>
            <Entypo name="check" color="#3dad5b" size={18} />
          </View>
        )}
        <View style={Styles.iconWrapper}>
          {index === 0 ? (
            <Image
              source={require('../../assets/plastic.png')}
              style={{marginTop: 8, height: 75, width: 75}}
            />
          ) : index === 1 ? (
            <Image
              source={require('../../assets/paper.png')}
              style={{marginTop: 8, height: 75, width: 75}}
            />
          ) : index === 2 ? (
            <Image
              source={require('../../assets/metal.png')}
              style={{marginTop: 14, height: 60, width: 60}}
            />
          ) : index === 3 ? (
            <Image
              source={require('../../assets/ewaste.png')}
              style={{marginTop: 14, height: 60, width: 60}}
            />
          ) : index === 4 ? (
            <Image
              source={require('../../assets/others.png')}
              style={{marginTop: 8, height: 70, width: 70}}
            />
          ) : null}
        </View>
        <View style={Styles.categoryNameWrapper}>
          <Text style={Styles.categoryName}>{item.categoryName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={Styles.container}>
      <View style={{marginLeft: -2.5}}>
        <Ionicons name="menu-outline" color="grey" size={28} />
      </View>
      <Text style={{fontSize: 18}}>Hey, what do you want to sell today ?</Text>
      {!props.categoryList ? (
        <View style={Styles.boxesWrapper}>
          <CategoryBoxLoading />
        </View>
      ) : (
        <View style={Styles.boxesWrapper}>
          {props.categoryList.map((item, index) => (
            <View key={index}>
              <CategoryBox item={item} index={index} />
            </View>
          ))}
        </View>
      )}
      <View style={{marginTop: 32}}>
        {props.selectedCategories.length > 0 && (
          <Button title="Proceed" onPress={proceed} />
        )}
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {margin: 16, paddingTop: 16, backgroundColor: '#f3f3f3', flex: 1},
  boxesWrapper: {flexDirection: 'row', flexWrap: 'wrap', marginTop: 20},
  box: {
    borderRadius: 4,
    marginRight: 16,
    height: 110,
    width: 105,
    marginTop: 20,
    elevation: 3,
    backgroundColor: '#fff',
  },
  boxSelected: {
    marginRight: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#3dad5b',
    height: 110,
    width: 105,
    marginTop: 20,
    elevation: 2,
    backgroundColor: 'white',
  },
  iconWrapper: {alignSelf: 'center'},
  categoryNameWrapper: {position: 'absolute', bottom: 0, alignSelf: 'center'},
});

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      saveCategories: saveCategories,
      saveSubCategories: saveSubCategories,
      setSelectedCategories: setSelectedCategories,
    },
    dispatch,
  );
}

function mapStateToProps(state) {
  return {
    categoryList: state.item.categoryList,
    selectedCategories: state.selectedCategories,
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(HomeScreen);

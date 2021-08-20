import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function TopBar(props) {
  return (
    <View
      style={{
        ...Styles.topBarWrapper,
        paddingLeft: props.showLeftIcon ? 16 : 0,
      }}>
      {props.showLeftIcon && (
        <Ionicons
          onPress={props.onPress}
          name="arrow-back"
          size={24}
          color="white"
        />
      )}
      <Text style={Styles.title}>{props.title}</Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  topBarWrapper: {
    backgroundColor: '#80a1e8',
    elevation: 4,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {fontSize: 17, fontWeight: 'bold', color: 'white', marginLeft: 16},
});

export default TopBar;

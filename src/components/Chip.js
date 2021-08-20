import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

function Chip({title, onPress, disabled, isSelected, callingAPI}) {
  return (
    <View style={Styles.btnView}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={
          disabled
            ? Styles.disabledBtn
            : isSelected
            ? Styles.isSelected
            : Styles.btn
        }
        onPress={disabled || callingAPI ? () => {} : onPress}>
        <Text style={{color: isSelected ? '#fff' : '#80a1e8', fontSize: 16}}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  btnView: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
  },
  isSelected: {
    elevation: 3,
    borderRadius: 4,
    backgroundColor: '#80a1e8',
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    borderRadius: 4,
    backgroundColor: 'white',
    borderColor: '#80a1e8',
    borderWidth: 1,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledBtn: {
    borderRadius: 2,
    backgroundColor: '#ccc',
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Chip;

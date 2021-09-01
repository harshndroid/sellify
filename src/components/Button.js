import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

function Button({title, onPress, disabled, callingAPI}) {
  return (
    <View style={Styles.btnView}>
      <TouchableOpacity
        activeOpacity={disabled || callingAPI ? 0.8 : 0.6}
        style={disabled || callingAPI ? Styles.disabledBtn : Styles.btn}
        onPress={disabled || callingAPI ? () => {} : onPress}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
          }}>
          {callingAPI ? 'Please wait...' : title}
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
  btn: {
    elevation: 3,
    borderRadius: 2,
    backgroundColor: '#80a1e8',
    height: 40,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledBtn: {
    borderRadius: 2,
    height: 40,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(128, 161, 232,.4)',
  },
});

export default Button;

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
            color: disabled || callingAPI ? 'grey' : 'white',
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
    // position: 'absolute',
    // bottom: 20,
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
    backgroundColor: '#ccc',
    height: 40,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Button;

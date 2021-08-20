import React from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';

function BottomAlert({show, children, onPrimaryBtnPress, onSecondaryBtnPress, isPrimaryDisabled}){
    if(!show) return null;
    return(
        <View style={{position: 'absolute', top:0, left: 0, zIndex: 2, padding: 12, paddingBottom:16, backgroundColor:"rgba(0,0,0,.7)", height:'100%', width:"100%", justifyContent:"flex-end", alignItems:"center"}}>
            <View style={{padding: 16, borderBottomLeftRadius:8,borderBottomRightRadius:8,borderTopLeftRadius:16,borderTopRightRadius:16, width:"100%", backgroundColor:"#fff"}}>
                {children}
                <View style={Styles.btnView}>
                    <TouchableOpacity style={Styles.secondaryBtn} onPress={onSecondaryBtnPress}>
                        <Text style={{color:"#80a1e8", fontSize: 16}}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={isPrimaryDisabled ? Styles.primaryBtnDisabled : Styles.primaryBtn} onPress={isPrimaryDisabled ? ()=>{} : onPrimaryBtnPress}>
                        <Text style={{color:"white", fontSize: 16}}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    primaryBtn: {elevation:2, borderRadius: 4, backgroundColor:"#80a1e8", height: 40, width:"45%", alignItems:"center", justifyContent:"center"},
    btnView: {flexDirection:"row",alignSelf:"center", alignItems:"center",justifyContent:"space-between", width:"100%"},
    secondaryBtn: {elevation:0, borderRadius: 4, borderColor:'#80a1e8', borderWidth:0.5, backgroundColor:"#fff", height: 40, width:"45%", alignItems:"center", justifyContent:"center"},
    primaryBtnDisabled: {elevation:2, borderRadius: 4, backgroundColor:"#ccc", height: 40, width:"45%", alignItems:"center", justifyContent:"center"},
});

export default BottomAlert;

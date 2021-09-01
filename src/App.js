import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import Toast from 'react-native-simple-toast';
import CustomDrawer from './components/CustomDrawer';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import {auth, database} from './FirebaseConfig';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userAuthorized, saveUserInfo} from './actions/user';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import PhoneScreen from './BeforeAuthScreens/PhoneScreen';
import OtpScreen from './BeforeAuthScreens/OtpScreen';

import ProfileScreen from './AfterAuthScreens/ProfileScreen';
import HomeScreen from './AfterAuthScreens/SellerScreens/HomeScreen';
import SelectItems from './AfterAuthScreens/SellerScreens/SelectItems';
import SelectPickupTime from './AfterAuthScreens/SellerScreens/SelectPickupTime';
import ReviewScreen from './AfterAuthScreens/SellerScreens/ReviewScreen';
import BuyersListScreen from './AfterAuthScreens/SellerScreens/BuyersListScreen';
import MyRequests from './AfterAuthScreens/SellerScreens/MyRequests';
import BuyerRequestsScreen from './AfterAuthScreens/BuyerScreens/BuyerRequestsScreen';

import APIServices from './APIServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(props) {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState('');

  const storeUserType = async userType => {
    await AsyncStorage.setItem('@user_type', userType);
  };
  console.log('=====key start', key);

  useEffect(() => {
    console.log('=====props.userType', props.userType);
    let mounted = true;
    async function bootUser() {
      auth().onAuthStateChanged(async user => {
        if (user) {
          var userType0 = await AsyncStorage.getItem('@user_type');
          if (userType0 !== null) {
            setKey(userType0);
          }
          console.log('====here 1');
          const num1 = user.phoneNumber.slice(0, 3);
          const num2 = ' ';
          const num3 = user.phoneNumber.slice(3, 13);
          const phone = num1 + num2 + num3;
          database()
            .ref('users')
            .once('value')
            .then(async snapshot => {
              console.log('====here 2');
              if (snapshot.val()) {
                console.log('====here 3');
                var usersArray = Object.values(snapshot.val());
                var userFound = usersArray.find(ele => ele.phone === phone);
                console.log('====user found', userFound);
                setTimeout(async () => {
                  var userType = await AsyncStorage.getItem('@user_type');
                  console.log('====here 4', userType);
                  if (userFound !== undefined) {
                    var userFoundType = userType === userFound.userType;
                  }
                  if (userFound && userFoundType) {
                    console.log('====here 5');
                    props.userAuthorized(true);
                    props.saveUserInfo(userFound);
                    setLoading(false);
                  } else if (!userFound && !userFoundType) {
                    console.log('====here 6');
                    APIServices.saveUserPhone(phone, userType)
                      .then(data => {
                        props.userAuthorized(true);
                        props.saveUserInfo(data);
                        setLoading(false);
                      })
                      .catch(e => console.log('error in saveUserPhone', e));
                  } else {
                    console.log('====here 8');
                    props.userAuthorized(false);
                    setLoading(false);
                    storeUserType('');
                    userType === 'buyer'
                      ? Toast.show(`You are already logged in as seller`)
                      : Toast.show(`You are already logged in as buyer`);
                  }
                }, 3000);
              } else {
                console.log('====here 9');
                var userType2 = await AsyncStorage.getItem('@user_type');
                APIServices.saveUserPhone(phone, userType2)
                  .then(data => {
                    console.log('====here 10');
                    props.userAuthorized(true);
                    props.saveUserInfo(data);
                    setLoading(false);
                  })
                  .catch(e => console.log('error in saveUserPhone', e));
              }
            });
        } else {
          console.log('====here 11');
          setLoading(false);
          console.log('no user logged in');
        }
      });
    }
    mounted && bootUser();
    function cleanup() {
      mounted = false;
    }
    return () => cleanup();
  }, []);
  // props.userType;
  function Loading() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator color="80a1e8" size="large" />
      </View>
    );
  }

  function BeforeAuthNavigator() {
    return (
      <Stack.Navigator initialRouteName="PhoneScreen">
        <Stack.Screen
          name="PhoneScreen"
          component={PhoneScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }
  function AuthStacks() {
    if (props.user.user_request_status !== 0) {
      return (
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SelectItems"
            component={SelectItems}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SelectPickupTime"
            component={SelectPickupTime}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ReviewScreen"
            component={ReviewScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BuyersListScreen"
            component={BuyersListScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      );
    } else {
      return (
        <Stack.Navigator initialRouteName="MyRequests">
          <Stack.Screen
            name="MyRequests"
            component={MyRequests}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      );
    }
  }
  return loading ? (
    <Loading />
  ) : (
    <NavigationContainer>
      {props.user.authorized ? (
        key === 'buyer' ? (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="BuyerRequestsScreen"
              component={BuyerRequestsScreen}
            />
          </Stack.Navigator>
        ) : props.user.user_request_status === 0 ? (
          <Drawer.Navigator
            drawerContentOptions={{
              labelStyle: {fontFamily: 'Montserrat-Medium'},
              activeTintColor: '#80a1e8',
              activeBackgroundColor: 'transparent',
            }}
            drawerContent={props => <CustomDrawer {...props} />}>
            <Drawer.Screen
              name="AuthStacks"
              component={AuthStacks}
              options={{
                title: 'My Requests',
                drawerIcon: ({focused}) => (
                  <Icon2
                    name="history"
                    size={20}
                    color={focused ? '#80a1e8' : 'black'}></Icon2>
                ),
              }}
            />
            <Drawer.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{
                title: 'My Profile',
                headerTitleStyle: {fontFamily: 'Montserrat-Medium'},
                headerTintColor: 'white',
                headerStyle: {backgroundColor: '#80a1e8'},
                drawerIcon: ({focused}) => (
                  <Icon
                    name="user"
                    size={20}
                    color={focused ? '#80a1e8' : 'black'}></Icon>
                ),
              }}
            />
          </Drawer.Navigator>
        ) : (
          <Drawer.Navigator
            drawerContentOptions={{
              labelStyle: {fontFamily: 'Montserrat-Medium'},
              activeTintColor: '#80a1e8',
              activeBackgroundColor: 'transparent',
            }}
            drawerContent={props => <CustomDrawer {...props} />}>
            <Drawer.Screen
              name="AuthStacks"
              component={AuthStacks}
              options={{
                title: 'Home',
                drawerIcon: ({focused}) => (
                  <Icon2
                    name="home"
                    size={20}
                    color={focused ? '#80a1e8' : 'black'}></Icon2>
                ),
              }}
            />
            <Drawer.Screen
              name="MyRequests"
              component={MyRequests}
              options={{
                title: 'My Requests',
                headerTitleStyle: {fontFamily: 'Montserrat-Medium'},
                headerTintColor: 'white',
                headerStyle: {backgroundColor: '#80a1e8'},
                drawerIcon: ({focused}) => (
                  <Icon2
                    name="history"
                    size={20}
                    color={focused ? '#80a1e8' : 'black'}></Icon2>
                ),
              }}
            />
            <Drawer.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{
                title: 'My Profile',
                headerTitleStyle: {fontFamily: 'Montserrat-Medium'},
                headerTintColor: 'white',
                headerStyle: {backgroundColor: '#80a1e8'},
                drawerIcon: ({focused}) => (
                  <Icon
                    name="user"
                    size={20}
                    color={focused ? '#80a1e8' : 'black'}></Icon>
                ),
              }}
            />
          </Drawer.Navigator>
        )
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="BeforeAuthNavigator"
            component={BeforeAuthNavigator}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      userAuthorized: userAuthorized,
      saveUserInfo: saveUserInfo,
    },
    dispatch,
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
    userType: state.userType.userType,
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(App);

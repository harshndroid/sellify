import {auth, database} from './FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeUserType = async userType => {
  await AsyncStorage.setItem('@user_type', userType);
};

const getOtp = phone => {
  console.log('getOtp/');
  return new Promise((resolve, reject) => {
    auth()
      .signInWithPhoneNumber(phone)
      .then(res => resolve(res))
      .catch(() => reject('Invalid Number'));
  });
};

const logout = () => {
  storeUserType('');
  console.log('logout/');
  return new Promise((resolve, reject) => {
    auth()
      .signOut()
      .then(() => resolve());
  });
};

const saveUserPhone = (phone, userType) => {
  console.log('saveUserPhone/');
  return new Promise((resolve, reject) => {
    database()
      .ref('users')
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          var usersArray = Object.values(snapshot.val());
          var userFound = usersArray.find(ele => ele.phone === phone);
          if (userFound) {
            resolve(userFound);
          } else {
            const key = database().ref().push().key;
            let data = {
              id: key,
              phone,
              userType,
            };
            database()
              .ref('users/' + key)
              .update(data)
              .then(() => resolve(data))
              .catch(e => reject(e));
          }
        } else {
          const key = database().ref().push().key;
          let data = {
            id: key,
            phone: phone,
            userType,
          };
          database()
            .ref('users/' + key)
            .update(data)
            .then(() => resolve(data))
            .catch(e => reject(e));
        }
      });
  });
};

const updateSellerData = (userData, updateData) => {
  console.log('updateSellerData/');
  const {user_id} = userData;
  return new Promise((resolve, reject) => {
    database()
      .ref('users/' + user_id)
      .update(updateData)
      .then(() => resolve())
      .catch(e => reject(e));
  });
};

const fetchCategories = () => {
  console.log('fetchCategories/');
  return new Promise((resolve, reject) => {
    database()
      .ref('/categories')
      .orderByChild('category_name')
      .once('value')
      .then(snapshot => {
        const foo = snapshot.val();
        let categories = new Set();
        let arr = Object.values(foo);
        arr.forEach((item, index) => {
          categories.add(item.category_name);
        });
        resolve(categories);
      });
  });
};

const fetchSubCategories = set => {
  console.log('fetchSubCategories/', set);
  return new Promise((resolve, reject) => {
    database()
      .ref('/sub_categories')
      .orderByChild('subcategory_name')
      .once('value')
      .then(snapshot => {
        const foo = snapshot.val();
        const data = Object.values(foo);
        // console.log('foo=====', data);
        const cats = Array.from(set);
        // console.log('====', cats);
        var hashMap = [];
        cats.map((item1, index1) => {
          var arr = [];
          data.map((item2, index2) => {
            if (item2.category_name === item1) arr.push(item2.subcategory_name);
          });

          hashMap[index1] = {[item1]: arr};
        });
        // console.log('oooo', hashMap);
        resolve(hashMap);
      });
  });
};

// temp API
const pushSubCategories = () => {
  const key = database().ref().push().key;
  let data = {
    id: key,
    category_name: 'E-Waste',
    subcategory_name: 'Large',
  };
  database()
    .ref('sub_categories/' + key)
    .update(data)
    .then(() => resolve(data))
    .catch(e => reject(e));
};

const fetchItems = () => {
  console.log('fetchItems/');
  return new Promise((resolve, reject) => {
    database()
      .ref('/categories')
      .orderByChild('category_name')
      // .equalTo(category_name)
      .once('value')
      .then(snapshot => {
        const foo = snapshot.val();
        let items = Object.values(foo);
        resolve(items);
      });
  });
};

const raisePickupRequest = request => {
  console.log('raisePickupRequest/');
  return new Promise((resolve, reject) => {
    const key = database().ref().push().key;
    let data = {
      request_id: key,
      phone: request.phone,
      pickup_address: request.address,
      pickup_time: request.pickupTime,
      pickup_items: request.items,
    };
    database()
      .ref('pickup_requests/' + key)
      .update(data)
      .then(() => resolve(data))
      .catch(e => reject(e));
  });
};

const fetchRequests = () => {
  console.log('fetchRequests/');
  return new Promise((resolve, reject) => {
    database()
      .ref('/pickup_requests')
      .orderByChild('phone')
      .once('value')
      .then(snapshot => {
        const foo = snapshot.val();
        if (!foo) reject();
        let arr = Object.values(foo);
        resolve(arr);
      })
      .catch(e => reject(e));
  });
};

const fetchBuyers = () => {
  console.log('fetchBuyers/');
  return new Promise((resolve, reject) => {
    database()
      .ref('/users')
      .orderByChild('userType')
      .once('value')
      .then(snapshot => {
        const foo = snapshot.val();
        let arr = Object.values(foo);
        const buyers = arr.filter(obj => obj.userType === 'buyer');
        resolve(buyers);
      })
      .catch(e => reject(e));
  });
};

export default {
  getOtp,
  logout,
  saveUserPhone,
  updateSellerData,
  fetchCategories,
  fetchSubCategories,
  fetchItems,
  raisePickupRequest,
  fetchRequests,
  fetchBuyers,
  pushSubCategories, // temp API
};

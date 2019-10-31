import AsyncStorage from '@react-native-community/async-storage';

const SetItem = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('AsyncStorage#setItem error: ' + error.message);
  }
};

const GetItem = async key => {
  let value = '';
  await AsyncStorage.getItem(key).then(result => {
    try {
      value = result;
    } catch (e) {
      console.error(
        'AsyncStorage#getItem error deserializing JSON for key: ' + key,
        e.message,
      );
    }
  });
  console.log(value);
  return value;
};

const RemoveItem = async key => {
  return await AsyncStorage.removeItem(key);
};
const RemoveAll = async () => {
  await AsyncStorage.clear();
};

export {SetItem, GetItem, RemoveItem, RemoveAll};

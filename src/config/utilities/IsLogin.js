import AsyncStorage from '@react-native-community/async-storage';
import {withNavigation} from 'react-navigation';

const IsLogin = async () => {
  try {
    const getID = await AsyncStorage.getItem('ID');
    console.log(getID);
    if (getID != null) {
      this.props.navigation.navigate('Home');
    } else {
      this.props.navigation.navigate('Login');
    }
  } catch (error) {
    console.log(error);
  }
};

export default withNavigation(IsLogin);

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Home,
  Order,
  Cashier,
  Notification,
  Profile,
  Login,
  OpenCashier,
  ValidationCheck,
  CloseCashier,
  NotifDetail,
  StatusOrder,
  CustomerRegister,
} from '../../containers/pages';

const HomeStack = createStackNavigator(
  {
    Home,
    CloseCashier,
    CustomerRegister,
  },
  {
    headerMode: 'none',
  },
);
const OrderStack = createStackNavigator(
  {
    Order,
    StatusOrder,
  },
  {
    headerMode: 'none',
  },
);
const CashierStack = createStackNavigator(
  {
    Cashier,
  },
  {
    headerMode: 'none',
  },
);
const NotificationStack = createStackNavigator(
  {
    Notification,
    NotifDetail,
  },
  {
    headerMode: 'none',
  },
);
const ProfileStack = createStackNavigator(
  {
    Profile,
  },
  {
    headerMode: 'none',
  },
);
const LoginStack = createStackNavigator(
  {
    Login,
    OpenCashier,
  },
  {
    headerMode: 'none',
  },
);
const Router = createSwitchNavigator(
  {
    HomeStack,
    OrderStack,
    CashierStack,
    NotificationStack,
    ProfileStack,
    LoginStack,
    ValidationCheck,
  },
  {
    headerMode: 'none',
    initialRouteName: 'LoginStack',
  },
);
export default createAppContainer(Router);

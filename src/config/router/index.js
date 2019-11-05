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
  CashierPayment,
  CashRegister,
  OmsetHariIni,
  SetoranHariIni,
  TransaksiHariIni,
  HistoryTransaksi,
  CouponSheet,
  DiscountSheet,
  PaymentSheet,
  ScanBooking,
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
    ScanBooking,
  },
  {
    headerMode: 'none',
  },
);
const CashierStack = createStackNavigator(
  {
    Cashier,
    CashierPayment,
    CouponSheet,
    DiscountSheet,
    PaymentSheet,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Cashier',
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
    CashRegister,
    OmsetHariIni,
    SetoranHariIni,
    TransaksiHariIni,
    HistoryTransaksi,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Profile',
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
    initialRouteName: 'ProfileStack',
  },
);
export default createAppContainer(Router);

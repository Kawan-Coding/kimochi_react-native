import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {GetItem} from '../service/Storage';
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
  CustomerOrder,
  CuciHelm,
  Aksesoris,
  CuciHelmKondisi,
  ShoppingCart,
} from '../../containers/pages';

let isLogin = false;
// this.getId();

// getId = async () => {
//   await GetItem('id').then(res => {
//     if (res != undefined) {
//       isLogin = true;
//     }
//   });
// };

const HomeStack = createStackNavigator(
  {
    Home,
    CloseCashier,
    CustomerRegister,
    CustomerOrder,
    CuciHelm,
    Aksesoris,
    CuciHelmKondisi,
    ShoppingCart,
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
    initialRouteName: isLogin ? 'HomeStack' : 'LoginStack',
  },
);
export default createAppContainer(Router);

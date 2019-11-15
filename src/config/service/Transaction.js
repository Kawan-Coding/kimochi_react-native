import {RequestPost, RequestPostOrder, RequestGet} from './Template';

const GetSetoranHariIni = async responsible_id => {
  const url = 'api/payment/get_setoran_hari_ini';
  let data = new FormData();
  data.append('responsible_id', responsible_id);

  return await RequestPost(url, data);
};
const GetCashRegister = async cash_flow_id => {
  const url = 'api/cashregister/get/';
  let data = new FormData();
  data.append('cash_flow_id', cash_flow_id);
  return await RequestPost(url, data);
};
const GetOmsetHariIni = async responsible_id => {
  const url = 'api/payment/get_omset_hari_ini';
  let data = new FormData();
  data.append('responsible_id', responsible_id);
  return await RequestPost(url, data);
};
const SetTakingOrder = async (cabang_id, customer_id, status, data) => {
  const url = 'api/ato/set_booking';
  let index = 0;
  let dataForm = new FormData();
  dataForm.append('cabang_id', cabang_id);
  dataForm.append('customer_id', customer_id);
  dataForm.append('status', status);
  dataForm.append('data', data);
  // data.forEach(element => {
  //   dataForm.append('data[' + index + ']', data);
  //   index++;
  // });
  console.log(dataForm);
  return await RequestPostOrder(url, dataForm);
};
const GetDiscount = async () => {
  const url = 'sapi/diskon/get_available';
  return await RequestGet(url);
};

export {
  GetSetoranHariIni,
  GetCashRegister,
  GetOmsetHariIni,
  SetTakingOrder,
  GetDiscount,
};

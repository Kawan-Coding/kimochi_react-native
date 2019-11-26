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
const GetTransaksiHariIni = async cabang_id => {
  const url = 'api/payment/get_transaksi_hari_ini';
  let data = new FormData();
  data.append('cabang_id', cabang_id);
  return await RequestPost(url, data);
};
const GetHistoryTransaksi = async (responsible_id, day) => {
  const url = 'api/payment/get_history_transaksi';
  let data = new FormData();
  data.append('responsible_id', responsible_id);
  data.append('day', day);
  return await RequestPost(url, data);
};
const SetTakingOrder = async (
  cabang_id,
  customer_id,
  status,
  data,
  dataFoto,
) => {
  const url = 'api/ato/set_booking';
  let index = 0;
  let dataForm = new FormData();
  dataForm.append('cabang_id', cabang_id);
  dataForm.append('customer_id', customer_id);
  dataForm.append('status', status);
  dataForm.append('data', data);
  let foto = [];
  // dataForm.append('data_foto', dataFoto);
  dataFoto.map((element, index) => {
    dataForm.append('img[' + index + ']', element);
  });

  // data.forEach(element => {
  //   dataForm.append('data[' + index + ']', data);
  //   index++;
  // });
  console.log(dataForm);
  return await RequestPostOrder(url, dataForm);
};
const SetFinish = async tr_id => {
  const url = 'api/ato/set_status_to_finish';
  let data = new FormData();
  data.append('tr_id', tr_id);
  return await RequestPost(url, data);
};
const GetDiscount = async () => {
  const url = 'sapi/diskon/get_available';
  return await RequestGet(url);
};
const GetPayment = async cabang_id => {
  const url = 'sapi/allowed_payment/get_where_cabang_id';
  let data = new FormData();
  data.append('cabang_id', cabang_id);
  return await RequestPost(url, data);
};
const SavePayment = async (tr_id, dataPayment) => {
  const url = 'api/payment_method/create';

  let data = new FormData();

  let dataSend = JSON.stringify(dataPayment);
  data.append('tr_id', tr_id);
  data.append('data', dataSend);
  console.log(data);
  return await RequestPost(url, data);
};
const SetPayment = async (tr_id, cabang_id, customer_id, responsible_id) => {
  const url = 'api/payment/create';
  let data = new FormData();
  data.append('tr_id', tr_id);
  data.append('cabang_id', cabang_id);
  data.append('customer_id', customer_id);
  data.append('responsible_id', responsible_id);

  return await RequestPost(url, data);
};
const GetDataWelcome = async responsible_id => {
  const url = 'api/api_get/get_data_welcome';
  let data = new FormData();
  data.append('responsible_id', responsible_id);
  return await RequestPost(url, data);
};
export {
  GetSetoranHariIni,
  GetCashRegister,
  GetOmsetHariIni,
  GetTransaksiHariIni,
  GetHistoryTransaksi,
  SetTakingOrder,
  GetDiscount,
  SetFinish,
  GetPayment,
  SavePayment,
  SetPayment,
  GetDataWelcome,
};

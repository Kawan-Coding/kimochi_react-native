import {RequestPost} from './Template';

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

export {GetSetoranHariIni, GetCashRegister, GetOmsetHariIni};

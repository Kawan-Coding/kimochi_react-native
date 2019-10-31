import {RequestPost} from './Template';

const CheckCustomerNumber = async no_telepon => {
  const url = 'sapi/customer/getByNumber';
  let data = new FormData();
  data.append('no_telepon', no_telepon);
  return await RequestPost(url, data);
};

const GetProfile = async id => {
  const url = 'sapi/pegawai/read';
  let data = new FormData();
  data.append('id', id);
  return await RequestPost(url, data);
};

const OpenCashierService = async (responsible_id, open_cash, id_pegawai) => {
  const url = 'api/cashregister/open/';
  const data = new FormData();

  console.log(id_pegawai);
  data.append('responsible_id', responsible_id);
  data.append('open_cash', open_cash);
  data.append('id_pegawai', id_pegawai);

  return await RequestPost(url, data);
};

const CloseCashierService = async (id, close_cash) => {
  const url = 'api/cashregister/close';
  let data = new FormData();
  data.append('id', id);
  data.append('close_cash', close_cash);

  return await RequestPost(url, data);
};
export {
  CheckCustomerNumber,
  GetProfile,
  OpenCashierService,
  CloseCashierService,
};

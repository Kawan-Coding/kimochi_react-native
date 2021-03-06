import {RequestPost, RequestGet} from './Template';

const GetAllOrder = async cabang_id => {
  const url = 'api/api_get/get_transaksi_order';
  let data = new FormData();
  data.append('cabang_id', cabang_id);

  return await RequestPost(url, data);
};
const GetAllBooking = async cabang_id => {
  const url = 'api/api_get/get_transaksi_booking';
  let data = new FormData();
  data.append('cabang_id', cabang_id);
  return await RequestPost(url, data);
};

const GetBarangTrId = async tr_id => {
  const url = 'api/ato/read';
  let data = new FormData();
  data.append('tr_id', tr_id);
  return await RequestPost(url, data);
};

export {GetAllOrder, GetAllBooking, GetBarangTrId};

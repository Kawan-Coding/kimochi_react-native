import {RequestPost, RequestGet} from './Template';

const AddCustomer = async (
  username,
  password,
  nama_lengkap,
  no_telepon,
  email,
  tanggal_lahir,
  kendaraan,
  plat_nomor,
  member,
  gender,
) => {
  const url = 'sapi/customer/create';
  let data = new FormData();
  data.append('username', username);
  data.append('password', password);
  data.append('nama_lengkap', nama_lengkap);
  data.append('no_telepon', no_telepon);
  data.append('kendaraan', kendaraan);
  data.append('email', email);
  data.append('tanggal_lahir', tanggal_lahir);
  data.append('plat_nomor', plat_nomor);
  data.append('member', member);
  data.append('gender', gender);
  return await RequestPost(url, data);
};

const GetDataBarangTrId = async tr_id => {
  const url = 'api/api_get/get_data_barang';
  let data = new FormData();
  data.append('tr_id', tr_id);
  return await RequestPost(url, data);
};
const GetDataBarang = async () => {
  const url = 'api/api_get/get_data_barang';
  let data = new FormData();
  data.append('hiyah', 'hiyah');
  return await RequestPost(url, data);
};
const GetCustomer = async id => {
  const url = 'sapi/customer/read';
  let data = new FormData();
  data.append('id', id);
  return await RequestPost(url, data);
};
export {AddCustomer, GetDataBarang, GetDataBarangTrId, GetCustomer};

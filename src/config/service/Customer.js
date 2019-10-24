import {RequestPost} from './Template';

const AddCustomer = async (
  username,
  password,
  nama_lengkap,
  no_telepon,
  kendaraan,
  plat_nomor,
  member,
) => {
  const url = 'sapi/customer/create';
  let data = new FormData();
  data.append('username', username);
  data.append('password', password);
  data.append('nama_lengkap', nama_lengkap);
  data.append('no_telepon', no_telepon);
  data.append('kendaraan', kendaraan);
  data.append('plat_nomor', plat_nomor);
  data.append('member', member);
  return await RequestPost(url, data);
};

export {AddCustomer};

import {RequestGet} from './Template';

const GetAllBarang = async () => {
  const url = 'api/api_get/get_transaksi';
  return await RequestGet(url);
};

export default {GetAllBarang};

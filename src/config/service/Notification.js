import {RequestGet, RequestPost} from './Template';

const GetAllNotif = async () => {
  const url = 'sapi/notifikasi/get_all';
  return await RequestGet(url);
};
const GetSingleNotif = async id => {
  const url = 'sapi/notifikasi/read';
  let data = new FormData();
  data.append('id', id);
  return await RequestPost(url, data);
};
export {GetAllNotif, GetSingleNotif};

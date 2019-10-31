import axios from 'axios';
const BaseUrl = 'http://kawankoding.kampungbudaya.com/';

const RequestPost = async (url, data) => {
  return await axios({
    url: BaseUrl + url,
    method: 'POST',
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(error => {
      console.log(error);
    });
};

const RequestGet = async url => {
  return await axios({
    url: BaseUrl + url,
    method: 'GET',

    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(error => {
      console.log(error);
    });
};

export {RequestPost, RequestGet};

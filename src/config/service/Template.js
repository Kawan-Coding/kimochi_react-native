import axios from 'axios';
const BaseUrl = 'https://kawankoding.kampungbudaya.com/';
const BaseUrlPhoto = 'https://kawankoding.kampungbudaya.com/uploads/';
const BaseUrlPhotoNotifikasi =
  'https://kawankoding.kampungbudaya.com/uploads/notifikasi/';

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
      return res;
    })
    .catch(error => {
      console.log(error);
    });
};
const RequestPostOrder = async (url, data) => {
  return await axios({
    url: BaseUrl + url,
    method: 'POST',
    data: data,
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log(error);
    });
};

export {
  RequestPost,
  RequestGet,
  RequestPostOrder,
  BaseUrl,
  BaseUrlPhoto,
  BaseUrlPhotoNotifikasi,
};

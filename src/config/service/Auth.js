import axios from 'axios';

export const Auth = async (username, password) => {
  let data = new FormData();
  data.append('username', username);
  data.append('password', password);
  //   return await axios
  //     .get('http://kawankoding.kampungbudaya.com/sapi/pegawai/get_all')
  //     .then(res => {
  //       console.log(res);
  //       return res;
  //     });

  return await axios({
    url: 'http://kawankoding.kampungbudaya.com/api/user/login',
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
  // return await axios
  //   .post('http://kawankoding.kampungbudaya.com/api/user/login', data)
  //   .then(res => {
  //     console.log(res);
  //     return res;
  //   });

  //   await fetch('http://kawankoding.kampungbudaya.com/api/user/login', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       Authorization: 'token-from-auth-api',
  //     },
  //     body: JSON.stringify({
  //       username: username,
  //       password: password,
  //     }),
  //   })
  //     .then(response => response.text())
  //     .then(responseData => {
  //       console.log(responseData);
  //       return responseData;
  //     })
  //     .catch(error => {
  //       console.log('Terjadi error: ' + error.message);
  //       throw error;
  //     });
};

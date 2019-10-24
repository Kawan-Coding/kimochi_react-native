import {RequestPost} from './Template';

const Auth = async (username, password) => {
  const url = 'api/user/login';
  let data = new FormData();
  data.append('username', username);
  data.append('password', password);
  return await RequestPost(url, data);
};

export {Auth};

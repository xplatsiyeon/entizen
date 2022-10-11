import axios from 'axios';
// import { url } from 'inspector';

const BASE_URL = 'https://test-api.entizen.kr/api';

// interface UserInfo {
//   isSuccess: boolean,
//   id: string,
//   name: string,
//   phone: number
// }

export const getUserInfo = () => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  try {
    axios({
      method: 'get',
      url: `${BASE_URL}members/info`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
      withCredentials: true,
    }).then((res) => res);
  } catch (error) {
    console.log('유저 에러!');
    console.log(error);
  }
};

import axios from 'axios';

const BASE_URL = 'https://test-api.entizen.kr/api';

export const getUserInfo = () => {
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  axios({
    method: 'get',
    url: `${BASE_URL}/members/info`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  })
    .then((res) => res)
    .catch((error) => {
      console.log('유저 에러!');
      console.log(error);
    });
};

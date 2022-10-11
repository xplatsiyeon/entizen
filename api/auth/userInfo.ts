import axios from 'axios';

export const getUserInfo = () => {
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  try {
    axios({
      method: 'get',
      url: 'https://test-api.entizen.kr/api/members/info',
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

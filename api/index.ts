import axios from 'axios';

const BASE_URL = 'https://test-api.entizen.kr/api';
const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);

// POST API
export const Postapi = async (
  endpoint: string,
  data: any,
  isToken: boolean,
) => {
  return await axios({
    method: 'post',
    url: `${BASE_URL}${endpoint}`,
    data,
    headers: {
      Authorization: isToken && `Bearer ${accessToken}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  });
};

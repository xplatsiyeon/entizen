import axios from 'axios';

interface ApiProps {
  endpoint: string;
  data?: any;
  isToken: boolean;
  Tag: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
}

const BASE_URL = 'https://test-api.entizen.kr/api';
const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);

// API 호출
export const api = async (apiInfo: ApiProps) => {
  const { Tag, data, endpoint, isToken, method } = apiInfo;

  return await axios({
    method,
    url: `${BASE_URL}${endpoint}`,
    data,
    headers: {
      Authorization: isToken && `Bearer ${accessToken}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => {
    console.log(Tag + '->' + endpoint);
    console.log(res.data);
  });
};

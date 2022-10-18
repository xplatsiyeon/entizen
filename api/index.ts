import axios from 'axios';

interface isTokenApiProps {
  endpoint: string;
  data?: any;
  Tag: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
}
interface ApiProps {
  endpoint: string;
  data?: any;
  Tag: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
}

const BASE_URL = 'https://test-api.entizen.kr/api';

// API 호출 (로그인)
export const isTokenApi = async (apiInfo: isTokenApiProps) => {
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const { Tag, data, endpoint, method } = apiInfo;

  return await axios({
    method,
    url: `${BASE_URL}${endpoint}`,
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => {
    console.log(Tag + '->' + endpoint);
    console.log(res.data);
  });
};
// API 호출 (비로그인)
export const api = async (apiInfo: ApiProps) => {
  const { Tag, data, endpoint, method } = apiInfo;

  return await axios({
    method,
    url: `${BASE_URL}${endpoint}`,
    data,
    headers: {
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => {
    console.log(Tag + '->' + endpoint);
    console.log(res.data);
  });
};

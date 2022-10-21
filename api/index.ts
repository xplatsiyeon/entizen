import axios, { AxiosResponse } from 'axios';

interface ApiProps {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  endpoint: string;
  data?: any;
}
interface ApiPropsT<T> {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  endpoint: string;
  data?: T;
}

const BASE_URL = 'https://test-api.entizen.kr/api';

// API 호출 (토큰 O)
export const isTokenApi = async (apiInfo: ApiProps) => {
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const { data, endpoint, method } = apiInfo;

  return await axios({
    method,
    url: `${BASE_URL}${endpoint}`,
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => res);
};

// API 호출 (토큰 X)
export const api = async (apiInfo: ApiProps) => {
  const { data, endpoint, method } = apiInfo;

  return await axios({
    method,
    url: `${BASE_URL}${endpoint}`,
    data,
    headers: {
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => res.data);
};

// API 호출 (토큰 O) 제너릭 테스트
export async function isTokenApiT<T>(apiInfo: ApiPropsT<T>) {
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const { data, endpoint, method } = apiInfo;

  return await axios({
    method,
    url: `${BASE_URL}${endpoint}`,
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => res);
}

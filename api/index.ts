import axios, { AxiosResponse } from 'axios';

interface ApiProps {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  endpoint: string;
  data?: any;
}
interface PostAPi {
  url: string;
  data?: any;
}

const BASE_URL = 'https://test-api.entizen.kr/api';
// get => getApi / isTokenGetApi
// put => postApi / isTokenPostApi
// put => isTokenPutApi
//delete => isTokenDeleteApi

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

// -----------------------------get-api--------------------------------------
// API 호출 (토큰 X)
export const getApi = async (url: string) => {
  return await axios({
    method: 'GET',
    url: `${BASE_URL}${url}`,
    headers: {
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => res.data);
};
// API 호출 (토큰 O)
export const isTokenGetApi = async (url: string) => {
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  return await axios({
    method: 'GET',
    url: `${BASE_URL}${url}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => res);
};
// -----------------------------post-api--------------------------------------
// API 호출 (토큰 X)
export const postApi = async (url: string, data: any) => {
  return await axios({
    method: 'POST',
    url: `${BASE_URL}${url}`,
    data,
    headers: {
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => res.data);
};
// API 호출 (토큰 O)
// export const isTokenPostApi = async (url: string, data: any) => {
export const isTokenPostApi = async (apiInfo: PostAPi) => {
  const { url, data } = apiInfo;
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  return await axios({
    method: 'POST',
    url: `${BASE_URL}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => res);
};
// -----------------------------patch/put-api--------------------------------------
// API 호출 (토큰 O)
export const isTokenPatchApi = async (url: string, data: string) => {
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  return await axios({
    method: 'PATCH',
    url: `${BASE_URL}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => res);
};
// -----------------------------delete-api--------------------------------------
// API 호출 (토큰 O)
export const isTokenDeleteApi = async (url: string, data: string) => {
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  return await axios({
    method: 'DELETE',
    url: `${BASE_URL}${url}`,
    // data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => res);
};

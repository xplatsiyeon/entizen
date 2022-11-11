import axios, { AxiosResponse } from 'axios';

interface ApiProps {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  endpoint: string;
  data?: any;
}
interface PropsApi {
  url: string;
  data?: any;
}

const BASE_URL = 'https://test-api.entizen.kr/api';
export const accessToken = JSON.parse(
  window.localStorage.getItem('ACCESS_TOKEN')!,
);

// API 호출 (토큰 O)
export const isTokenApi = async (apiInfo: ApiProps) => {
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
  return await axios({
    method: 'GET',
    url: `${BASE_URL}${url}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => res.data);
};
// -----------------------------post-api--------------------------------------
// API 호출 (토큰 O)
// export const isTokenPostApi = async (url: string, data: any) => {
export const isTokenPostApi = async (apiInfo: PropsApi) => {
  const { url, data } = apiInfo;
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
export const isTokenPatchApi = async (apiInfo: PropsApi) => {
  const { url, data } = apiInfo;
  return await axios({
    method: 'PATCH',
    url: `${BASE_URL}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => res.data);
};
// -----------------------------delete-api--------------------------------------
// API 호출 (토큰 O)
export const isTokenDeleteApi = async (apiInfo: PropsApi) => {
  const { url, data } = apiInfo;
  return await axios({
    method: 'DELETE',
    url: `${BASE_URL}${url}`,
    // data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => res.data);
};

// ---------------------------------- multer Img -----------------------------------
export async function multerApi(formData: any): Promise<any> {
  return axios({
    method: 'POST',
    url: `${BASE_URL}/files`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      // ContentType: 'multipart/form-data; charset=EUC-KR',
      'Content-Type': 'multipart/form-data; charset=utf-8',
      // Accept: 'application/json; charset=utf-8',
      Accept: '*/*',
    },
    data: formData,
    withCredentials: true,
  }).then((res) => res.data);
}

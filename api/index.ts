import axios from 'axios';
interface ApiProps {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  endpoint: string;
  data?: any;
}
export interface PropsApi {
  url: string;
  data?: any;
}

export const BASE_URL = 'https://api.entizen.kr/api';
// 로컬에서 사용할때만 활성화 시키기
// export const BASE_URL = `/api`;

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
  }).then((res) => res.data);
};
// -----------------------------post-api (token X)--------------------------------------
// API 호출 (토큰 O)
// export const isTokenPostApi = async (url: string, data: any) => {
export const isPostApi = async (apiInfo: PropsApi): Promise<any> => {
  const { url, data } = apiInfo;
  return await axios({
    method: 'POST',
    url: `${BASE_URL}${url}`,
    data,
    headers: {
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => res);
};
// -----------------------------post-api (token O)--------------------------------------
// API 호출 (토큰 O)
// export const isTokenPostApi = async (url: string, data: any) => {
export const isTokenPostApi = async (apiInfo: PropsApi): Promise<any> => {
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
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
// -----------------------------patch-api--------------------------------------
// API 호출 (토큰 O)
export const isTokenPatchApi = async (apiInfo: PropsApi) => {
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
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
// -----------------------------put-api--------------------------------------
// API 호출 (토큰 O)
export const isTokenPutApi = async (apiInfo: PropsApi) => {
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const { url, data } = apiInfo;
  return await axios({
    method: 'PUT',
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
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
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
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  return axios({
    method: 'POST',
    url: `${BASE_URL}/files`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'multipart/form-data; charset=EUC-KR',
      Accept: '*/*',
    },
    data: formData,
    withCredentials: true,
  }).then((res) => res.data);
}

// ------------------------------admin------------------------------------

// API 호출 (토큰 O)
export const isTokenAdminGetApi = async (url: string) => {
  const accessToken = JSON.parse(localStorage.getItem('ADMIN_ACCESS_TOKEN')!);
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
export const isTokenAdminPostApi = async (apiInfo: PropsApi): Promise<any> => {
  const accessToken = JSON.parse(localStorage.getItem('ADMIN_ACCESS_TOKEN')!);
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
// API 호출 (토큰 O)
export const isTokenAdminPatchApi = async (apiInfo: PropsApi) => {
  const accessToken = JSON.parse(localStorage.getItem('ADMIN_ACCESS_TOKEN')!);
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
// API 호출 (토큰 O)
export const isTokenAdminPutApi = async (apiInfo: PropsApi) => {
  const accessToken = JSON.parse(localStorage.getItem('ADMIN_ACCESS_TOKEN')!);
  const { url, data } = apiInfo;
  return await axios({
    method: 'PUT',
    url: `${BASE_URL}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => res.data);
};

// API 호출 (토큰 O)
export const isTokenAdminPutExcelApi = async (apiInfo: PropsApi) => {
  const accessToken = JSON.parse(localStorage.getItem('ADMIN_ACCESS_TOKEN')!);
  const { url, data } = apiInfo;
  return await axios({
    method: 'PUT',
    url: `${BASE_URL}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      contentType: false,
      processData: false,
      enctype: 'multipart/form-data',
    },
    withCredentials: true,
  }).then((res) => res.data);
};

// API 호출 (토큰 O)
export const isTokenAdminDeleteApi = async (apiInfo: PropsApi) => {
  const accessToken = JSON.parse(localStorage.getItem('ADMIN_ACCESS_TOKEN')!);
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
export async function multerAdminApi(formData: any): Promise<any> {
  const accessToken = JSON.parse(localStorage.getItem('ADMIN_ACCESS_TOKEN')!);
  return axios({
    method: 'POST',
    url: `${BASE_URL}/files`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'multipart/form-data; charset=EUC-KR',
      Accept: '*/*',
    },
    data: formData,
    withCredentials: true,
  }).then((res) => res.data);
}

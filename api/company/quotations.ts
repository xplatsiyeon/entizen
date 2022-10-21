import axios from 'axios';

const BASE_URL = 'https://test-api.entizen.kr/api';

interface Chargers {
  kind: string;
  standType: string;
  channel: string;
  count: number;
}

export interface QuotationsDetail {
  isSuccess: boolean;
  receivedQuotationRequest: {
    badge: string;
    installationAddress: string;
    subscribeProduct: string;
    subscribePeriod: number;
    investRate: string;
    chargers: Chargers[];
    installationLocation: string;
    installationPurpose: string;
    etcRequest: string;
  };
}

export interface File {
  url: string;
  size: number;
  originalName: string;
}

export interface Products {
  representationImageUrl: string;
  modelName: string;
  manufacturer: string;
  watt: string;
  catalogFiles: File[];
  chargerProductFile: File[];
  feature: string;
}

// 받은요청 상세페이지
export const quotationsDetail = (routerId: string | string[]) => {
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  // const { data, endpoint, method } = apiInfo;
  return axios({
    method: 'get',
    url: `${BASE_URL}/quotations/received-request/${routerId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => res);
};

// 제품 리스트
export const productList = () => {
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  return axios({
    method: 'get',
    url: `${BASE_URL}/products`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => res);
};

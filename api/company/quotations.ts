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

// API 호출 (토큰 O)
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

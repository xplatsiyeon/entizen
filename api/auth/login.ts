import axios from 'axios';

const BASE_URL = 'https://test-api.entizen.kr/api';

// 로그인 API
export const onSubmitCompany = async (data: any) => {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/members/join`,
    data,
    headers: {
      ContentType: 'application/json',
    },
    withCredentials: true,
  });
};

// 아이디 중복체크
export const ValidIdCheck = async (
  idInput: string,
  tpye: 'USER' | 'COMPANY',
) => {
  const url = `${BASE_URL}/members?id=${idInput}&memberType=${tpye}`;
  return await axios({
    method: 'get',
    url,
  }).then((res) => res.data);
};

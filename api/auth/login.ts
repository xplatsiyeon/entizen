import axios from 'axios';
const BASE_URL = 'https://test-api.entizen.kr/api';

// 로그인 API
export const onSubmitCompany = async (data: any) => {
  try {
    return await axios({
      method: 'post',
      url: `${BASE_URL}/members/join`,
      data,
      headers: {
        ContentType: 'application/json',
      },
      withCredentials: true,
    });
  } catch (error) {
    alert('오류가 발생했습니다. 다시 시도해주세요.');
  }
};
// 아이디 중복체크
export const ValidIdCheck = async (
  idInput: string,
  tpye: 'USER' | 'COMPANY',
) => {
  const url = `${BASE_URL}/members?id=${idInput}&memberType=${tpye}`;
  try {
    return await axios({
      method: 'get',
      url,
    }).then((res) => res.data);
  } catch (error) {
    alert('오류가 발생했습니다. 다시 시도해주세요.');
  }
};

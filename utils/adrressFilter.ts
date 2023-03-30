// <script language="javascript">
/*
모의 해킹 테스트 시 검색API를 호출하시면 IP가 차단 될 수 있습니다. 
주소검색API를 제외하시고 테스트 하시기 바랍니다.
*/
/*도로명주소 API 호출시 검색어에 특수문자 또는 OR, INSERT, UNION 등 SQL예약어가 포함될 경우
보안장비가 SQL INJECTION공격으로 간주하여 해당 IP를 차단시킬 수 있습니다.
사용자분들은 API호출시 검색어 필터링를 적용하여 주시기 바랍니다.*/

import axios from 'axios';

//특수문자, 특정문자열(sql예약어의 앞뒤공백포함) 제거
export const checkSearchedWord = (keyword: string) => {
  if (keyword.length > 0) {
    //특수문자 제거
    var expText = /[%=><]/;
    if (expText.test(keyword) == true) {
      alert('특수문자를 입력 할수 없습니다.');
      keyword = keyword.split(expText).join('');
      return false;
    }

    //특정문자열(sql예약어의 앞뒤공백포함) 제거
    var sqlArray = new Array(
      //sql 예약어
      'OR',
      'SELECT',
      'INSERT',
      'DELETE',
      'UPDATE',
      'CREATE',
      'DROP',
      'EXEC',
      'UNION',
      'FETCH',
      'DECLARE',
      'TRUNCATE',
    );

    var regex;
    for (var i = 0; i < sqlArray.length; i++) {
      regex = new RegExp(sqlArray[i], 'gi');

      if (regex.test(keyword)) {
        alert(
          '"' + sqlArray[i] + '"와(과) 같은 특정문자로 검색할 수 없습니다.',
        );
        keyword = keyword.replace(regex, '');
        return false;
      }
    }
  }
  return true;
};

export async function getJuso(value: string) {
  let answer: any = [];
  await axios
    .get(
      `https://business.juso.go.kr/addrlink/addrLinkApiJsonp.do?currentPage=1&countPerPage=50&keyword=${value}&confmKey=${process.env.NEXT_PUBLIC_ADDRESS_FIND_KEY}&resultType=json`,
    )
    .then((data) => {
      const match = data.data.match(/\((.*)\)/);
      let jsonResult = JSON.parse(match[1].toString()).results.juso;
      jsonResult?.map((el: any, index: number) => {
        answer.push(el);
      });
    });

  return answer;
}

// -----------기본 가격 콤마 계산----------------
export const PriceBasicCalculation = (price: number) => {
  if (price === 0) return 0;
  if (price) {
    const parts = price.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
};
// -----------간편 견적 가격 콤마 계산----------------
export const PriceCalculation = (price: number) => {
  if (price === 0) return 0;
  if (price) {
    let stringPrice = price.toString();
    // const parts = price.toString().slice(0, -4).split('.');
    // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // return parts.join('.');
    if (stringPrice.length <= 6) {
      const parts = price.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{4})+(?!\d))/g, '.');
      return parts.join('.').slice(0, -3);
    } else {
      const parts = price.toString().slice(0, -4).split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    }
  }
};
// --------------- 인풋 콤마 계산 함수 ----------------
export const inputPriceFormat = (str: string) => {
  // 콤마 추가
  const comma = (str: string) => {
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  };
  // 모든 문자열을 공백으로 바꾼다.
  const uncomma = (str: string) => {
    return str.replace(/[^\d]+/g, '');
  };
  return comma(uncomma(str));
};

// --------------- 파일 용량 체크 함수 ----------------

export const getByteSize = (size: number) => {
  const byteUnits = ['KB', 'MB', 'GB', 'TB'];
  for (let i = 0; i < byteUnits.length; i++) {
    size = Math.floor(size / 1024);
    if (size < 1024) return size.toFixed(1) + byteUnits[i];
  }
};

//------------- 영->한 값 변환 --------------------
export const convertKo = (
  arr: string[],
  arrEn: string[],
  value: string | undefined,
) => {
  // return target.indexOf(value);
  // console.log(value);
  if (value) {
    const index = arrEn.indexOf(value);
    return arr[index];
  } else {
    return '';
  }
};
//----------------- 한->영 값 변환 ------------------
export const convertEn = (
  arr: string[],
  arrEn: string[],
  value: string | undefined,
) => {
  // return target.indexOf(value);
  if (value) {
    const index = arr.indexOf(value);
    return arrEn[index];
  } else {
    return '';
  }
};

// --------------휴대폰 하이픈 넣기-----------------------------
export const hyphenFn = (target: string) => {
  return target
    ?.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
    ?.replace(/\-{1,2}$/g, '');
};

// ---------- 년월일 데이터 넣기 ------------------
/**
 * 백엔드 데이터 년월일 추가 해주는 함수
 * @param target "2022-10-03"
 */
export const changeDataFn = (target: string) => {
  if (target) {
    const arrTarget = target.split('-');
    const year = arrTarget[0] + '년';
    const month = arrTarget[1] + '월';
    const day = arrTarget[2] + '일';

    return `${year} ${month} ${day}`;
  } else {
    return '';
  }
};

// ---------- 요일 반환 함수 -------------
/**
 *
 * @param data "2022-10-03"
 * @returns "월" | "화" | "수" | "목" | "금" | "토" | "일"
 *
 */
export const getDayOfWeek = (data: string) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  const dayOfWeek = week[new Date(data).getDay()];

  return dayOfWeek;
};

// ------------- 날짜 포맷 함수 -------------------
/**
 * 포맷형식 -> 년.월.일 시간:분
 * @param date "2022-11-22T03:48:01.124Z"
 * @returns "2022.11.22 03:48"
 */
export const originDateFomat = (date: string) => {
  let result = '';
  if (date) {
    result = date
      .replace('T', ' ')
      .replace(/\..*/, '')
      .slice(0, -3)
      .replaceAll('-', '.');
  }

  return result;
};

// export const dateFomat = (date: string) => {
//   let result = '';
//   let minute = '';
//   let joinText = '';
//   if (date) {
//     const beforeDate = new Date(date);
//     const newDate = new Intl.DateTimeFormat('ko-KR', {
//       year: 'numeric',
//       month: 'numeric',
//       day: 'numeric',
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//       hour12: false,
//       timeZone: 'asia/seoul',
//     })?.format(beforeDate);

//     if (newDate) {
//       result = newDate.replace('시', ':').slice(0, -8);
//       minute = newDate.slice(18, 20);
//       if (minute.indexOf('분') === 1) {
//         newDate.slice(18, 19);
//         minute = '0' + newDate.slice(18, 19);
//       }

//       joinText = result + minute;
//     }
//   }
//   return joinText;
// };

export const dateFomat = (date: string) => {
  let result = '';
  if (date) {
    //ms단위라 60000곱해줌
    result = date;
    const beforeDate = new Date(date);
    const offset = beforeDate.getTimezoneOffset() * 60000;
    const dateOffset = new Date(beforeDate.getTime() - offset).toISOString();
    // console.log('dateOffset', dateOffset);
    const year = dateOffset.replace(/-/g, ' .').slice(0, 12);
    // console.log('year', year);
    const time = dateOffset.slice(11, 16);
    // console.log('time', time);
    result = year + ' ' + time;
  }
  return result;
};
// 관리자 페이지에서 사용하는 날짜변환 함수
export const dateFormat = (date: string) => {
  const newDate = new Date(date);
  return new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T', 1)
    .toString()
    .replaceAll('-', '.');
};

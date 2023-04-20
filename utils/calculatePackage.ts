export const checkedPassword = (password: string): boolean => {
  const check =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/.test(
      password,
    );
  return check;
};

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
  low?: boolean,
) => {
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
export const hyphenFn = (target: string | undefined) => {
  if (target) {
    return target
      ?.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      ?.replace(/\-{1,2}$/g, '');
  } else {
    return '';
  }
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
export const adminDateFomat = (date: Date | string) => {
  if (date) {
    const newDate = new Date(date);
    return new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000)
      ?.toISOString()
      ?.split('T', 1)
      ?.toString();
    // ?.replaceAll('-', '.');
  } else {
    return '';
  }
};

// url 데이터 보낼때 오늘 날짜 변경
export const adminNoPickDateFomat = (date: string) => {
  if (date) {
    const newDate = new Date(date);
    return new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000)
      ?.toISOString()
      ?.split('T', 1)
      ?.toString();
  } else {
    return '';
  }
};

// 승인 미승인 계산하는 함수
export const isAdminJoinApprovedString = (value: boolean) => {
  if (value === true) {
    return '승인';
  } else if (value === false) {
    return '미승인';
  }
};

// 백엔드에 보내는 승인, 미승인 boolean 값
export const isAdminJoinApprovedBoolean = (value: string) => {
  if (value === '승인') {
    return true;
  } else if (value === '미승인') {
    return false;
  }
};

// 생년월일 계산 콤마 함수
export const addCommaBirthDay = (birthDay: string) => {
  if (birthDay) {
    const year = birthDay.slice(0, 4);
    const month = birthDay.slice(4, 6);
    const day = birthDay.slice(6, 8);
    // console.log(year);
    // console.log(month);
    // console.log(day);

    return `${year}.${month}.${day}`;
  } else {
    return '-';
  }
};

// 며칠전, 몇주전 계산해주는 함수
const koreaDate = (createdAt: string) => {
  const offset = 1000 * 60 * 60 * 9;
  return new Date(new Date(createdAt).getTime() + offset);
};

export const CalcDate = (endDate: string) => {
  const seconds = 1;
  // 분
  const minute = seconds * 60;
  // 시
  const hour = minute * 60;
  // 일
  const day = hour * 24;

  // 1주
  const firstWeek = day * 7;
  // 2주
  const secondWeek = firstWeek * 2;
  // 3주
  const thirdWeek = firstWeek * 3;
  // 4주
  const fourthWeek = firstWeek * 4;
  // 5주
  const fifthWeek = firstWeek * 5;

  const nowDate = new Date();
  const today = koreaDate(nowDate.toString());
  const newDate = koreaDate(endDate);
  const elapsedTime = Math.trunc((today.getTime() - newDate.getTime()) / 1000);

  let elapsedText = '';
  if (elapsedTime < seconds) {
    elapsedText = '방금 전';
  } else if (elapsedTime < minute) {
    elapsedText = elapsedTime + '초 전';
  } else if (elapsedTime < hour) {
    elapsedText = Math.trunc(elapsedTime / minute) + '분 전';
  } else if (elapsedTime < day) {
    elapsedText = Math.trunc(elapsedTime / hour) + '시간 전';
  } else if (elapsedTime > firstWeek - 1 && elapsedTime < secondWeek) {
    elapsedText = '1주 전';
  } else if (elapsedTime > secondWeek && elapsedTime < thirdWeek) {
    elapsedText = '2주 전';
  } else if (elapsedTime > thirdWeek && elapsedTime < fourthWeek) {
    elapsedText = '3주 전';
  } else if (elapsedTime > fourthWeek && elapsedTime < fifthWeek) {
    elapsedText = '4주 전';
  } else if (elapsedTime < day * 28) {
    elapsedText = Math.trunc(elapsedTime / day) + '일 전';
  } else {
    // elapsedText = adminDateFomat(newDate.toString()).substring(0, 12);
    // elapsedText = adminDateFomat(newDate.toString());
    elapsedText = adminDateFomat(newDate);
  }

  return elapsedText;
};

// ---------------- 모두 싸인 년, 월, 일 -------------
export const moduSignDate = (date: string) => {
  if (date) {
    const newDate = new Date(date);
    let fullDate = '';
    let year = '';
    let month = '';
    let day = '';
    fullDate = new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000)
      ?.toISOString()
      ?.split('T', 1)
      ?.toString();
    year = `${fullDate.slice(0, 4)}년 `;
    month = `${fullDate.slice(5, 7)}월 `;
    day = `${fullDate.slice(8, 10)}일`;
    return `${year + month + day}`;
  } else {
    return '';
  }
};

/**
 * 오늘 날짜 구하기
 * @returns 2022-10-03
 */
export const getToday = () => {
  const newDate = new Date();
  const year = newDate.getFullYear().toString();
  const month = newDate.getMonth() + 1 + '';
  const date = newDate.getDate().toString();
  return `${year}-${month}-${date}`;
};

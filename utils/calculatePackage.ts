// --------------- 인풋 계산 함수 ----------------
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

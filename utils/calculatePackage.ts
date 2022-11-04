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

// -------------------------------------------

import colors from 'styles/colors';

// 회사 뱃지 변환
export const HandleColor = (badge: string | undefined): string => {
  if (badge) {
    if (badge.includes('마감')) {
      return colors.sub4;
    } else if (badge.includes('현장실사') || badge.includes('최종견적')) {
      return colors.main;
    } else if (badge.includes('대기')) {
      return colors.yellow;
    } else if (badge.includes('낙찰성공')) {
      return colors.main2;
    } else if (badge.includes('견적취소') || badge.includes('낙찰실패')) {
      return colors.lightGray3;
    } else return colors.main;
  } else {
    return '';
  }
};

// 구매자 뱃지 변환

/**
 * 구매자 뱃지 변환
 * @param badge 뱃지 데이터
 * @returns "" | 뱃지 컬러
 */
export const HandleUserColor = (badge: string | undefined): string => {
  if (badge) {
    if (badge.includes('마감')) return '#F75015';
    else if (badge.includes('대기 중')) return '#FFC043';
    else if (badge.includes('취소')) return '#CACCD1';
    else return '#5A2DC9';
  } else {
    return '';
  }
};

export const handleColor = (badge: string | undefined): string => {
  if (badge) {
    if (badge.includes('계약대기')) {
      return '#F75015';
    } else if (badge.includes('준비') || badge.includes('설치')) {
      return colors.main;
    } else if (badge.includes('검수 중')) {
      return '#FFC043';
    } else if (badge.includes('완료')) {
      return '#222222';
    } else if (badge.includes('프로젝트')) {
      return '#CACCD1';
    } else {
      return '';
    }
  } else {
    return '';
  }
};
<<<<<<< HEAD

export const handleColor2 = (badge: number) => {
    if (badge === 0) {
      return colors.main;
    } else if (badge === 1) {
      return '#FFC043';
    } else if (badge === 2) {
      return '#F75015';
    } else if (badge === 3) {
      return '#222222';
    } else if (badge === 4) {
      return '#CACCD1';
    } else {
      return '';
    }
  } 
=======
>>>>>>> 0f4b857defebe4ab33d9c5253c19037f1890cc3a

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
export const HandleUserColor = (badge: string): string => {
  if (badge.includes('마감')) return '#F75015';
  else if (badge.includes('대기 중')) return '#FFC043';
  else if (badge.includes('취소')) return '#CACCD1';
  else return '#5A2DC9';
};

import colors from 'styles/colors';


// 판매자 견적서 뱃지 변환
export const HandleColor = (badge: string | undefined): string => {
  if (badge) {
    if (badge.includes('마감') || badge.includes('선택대기')) {
      return colors.sub4;
    } else if (badge.includes('현장실사') || badge.includes('최종견적')) {
      return colors.main;
    } else if (badge.includes('낙찰대기 중') || badge.includes('최종대기 중')) {
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

/**
 * 구매자 내 견적서 뱃지 변환
 * @param badge 뱃지 데이터
 * @returns "" | 뱃지 컬러
 */

export const HandleUserColor = (badge: string | undefined): string => {
  if (badge) {
    if (badge.includes('마감')) return colors.sub4;
    else if (badge.includes('대기 중')) return colors.yellow;
    else if (badge.includes('취소')) return colors.lightGray3;
    else return colors.main;
  } else {
    return '';
  }
};

/**
 * 내 프로젝트 전용 뱃지 컬러 (판매자, 구매자)
 * @param badge
 * @returns
 */

export const handleColor = (badge: string): string => {
  if (badge) {
    if (badge?.includes('계약대기')) {
      return '#F75015';
    } else if (badge?.includes('준비') || badge?.includes('설치')) {
      return colors.main;
    } else if (badge?.includes('검수 중')) {
      return '#FFC043';
    } else if (badge?.includes('완료')) {
      return '#222222';
    } else if (badge?.includes('프로젝트')) {
      return '#CACCD1';
    } else {
      return '';
    }
  } else {
    return '';
  }
};

/**
 * 내 충전소 전용 뱃지 컬러 (구매자)
 * @param badge
 * @returns
 */

export const handleColor2 = (badge: number) => {
  if (badge > 100) {
    return colors.main;
  } else if (badge > 30 && badge <= 99) {
    return '#FFC043';
  } else if (badge <= 30) {
    return '#F75015';
  } else if (!badge) {
    return '#222222';
  } else {
    return '#CACCD1';
  }
};

/**
 * A/S 전용 뱃지 컬러 (구매자, 판매자)
 * @param badge
 * @returns
 */

export const handleColorAS = (badge: string) => {
  if (badge?.includes('요청') || badge?.includes('선택대기')) {
    return '#F75015';
  } else if (badge?.includes('확인')) {
    return '#5221CB';
  } else if (badge?.includes('대기')) {
    return '#FFC043';
  } else if (badge?.includes('A/S')) {
    return '#222222';
  } else {
    return '';
  }
};


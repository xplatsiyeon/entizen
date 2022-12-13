import dayjs from "dayjs";

  /*메세지 시간 표현 처리 함수 */
  export const handleTime = (target: string | undefined) => {
    const get = dayjs(target);
    const now = dayjs();
    const diff = now.diff(get, 'd');
    const h = dayjs(target).get('h')
    if (diff === 0) {
      //오전, 오후로 나누기
      console.log(get.format('HH:mm'), h)
      if (Number(h) > 12) {
        const pm = get.subtract(12,'h').format('HH:mm')
        return `오후 ${pm}`;
      }else if(Number(h) === 12){
        const pm12 = get.format('HH:mm')
        return `오후 ${pm12}`
      }else {
        const am = get.format('HH:mm')
        return `오전 ${am}`;
      }
    } else if (diff === 1) {
      if (Number(h) > 12) {
        const pm = get.subtract(12,'h').format('HH:mm')
        return `어제 오후 ${pm}`;
      } else {
        const am = get.format('HH:mm')
        return `어제 오전 ${am}`;
      }
    } else {
      const year = dayjs(target).get('y');
      const month = dayjs(target).get('month');
      const day = dayjs(target).get('day');

      if (now.get('y') !== year) {
        return `${year}년 ${month}월 ${day}일`;
      } else {
        return `${month}월 ${day}일 `;
      }
    }
  };
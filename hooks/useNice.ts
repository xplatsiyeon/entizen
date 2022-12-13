import axios from 'axios';
import { useEffect, useState } from 'react';

const useNice = () => {
  const [data, setData] = useState<any>();
  // 나이스 인승
  const fnPopup = (event: any) => {
    const { value } = event.currentTarget;

    if (typeof window !== 'object') return;
    else {
      window.open(
        '',
        'popupChk',
        'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
      );
      let cloneDocument = document as any;
      cloneDocument.form_chk.action =
        'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
      cloneDocument.form_chk.target = 'popupChk';
      cloneDocument.form_chk.submit();
    }
  };
  // 나이스 인증
  useEffect(() => {
    const memberType = 'USER';
    axios({
      method: 'post',
      url: 'https://api.entizen..kr/api/auth/nice',
      data: { memberType },
    })
      .then((res) => {
        setData(res.data.executedData);
      })
      .catch((error) => {
        console.error('나이스 인증 에러 발생');
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, fnPopup];
};

export default useNice;

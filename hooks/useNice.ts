import axios from 'axios';
import { useEffect, useState } from 'react';

const useNice = () => {
  const [data, setData] = useState<any>();
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  // 나이스 인승
  const fnPopup = (event: any) => {
    console.log('check');
    console.log(event?.currentTarget.value);
    const { value } = event.currentTarget;
    if (value === 'id') {
      setIsId(true);
      console.log('id입니다');
    }
    if (value === 'password') {
      setIsPassword(true);
      console.log('passowrd입니다');
    }
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
      url: 'https://test-api.entizen.kr/api/auth/nice',
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
  return [data, isId, isPassword, fnPopup];
};

export default useNice;

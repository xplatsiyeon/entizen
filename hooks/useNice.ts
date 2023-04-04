// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const useNice = () => {
//   const [data, setData] = useState<any>();
//   // 나이스 인승
//   const fnPopup = (event: any) => {
//     const { value } = event.currentTarget;

//     if (typeof window !== 'object') return;
//     else {
//       window.open(
//         '',
//         'popupChk',
//         'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
//       );
//       let cloneDocument = document as any;
//       cloneDocument.form_chk.action =
//         'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
//       cloneDocument.form_chk.target = 'popupChk';
//       cloneDocument.form_chk.submit();
//     }
//   };
//   // 나이스 인증
//   useEffect(() => {
//     const memberType = 'USER';
//     axios({
//       method: 'post',
//       url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/nice`,
//       data: { memberType },
//     })
//       .then((res) => {
//         setData(res.data.executedData);
//       })
//       .catch((error) => {
//         console.error('나이스 인증 에러 발생');
//         console.error(error);
//       });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return [data, fnPopup];
// };

// export default useNice;

import axios from 'axios';
import { useEffect, useState } from 'react';

interface FindKey {
  id: string;
  isMember: boolean;
  memberIdx: number;
  name: string;
  phone: string;
  snsType: string;
}

const useNice = () => {
  const [data, setData] = useState<any>();
  // 나이스 인승
  const fnPopup = () => {
    console.log('훅훅훅');
    if (typeof window !== 'object') return;
    else {
      window.open(
        '',
        'popupChk',
        'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
      );

      // 새 창 팝업에 액션 함수 수동으로 연결(get).
      let cloneDocument = document as any;
      cloneDocument.form_chk.action =
        'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
      cloneDocument.form_chk.target = 'popupChk';

      // 위의 url로 get(), 나이스에서 인증된 회원정보를 백엔드로 보냄.
      cloneDocument.form_chk.submit();
    }
  };

  // 인증된 정보의 회원 유효성검사
  // cloneDocument.form_chk.submit(); 다음 실행될 함수
  const onSubmitBtn = () => {
    let key = sessionStorage.getItem('key');
    // console.log('key ===>', key);
    let data: FindKey = JSON.parse(key!);
    // console.log('data==>', data);

    //동작 예시 코드.
    // if (data.name === name && data.id === id) {
    //   setStep(1);
    // } else {
    //   sessionStorage.removeItem('key');
    //   setIsModal(true);
    //   setModalMsg(
    //     '아이디와 회원정보가 일치하지 않습니다.\n다시 입력해주세요.',
    //   );
    // }
  };

  return { fnPopup, onSubmitBtn };
};

export default useNice;

import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Props = {};

const Tests = (props: Props) => {
  const [data, setData] = useState<any>();
  // let form_chk: any;
  const fnPopup = () => {
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
      // document.form_chk.action =
      //   'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
      // document.form_chk.target = 'popupChk';
      // document.form_chk.submit();
      //   form_chk.action =
      //     'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
      //   form_chk.target = 'popupChk';
      //   form_chk.submit();
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // form_chk = document.getElementsByName('form_chk') as any as HTMLElement;
    const memberType = 'USER';

    axios({
      method: 'post',
      url: 'https://test-api.entizen.kr/api/auth/nice',
      data: { memberType },
    })
      .then((res) => {
        // console.log(res.data);
        setData(res.data.executedData);
        // encodeData = res.data.executedData;
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function decryptResult(decryptResult: any) {
    console.log(decryptResult);
  }

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <form name="form_chk" method="post">
        <input type="hidden" name="m" value="checkplusService" />
        {/* <!-- 필수 데이타로, 누락하시면 안됩니다. --> */}
        <input
          type="hidden"
          id="encodeData"
          name="EncodeData"
          value={data !== undefined && data}
        />
        {/* <!-- 위에서 업체정보를 암호화 한 데이타입니다. --> */}

        {/* <button onClick={(e) => Go(e)}>CheckPlus 안심본인인증 Click</button> */}
        <button onClick={() => fnPopup()}>CheckPlus 안심본인인증 Click</button>
        {/* <a href="javascript:fnPopup();"> CheckPlus 안심본인인증 Click</a> */}
      </form>
    </div>
  );
};

export default Tests;

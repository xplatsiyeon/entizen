import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Props = {};

interface Window {
  MyNamespace: any;
}

const Tests = (props: Props) => {
  const [data, setData] = useState<any>();
  const [userInfo, setUserInfo] = useState();
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
    }
  };

  useEffect(() => {
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

  useEffect(() => {
    // var inputValue = document.querySelector('phoneInput').value;
    const test: any = document.querySelector('phoneInput');
    console.log(test);
    setUserInfo(test);
  }, [userInfo]);

  useEffect(() => {
    console.log('유저 데이터 -> ' + userInfo);
  }, [userInfo]);

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
        <div>1123</div>
        <input className="nameInput" type="text" />
        <input
          className="phoneInput"
          type="text"
          onChange={(event: any) => setUserInfo(event.target.value)}
        />
        <input className="firstNextPage" type="text" />
        {/* <a href="javascript:fnPopup();"> CheckPlus 안심본인인증 Click</a> */}
      </form>
    </div>
  );
};

export default Tests;

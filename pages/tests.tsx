import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Props = {};

const Tests = (props: Props) => {
  const [data, setData] = useState<any>();
  let form_chk: any;
  const fnPopup = () => {
    window.open(
      '',
      'popupChk',
      'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
    );
    form_chk.action =
      'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
    form_chk.target = 'popupChk';
    form_chk.submit();
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    form_chk = document.querySelector('.form_chk');
    const memberType = 'USER';

    axios({
      method: 'post',
      url: 'http://3.39.207.234:4000/auth/nice',
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
    console.log(data);
  }, [data]);

  return (
    <div>
      <form className="form_chk" method="post">
        <input type="hidden" name="m" value="checkplusService" />
        {/* <!-- 필수 데이타로, 누락하시면 안됩니다. --> */}
        <input type="hidden" id="encodeData" name="EncodeData" value={data} />
        {/* <!-- 위에서 업체정보를 암호화 한 데이타입니다. --> */}

        {/* <button onClick={(e) => Go(e)}>CheckPlus 안심본인인증 Click</button> */}
        <button onClick={() => fnPopup()}>CheckPlus 안심본인인증 Click</button>
        {/* <a href="javascript:fnPopup();"> CheckPlus 안심본인인증 Click</a> */}
      </form>
    </div>
  );
};

export default Tests;

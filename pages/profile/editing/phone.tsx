import styled from '@emotion/styled';
import colors from 'styles/colors';
import MypageHeader from 'components/mypage/request/header';
import React, { useEffect, useState } from 'react';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import useProfile from 'hooks/useProfile';
import instance from 'api/interceptor/service';

interface Key {
  id: string;
  isMember: boolean;
  memberIdx: number;
  name: string;
  phone: string;
}

interface UserInfo {
  isSuccess: boolean;
  id: string;
  name: string;
  phone: string;
}

const phone = () => {
  const router = useRouter();
  const { selectedType } = useSelector((state: RootState) => state.LoginType);
  const [data, setData] = useState<any>();
  const [checkSns, setCheckSns] = useState<boolean>(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>();
  const key: Key = JSON.parse(sessionStorage.getItem('key')!);
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const { profile, invalidate, isLoading } = useProfile(accessToken);
  const phoneNumber = profile?.phone
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

  // 휴대폰 변경
  const HandlePhone = async () => {
    const key: Key = JSON.parse(sessionStorage.getItem('key')!);
    const newnumber = key?.phone
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    setNewPhoneNumber(newnumber);
  };

  const onClickBtn = () => {
    //수정완료 api
    const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
    const PASSWORD_CHANGE = `${process.env.NEXT_PUBLIC_BASE_URL}/members`;
    try {
      instance({
        method: 'patch',
        url: PASSWORD_CHANGE,
        data: {
          phone: key.phone,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: 'application/json',
          local: process.env.LOCAL!,
        },
        withCredentials: true,
      }).then((res) => {
        // console.log('백엔드에서 받은 데이터');
        // console.log(res);
        router.push('/');
      });
    } catch (error) {
      // console.log('비밀번호 변경 실패');
      // console.log(error);
    }
  };

  // 나이스 인증
  const fnPopup = (event: any) => {
    // console.log('나이스 인증');
    // console.log(event);
    const { id } = event.currentTarget;
    // console.log(`id -> ${id}`);

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
    const memberType = selectedType;
    instance({
      headers: {
        local: process.env.LOCAL!,
      },
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/nice`,
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
  }, [data]);
  // sns 체크
  useEffect(() => {
    const snsMember = JSON.parse(sessionStorage.getItem('SNS_MEMBER')!);
    if (snsMember) {
      setCheckSns(snsMember);
    }
    // console.log('⭐️ SNS 데이터 확인 ~라인 119');
    // console.log(checkSns);
    // console.log(snsMember);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 나이스 인증 테스트
  useEffect(() => {
    // console.log('-----key-------');
    // console.log(key);
    // console.log('나이스 인증 폰번호 받아오기 ->' + newPhoneNumber);
  }, [newPhoneNumber, key]);

  return (
    <React.Fragment>
      <WebBody>
        <WebHeader />
        <Inner>
          <Wrapper>
            <MypageHeader back={true} title={'휴대폰 번호 변경'} />
            <Title>휴대폰 번호</Title>

            <Notice>
              휴대폰 번호 변경 시 가입하신 분의 명의로 된 <br />
              번호로만 변경이 가능합니다.
            </Notice>
            <InputBox>
              {newPhoneNumber ? (
                <Input type="text" readOnly value={newPhoneNumber} />
              ) : (
                <Input type="text" readOnly value={phoneNumber} />
              )}

              {!checkSns && (
                <>
                  <form name="form_chk" method="get">
                    <input type="hidden" name="m" value="checkplusService" />
                    {/* <!-- 필수 데이타로, 누락하시면 안됩니다. --> */}
                    <input
                      type="hidden"
                      id="encodeData"
                      name="EncodeData"
                      value={data !== undefined && data}
                    />
                    <input type="hidden" name="recvMethodType" value="get" />
                    {/* <!-- 위에서 업체정보를 암호화 한 데이타입니다. --> */}
                    <InputBtn onClick={fnPopup}>재설정</InputBtn>
                  </form>
                </>
              )}
            </InputBox>

            <Buttons className="firstNextPage" onClick={HandlePhone}>
              숨겨진 비밀번호 버튼
            </Buttons>

            {newPhoneNumber && (
              <AlertMessage>해당 번호로 변경됩니다.</AlertMessage>
            )}
            <BtnBox>
              <Btn onClick={onClickBtn}>수정완료</Btn>
            </BtnBox>
          </Wrapper>
        </Inner>
        <WebFooter />
      </WebBody>
    </React.Fragment>
  );
};

export default phone;

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;
const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  width: 345pt;
  background: ${colors.lightWhite};
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0;
    padding: 0;
  }
`;
const Wrapper = styled.div`
  position: relative;
  margin: 0pt 31.875pt;
  @media (max-width: 899.25pt) {
    height: 100%;
    margin: 0;
  }
`;
const Title = styled.h1`
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-top: 27pt;
  padding-left: 15pt;
`;
const Notice = styled.p`
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  padding-top: 9pt;
  padding-left: 15pt;
`;
const AlertMessage = styled.p`
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main};
  padding-left: 15pt;
  padding-top: 9pt;
`;
const InputBox = styled.div`
  position: relative;
  padding: 0 15pt;
`;
const Input = styled.input`
  padding: 13.5pt 0;
  margin-top: 9pt;
  border: 0.75pt solid ${colors.gray};
  border-radius: 6pt;
  width: calc(100% - 15pt);
  position: relative;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.lightGray3};
  padding-left: 15pt;
`;
const BtnBox = styled.div`
  position: fixed;
  box-sizing: border-box;
  left: 0;
  bottom: 30pt;
  width: 100%;
  padding: 0 15pt;
`;
const Btn = styled.button`
  cursor: pointer;
  background: ${colors.gray};
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  width: 100%;
  padding: 15pt 0;

  :hover {
    background-color: ${colors.main};
  }
`;
const InputBtn = styled.span`
  background: ${colors.gray};
  border-radius: 6pt;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  text-align: right;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  padding: 7.5pt 9pt;
  position: absolute;
  top: 15pt;
  right: 21pt;
  cursor: pointer;
  :hover {
    background-color: ${colors.main1};
  }
`;
const Buttons = styled.button`
  display: none;
`;

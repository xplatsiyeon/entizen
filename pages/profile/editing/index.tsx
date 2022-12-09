import styled from '@emotion/styled';
import Header from 'components/mypage/request/header';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import PasswordModify from 'components/Profile/PasswordModify';
import ProfileModify from 'components/Profile/ProfileModify';
import PhoneNumberModify from 'components/Profile/PhonenumberModify';
import UserRightMenu from 'components/UserRightMenu';
import { useMediaQuery } from 'react-responsive';

interface Components {
  [key: number]: JSX.Element;
}

const ProfileEditing = () => {
  const [checkSns, setCheckSns] = useState<boolean>(false);
  const mobile = useMediaQuery({
    query: '(min-width:900pt)',
  });

  // 오른쪽 컴포넌트 변경
  const [tabNumber, setTabNumber] = useState<number>(2);

  // // 나이스 인증
  // const fnPopup = (event: any) => {
  //   console.log('나이스 인증');
  //   console.log(event);
  //   const { id } = event.currentTarget;
  //   console.log(`id -> ${id}`);
  //   if (id === 'password') {
  //     setIsPassword(true);
  //     console.log('passowrd입니다');
  //   }
  //   if (typeof window !== 'object') return;
  //   else {
  //     console.log('몇번');

  //     window.open(
  //       '',
  //       'popupChk',
  //       'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
  //     );
  //     let cloneDocument = document as any;
  //     cloneDocument.form_chk.action =
  //       'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
  //     cloneDocument.form_chk.target = 'popupChk';
  //     console.log(cloneDocument.form_chk);
  //     cloneDocument.form_chk.submit();
  //   }
  // };
  // // 나이스 인증
  // useEffect(() => {
  //   const memberType = selectedType;
  //   axios({
  //     method: 'post',
  //     url: 'https://ㅅㄷㄴㅅ-api.entizen.kr/api/auth/nice',
  //     data: { memberType },
  //   })
  //     .then((res) => {
  //       setData(res.data.executedData);
  //     })
  //     .catch((error) => {
  //       console.error('나이스 인증 에러 발생');
  //       console.error(error);
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // sns 체크
  useEffect(() => {
    const snsMember = JSON.parse(localStorage.getItem('SNS_MEMBER')!);
    if (snsMember) {
      setCheckSns(snsMember);
    }

    console.log(checkSns);
    console.log(snsMember);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 오른쪽 컴포넌트
  const components: Components = {
    0: <PhoneNumberModify setTabNumber={setTabNumber} />,
    1: <PasswordModify setTabNumber={setTabNumber} />,
  };

  return (
    <React.Fragment>
      <UserRightMenu />
      {tabNumber === 2 && <Header back={true} title="프로필 변경" />}
      <WebBody>
        <WebHeader />
        {/* ---------------모바일-------------- */}
        {!mobile ? (
          <WebHide>
            {tabNumber === 2 && <ProfileModify setTabNumber={setTabNumber} />}
            {tabNumber !== 2 && <div>{components[tabNumber]}</div>}
          </WebHide>
        ) : (
          // --------------웹-------------
          <>
            {tabNumber < 2 && (
              <ChangeProfileText>프로필 변경</ChangeProfileText>
            )}
            <WebRapper tabNumber={tabNumber}>
              <Inner tabNumber={tabNumber}>
                {/* 프로필 변경 컴포넌트 */}
                <ProfileModify setTabNumber={setTabNumber} />
              </Inner>
              {tabNumber !== 2 && <div>{components[tabNumber]}</div>}
            </WebRapper>
          </>
        )}

        <WebFooter />
      </WebBody>
    </React.Fragment>
  );
};

export default ProfileEditing;

const ChangeProfileText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 21pt;
  font-weight: 700;
  line-height: 21pt;
  letter-spacing: -0.02em;
  text-align: left;
  width: 900pt;
  margin: 0 auto;
  padding-left: 40pt;
  margin-top: 66pt;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const WebHide = styled.div`
  @media (min-width: 900pt) {
    display: none;
  }
`;
const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;

  @media (max-height: 800pt) {
    display: block;
  }

  @media (min-width: 900pt) {
    height: 100%;
  }
`;

const Inner = styled.div<{ tabNumber: number }>`
  display: block;
  position: relative;
  /* width: 255pt; */
  width: ${({ tabNumber }) => (tabNumber === 2 ? '345pt' : '255pt')};
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
  margin: 0 auto;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    padding: 0;
    margin: 0;
    box-shadow: none;
    background: none;
  }

  @media (min-width: 900pt) {
    height: 100%;
  }
`;

const WebRapper = styled.div<{ tabNumber: number }>`
  display: flex;
  justify-content: space-between;
  width: 900pt;
  margin: 0 auto;
  margin-top: ${({ tabNumber }) => (tabNumber === 2 ? '58.5pt' : '33pt')};
  margin-bottom: 90pt;
  gap: 30pt;

  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const MobileComponent = styled.div<{ tabNumber: number }>`
  @media (max-width: 899.25pt) {
    display: ${({ tabNumber }) => tabNumber !== 2 && 'none'};
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 31.875pt;

  @media (max-width: 899.25pt) {
    height: 100%;
    margin: 0;
  }
`;
const Body = styled.div`
  padding: 27pt 15pt 96pt 15pt;
`;
const Avatar = styled.div`
  display: flex;
  justify-content: center;
  .img-bg {
    position: relative;
  }
  .avatar-bg {
    position: relative;
    width: 75pt;
    height: 75pt;
    border-radius: 50%;
    overflow: hidden;
  }
  .avatar-photo {
    position: absolute;
    cursor: pointer;
    bottom: 0;
    right: 0;
  }
  .file-input {
    display: none;
  }
`;
const Label = styled.h3<{ mt: number }>`
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  margin-top: ${({ mt }) => mt + 'pt'};
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const InputBox = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 13.5pt 16pt;
  margin-top: 9pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  border-radius: 6pt;
  letter-spacing: -0.02em;
  /* color: ${colors.main2}; */
  border: 0.75pt solid ${colors.gray};
  ::placeholder {
    color: ${colors.lightGray3};
  }
`;
const Form = styled.div`
  margin-top: 30pt;
  border-bottom: 0.75pt solid ${colors.gray};
  padding-bottom: 18pt;
  cursor: pointer;
`;
const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const Text = styled.p`
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  padding-top: 9pt;
  color: ${colors.gray2};
`;
const Buttons = styled.button`
  display: none;
`;

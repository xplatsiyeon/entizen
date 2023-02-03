import React from 'react';
import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import Header from 'components/header';
import Image from 'next/image';
import CheckImg from 'public/images/check-box.svg';
import CheckOnImg from 'public/images/check-box-on.svg';
import SmallCheckImg from 'public/images/check-small.svg';
import SmallCheckOnImg from 'public/images/check-small-on.svg';
import btnImg from 'public/images/back-btn.svg';
import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import Btn from 'components/SignUp/button';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import axios from 'axios';
import { userAction } from 'store/userSlice';
import Modal from 'components/Modal/Modal';
import { JwtTokenType } from 'pages/signin';
import jwt_decode from 'jwt-decode';
import { originUserAction } from 'store/userInfoSlice';

interface Terms {
  all: boolean;
  required: boolean;
  selected: boolean;
}

const SignUpTerms = () => {
  const router = useRouter();
  const { selectedType } = useSelector((state: RootState) => state.selectType);
  const [fullTerms, setFullTerms] = useState(false);
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [requiredTerms, setRequiredTerms] = useState(false);
  const [selectTerms, setSelectTerms] = useState(false);
  const [nextBtn, setNextBtn] = useState(false);
  const [data, setData] = useState<any>();
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userList);

  // ========================== 본인인증 창 띄우기 =====================
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

  const fullTermsHandler = () => {
    if (fullTerms) {
      setFullTerms(false);
      setRequiredTerms(false);
      setSelectTerms(false);
    } else {
      setFullTerms(true);
      setRequiredTerms(true);
      setSelectTerms(true);
    }
  };

  const handleForceClick = async () => {
    let key = sessionStorage.getItem('key');
    if (key !== null) {
      let data = JSON.parse(key);
      console.log('sns data==>>', data);
      dispatch(
        userAction.add({
          ...user,
          snsType: fullTerms,
          name: data.name,
          phone: data.phone,
          birthDate: data.birthDate,
        }),
      );
      // try {
      await axios({
        method: 'post',
        url: 'https://api.entizen.kr/api/members/join/sns',
        data: {
          name: data.name,
          phone: data.phone,
          birthDate: data.birthDate,
          optionalTermsConsentStatus: [
            {
              optionalTermsType: 'LOCATION',
              consentStatus: fullTerms,
            },
          ],
          snsLoginIdx: user.snsLoginIdx,
        },
        headers: {
          ContentType: 'application/json',
        },
        withCredentials: true,
      })
        .then((res) => {
          router.push('/signUp/Complete');
        })
        .catch((error) => {
          const { message } = error.response.data;
          setErrorMessage(message);
          setErrorModal(true);
        });
    }
  };

  // const KaKaApi = async (data: any) => {
  //   const KAKAO_POST = `https://api.entizen.kr/api/members/login/sns`;
  //   // try {
  //   await axios({
  //     method: 'post',
  //     url: KAKAO_POST,
  //     data: {
  //       uuid: '' + data.id,
  //       snsType: 'KAKAO',
  //       snsResponse: JSON.stringify(data),
  //       email: data.kakao_account.email,
  //     },
  //     headers: {
  //       ContentType: 'application/json',
  //     },
  //     withCredentials: true,
  //   })
  //     .then((res) => {
  //       let resData = res.data;
  //       let jsonData = JSON.parse(res.config.data);
  //       dispatch(
  //         userAction.add({
  //           ...user,
  //           uuid: jsonData.uuid,
  //           email: jsonData.email,
  //           snsType: jsonData.snsType,
  //           snsLoginIdx: resData.snsLoginIdx,
  //           isMember: resData.isMember,
  //         }),
  //       );
  //       if (resData.isMember === true) {
  //         // 로그인
  //         console.log('멤버 확인');
  //         console.log(resData);
  //         const token: JwtTokenType = jwt_decode(resData.accessToken);
  //         sessionStorage.setItem(
  //           'SNS_MEMBER',
  //           JSON.stringify(token.isSnsMember),
  //         );
  //         sessionStorage.setItem(
  //           'MEMBER_TYPE',
  //           JSON.stringify(token.memberType),
  //         );
  //         sessionStorage.setItem('USER_ID', JSON.stringify(jsonData.email));
  //         sessionStorage.setItem(
  //           'ACCESS_TOKEN',
  //           JSON.stringify(resData.accessToken),
  //         );
  //         sessionStorage.setItem(
  //           'REFRESH_TOKEN',
  //           JSON.stringify(resData.refreshToken),
  //         );
  //         dispatch(originUserAction.set(jsonData.email));
  //         router.push('/');
  //       } else {
  //         // 회원가입
  //         router.push('/signUp/SnsTerms');
  //       }
  //     })
  //     .catch((error) => {
  //       const { message } = error.response.data;
  //       if (message === '탈퇴된 회원입니다.') {
  //         setErrorModal(true);
  //         setErrorMessage(
  //           '탈퇴한 계정입니다.\n엔티즌 이용을 원하시면\n 다시 가입해주세요.',
  //         );
  //       } else {
  //         setErrorModal(true);
  //         setErrorMessage(message);
  //       }
  //     });
  // };
  // 모달창 핸들러
  const onClickModal = () => {
    setErrorModal((prev) => !prev);
    router.push('/');
  };
  // 보기 이벤트
  const TermsofServiceHandler = (event: any) => {
    event.stopPropagation();
    // router("/") 어디로?
  };
  useEffect(() => {
    if (router.asPath.includes('Canceled')) {
      router.push('/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 다음 버튼 활성화
  useEffect(() => {
    requiredTerms ? setNextBtn(true) : setNextBtn(false);
  }, [requiredTerms]);
  // 전체 약관 동의 활성화
  useEffect(() => {
    if (!requiredTerms || !selectTerms) setFullTerms(false);
    if (requiredTerms && selectTerms) setFullTerms(true);
  }, [requiredTerms, selectTerms]);

  useEffect(() => {
    const memberType = selectedType;
    axios({
      method: 'post',
      url: 'https://api.entizen.kr/api/auth/nice',
      data: { memberType },
    })
      .then((res) => {
        setData(res.data.executedData);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (router.asPath.includes('Canceled')) {
      router.push('/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {errorModal && (
        <Modal text={errorMessage} color={colors.main} click={onClickModal} />
      )}
      <Body>
        <WebHeader />
        <Inner>
          <Wrapper>
            <InnerHeader>
              <div className="img-box" onClick={() => router.back()}>
                <Image src={btnImg} alt="back-img" />
              </div>
              <h1 className="title">회원가입</h1>
            </InnerHeader>
            <Wrapper2>
              <Notice variant="h3">엔티즌 약관에 동의해주세요</Notice>
              <StyledTerms>
                <Image
                  onClick={fullTermsHandler}
                  alt="check"
                  src={fullTerms ? CheckOnImg : CheckImg}
                />
                <p onClick={fullTermsHandler}>전체 약관에 동의합니다.</p>
              </StyledTerms>
              <Form
                isterms={requiredTerms.toString()}
                onClick={() => setRequiredTerms((prev) => !prev)}
              >
                <Box className="box">
                  <span>
                    <Image
                      alt="check"
                      src={requiredTerms ? CheckOnImg : CheckImg}
                    />
                  </span>
                  <p>필수 약관에 동의합니다.</p>
                </Box>
                <Check>
                  <Item>
                    <div>
                      <Image
                        alt="smallCheck"
                        src={requiredTerms ? SmallCheckOnImg : SmallCheckImg}
                      />
                      <p>[필수]사용자 이용약관</p>
                    </div>
                    <span onClick={TermsofServiceHandler}>보기</span>
                  </Item>
                </Check>
                <Check>
                  <Item>
                    <div>
                      <Image
                        alt="smallCheck"
                        src={requiredTerms ? SmallCheckOnImg : SmallCheckImg}
                      />
                      <p>[필수] 만 14세 이상</p>
                    </div>
                    <span onClick={TermsofServiceHandler}>보기</span>
                  </Item>
                </Check>
                <Check>
                  <Item>
                    <div>
                      <Image
                        alt="smallCheck"
                        src={requiredTerms ? SmallCheckOnImg : SmallCheckImg}
                      />
                      <p>[필수]개인정보 처리방침 동의</p>
                    </div>
                    <span onClick={TermsofServiceHandler}>보기</span>
                  </Item>
                </Check>
              </Form>
              <BottomForm isterms={selectTerms.toString()}>
                <Box>
                  <Item onClick={() => setSelectTerms((prev) => !prev)}>
                    <div>
                      <Image
                        alt="smallCheck"
                        src={selectTerms ? SmallCheckOnImg : SmallCheckImg}
                      />
                      <p>[선택]위치정보 서비스 약관</p>
                    </div>
                    <span onClick={TermsofServiceHandler}>보기</span>
                  </Item>
                </Box>
              </BottomForm>
              <div>
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
                  <Btn
                    text="본인인증하기"
                    name={'form_chk'}
                    handleClick={fnPopup}
                    marginTop={42.5}
                    isClick={nextBtn}
                  />
                </form>
                <Buttons className="firstNextPage" onClick={handleForceClick}>
                  아아
                </Buttons>
              </div>
            </Wrapper2>
          </Wrapper>
        </Inner>
        <WebFooter />
      </Body>
    </React.Fragment>
  );
};

export default SignUpTerms;

const Buttons = styled.button`
  display: none;
`;
const Body = styled.div`
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
  //width: 281.25pt;
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    padding: 0;
    box-shadow: none;
    background: none;
    margin: 0;
  }
  @media (max-height: 500pt) {
    height: 100%;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 31.875pt;
  @media (max-width: 899.25pt) {
    height: 100%;
    margin: 0;
    padding: 0 15pt 15pt 15pt;
  }
`;
const Wrapper2 = styled.div`
  position: relative;
  padding: 0 15pt 15pt 15pt;
  @media (max-width: 899.25pt) {
    padding: 0;
  }
`;
const InnerHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .img-box {
    position: absolute;
    left: 0;
  }
  .title {
    font-weight: 700;
    font-size: 18pt;
    line-height: 21pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  @media (max-width: 899.25pt) {
    height: 36pt;
    .img-box {
      left: 15pt;
    }
    .title {
      display: none;
    }
  }
`;
const Notice = styled(Typography)`
  margin-top: 45pt;
  font-weight: 700;
  font-size: 15pt;
  line-height: 24pt;
  letter-spacing: -0.02em;

  //아래의 스타일은 바뀔 수도 있음.
  @media (max-width: 899.25pt) {
    width: 40%;
    margin-top: 6pt;
    font-size: 18pt;
  }
`;
const StyledTerms = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 45pt;
  & > p {
    margin-left: 12pt;
  }
`;
const Form = styled(Box)<{ isterms: string }>`
  border: 0.75pt solid
    ${({ isterms }) => (isterms === 'true' ? colors.main : colors.lightGray)};
  border-radius: 6pt;
  margin-top: 15pt;
  padding: 15pt 11.25pt;
  .box {
    display: flex;
    align-items: center;
    & > p {
      margin-left: 12pt;
    }
  }
`;
const Check = styled(Box)`
  margin-top: 15pt;
  /* display: flex;
  align-items: center; */
`;
const Item = styled(Box)`
  display: flex;
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
    & > p {
      font-weight: 500;
      font-size: 10.5pt;
      line-height: 12pt;
      letter-spacing: -0.003em;
      padding-left: 12pt;
    }
  }
  & > span {
    width: 19.5pt;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: right;
    letter-spacing: -0.003em;
    text-decoration-line: underline;
    color: #a6a9b0;
    cursor: pointer;
  }
`;
const BottomForm = styled(Box)<{ isterms: string }>`
  border: 0.75pt solid
    ${({ isterms }) => (isterms === 'true' ? colors.main : colors.lightGray)};
  border-radius: 6pt;
  margin-top: 15pt;
  padding: 15pt 11.25pt;
  & > p {
    margin-left: 12pt;
  }
`;

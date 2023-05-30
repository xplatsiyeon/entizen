import React, { useLayoutEffect } from 'react';
import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import Image from 'next/image';
import CheckImg from 'public/images/check-box.svg';
import CheckOnImg from 'public/images/check-box-on.svg';
import SmallCheckImg from 'public/images/check-small.svg';
import SmallCheckOnImg from 'public/images/check-small-on.svg';
import btnImg from 'public/images/back-btn.svg';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import Btn from 'components/SignUp/button';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import axios from 'axios';
import { userAction } from 'store/userSlice';
import Modal from 'components/Modal/Modal';
import { selectAction } from 'store/loginTypeSlice';
import instance from 'api/interceptor/service';

const SignUpTerms = () => {
  const router = useRouter();
  // const { selectedType } = useSelector((state: RootState) => state.LoginType);
  const selectedType = 'USER';
  const [fullTerms, setFullTerms] = useState(false);
  const [requiredTerms, setRequiredTerms] = useState(false);
  const [selectTerms, setSelectTerms] = useState([false]);
  const [requiredCheck, setRequiredCheck] = useState([false, false, false]);
  const [nextBtn, setNextBtn] = useState(false);
  const [data, setData] = useState<any>();
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userList);
  const LoginType = useSelector((state: RootState) => state.LoginType);
  // ========================== 본인인증 창 띄우기 =====================
  const fnPopup = () => {
    if (typeof window !== 'object') return;
    else {
      window.open(
        '',
        'popupChk',
        'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
      );
      let cloneDocument = document;
      cloneDocument.form_chk.action =
        'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
      cloneDocument.form_chk.target = 'popupChk';
      cloneDocument.form_chk.submit();
    }
  };

  // ==================== Term 로직 ======================
  const fullTermsHandler = () => {
    if (fullTerms) {
      setFullTerms(false);
      setRequiredCheck([false, false, false]);
      setSelectTerms([false]);
    } else {
      setFullTerms(true);
      setRequiredCheck([true, true, true]);
      setSelectTerms([true]);
    }
  };
  // 보기 이벤트
  // setting?id=4
  const TermsofServiceHandler = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    id: number,
  ) => {
    event.stopPropagation();
    // 데이터 저장
    dispatch(
      selectAction.setTerm({
        fullTerms,
        requiredTerms,
        selectTerms,
        requiredCheck,
      }),
    );
    router.push({
      pathname: '/setting',
      query: {
        id,
        setting: 'true',
        userType: 'SNS',
      },
    });
  };
  // 전체 약관 동의 체크 함수
  const onClickRequiredCheckBox = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const {
      currentTarget: { id },
    } = event;
    const temp = [...requiredCheck];
    switch (id) {
      case 'full':
        !requiredTerms
          ? setRequiredCheck([true, true, true])
          : setRequiredCheck([false, false, false]);
        break;
      case 'first':
        temp[0] = !temp[0];
        setRequiredCheck(temp);
        break;
      case 'second':
        temp[1] = !temp[1];
        setRequiredCheck(temp);
        break;
      case 'third':
        temp[2] = !temp[2];
        setRequiredCheck(temp);
        break;
    }
  };

  const onClickSelectTerms = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const {
      currentTarget: { id },
    } = event;
    const temp = [...selectTerms];

    switch (id) {
      case 'first':
        temp[0] = !temp[0];
        setSelectTerms(temp);
        break;
      case 'second':
        temp[1] = !temp[1];
        setSelectTerms(temp);
        break;
    }
  };

  const handleForceClick = async () => {
    let key = sessionStorage.getItem('key');
    if (key !== null) {
      let data = JSON.parse(key);
      // console.log('sns data==>>', data);
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

      await instance({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/members/join/sns`,
        data: {
          name: data.name,
          phone: data.phone,
          birthDate: data.birthDate,
          optionalTermsConsentStatus: [
            {
              optionalTermsType: 'EVENT',
              consentStatus: fullTerms,
            },
          ],
          snsLoginIdx: user.snsLoginIdx,
        },
        headers: {
          ContentType: 'application/json',
          local: process.env.LOCAL!,
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

  // 모달창 핸들러
  const onClickModal = () => {
    setErrorModal((prev) => !prev);
    router.push('/');
  };

  // 데이터 GET
  useEffect(() => {
    setFullTerms(LoginType.fullTerms);
    setRequiredTerms(LoginType.requiredTerms);
    setSelectTerms(LoginType.selectTerms);
    setRequiredCheck(LoginType.requiredCheck);
  }, []);
  // 전체 약관 동의
  useEffect(() => {
    const everyCheck = requiredCheck.every((e) => e === true);
    everyCheck ? setRequiredTerms(true) : setRequiredTerms(false);
  }, [requiredCheck]);

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
    const everyRequiredCheck = requiredCheck.every((e) => e === true);
    const everySelectedCheck = selectTerms.every((e) => e === true);
    console.log('⭐️ everyRequiredCheck : ', everyRequiredCheck);
    console.log('⭐️ selectTerms : ', selectTerms);

    if (!everyRequiredCheck || !everySelectedCheck) setFullTerms(false);
    if (everyRequiredCheck && everySelectedCheck) setFullTerms(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiredTerms, selectTerms]);

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
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 앱 -> 웹
  useEffect(() => {
    // 안드로이드 호출
    const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
    if (userAgent === 'Android_App') {
      // alert(userAgent);
      window.onClickBackButton = () => router.replace('/signin');
    }
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
              <div className="img-box" onClick={() => router.push('/signin')}>
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
              <Form isterms={requiredTerms.toString()}>
                <Box
                  className="box"
                  id="full"
                  onClick={onClickRequiredCheckBox}
                >
                  <span>
                    <Image
                      alt="check"
                      src={requiredTerms ? CheckOnImg : CheckImg}
                    />
                  </span>
                  <p>필수 약관에 동의합니다.</p>
                </Box>
                <Check>
                  <Item id="first" onClick={onClickRequiredCheckBox}>
                    <div>
                      <Image
                        alt="smallCheck"
                        src={requiredCheck[0] ? SmallCheckOnImg : SmallCheckImg}
                      />
                      <p>[필수]사용자 이용약관</p>
                    </div>
                    <span onClick={(e) => TermsofServiceHandler(e, 3)}>
                      보기
                    </span>
                  </Item>
                </Check>
                <Check>
                  <Item id="second" onClick={onClickRequiredCheckBox}>
                    <div>
                      <Image
                        alt="smallCheck"
                        src={requiredCheck[1] ? SmallCheckOnImg : SmallCheckImg}
                      />
                      <p>[필수] 만 14세 이상</p>
                    </div>
                    {/* <span onClick={TermsofServiceHandler}>보기</span> */}
                  </Item>
                </Check>
                <Check>
                  <Item id="third" onClick={onClickRequiredCheckBox}>
                    <div>
                      <Image
                        alt="smallCheck"
                        src={requiredCheck[2] ? SmallCheckOnImg : SmallCheckImg}
                      />
                      <p>[필수]개인정보 처리방침 동의</p>
                    </div>
                    <span onClick={(e) => TermsofServiceHandler(e, 4)}>
                      보기
                    </span>
                  </Item>
                </Check>
              </Form>
              <BottomForm isterms={selectTerms}>
                <Box>
                  {/* <Item id="first" onClick={onClickSelectTerms}>
                    <div>
                      <Image
                        alt="smallCheck"
                        src={selectTerms[0] ? SmallCheckOnImg : SmallCheckImg}
                      />
                      <p>[선택]위치정보 서비스 약관</p>
                    </div>
                    <span onClick={(e) => TermsofServiceHandler(e, 3)}>
                      보기
                    </span>
                  </Item> */}
                  <Item id="first" onClick={onClickSelectTerms}>
                    <div>
                      <Image
                        alt="smallCheck"
                        src={selectTerms[0] ? SmallCheckOnImg : SmallCheckImg}
                      />
                      <p>[선택]이벤트 및 혜택 알림 수신</p>
                    </div>
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
    cursor: pointer;
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
  cursor: pointer;
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
    cursor: pointer;
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
  cursor: pointer;
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

  &.selected {
    margin-top: 15px;
  }
`;
const BottomForm = styled(Box)<{ isterms: boolean[] }>`
  border: 0.75pt solid
    ${({ isterms }) =>
      isterms.every((e) => e === true) ? colors.main : colors.lightGray};
  border-radius: 6pt;
  margin-top: 15pt;
  padding: 15pt 11.25pt;
  & > p {
    margin-left: 12pt;
  }
`;

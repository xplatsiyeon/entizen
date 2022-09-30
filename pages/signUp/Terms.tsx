import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import Header from 'components/header';
import Image from 'next/image';
import CheckImg from 'public/images/check-box.svg';
import CheckOnImg from 'public/images/check-box-on.svg';
import SmallCheckImg from 'public/images/check-small.svg';
import SmallCheckOnImg from 'public/images/check-small-on.svg';

import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { userAction } from 'store/userSlice';
import Btn from 'components/SignUp/button';

interface Terms {
  all: boolean;
  required: boolean;
  selected: boolean;
}

const SignUpTerms = () => {
  const route = useRouter();
  const [fullTerms, setFullTerms] = useState(false);
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [requiredTerms, setRequiredTerms] = useState(false);
  const [selectTerms, setSelectTerms] = useState(false);
  const [nextBtn, setNextBtn] = useState(false);
  const [data, setData] = useState<any>();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userList);

  // ========================== 본인인증 창 띄우기
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
    // console.log(localStorage.getItem('key'));
    const memberType = 'USER';

    axios({
      method: 'post',
      url: 'https://test-api.entizen.kr/api/auth/nice',
      data: { memberType },
    })
      .then((res) => {
        // console.log(res.data);
        setData(res.data.executedData);
        console.log('엑시오스 데이터 66번째 줄입니다   =>   ');
        console.log(res.data.executedData);
        // encodeData = res.data.executedData;
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (route.asPath.includes('Canceled')) {
      route.push('/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    let c = localStorage.getItem('key');
    console.log(c);

    if (c !== null) {
      let a = JSON.parse(c);
      console.log('98번째줄 JSONPARSE된 곳입니다 !!  =>   ');
      console.log(a);
      console.log(a.name);
      console.log(a.phone);
      setName(a.name);
      setPhoneNumber(a.phone);
    }
    if (fullTerms) {
      dispatch(
        userAction.add({
          ...user,
          snsType: fullTerms,
          name: name,
          phone: phoneNumber,
        }),
      );

      try {
        await axios({
          method: 'post',
          url: 'https://test-api.entizen.kr/api/members/join/sns',
          data: {
            name: name,
            phone: phoneNumber,
            optionalTermsConsentStatus: [
              {
                optionalTermsType: 'LOCATION',
                consentStatus: fullTerms,
              },
            ],
            snsLoginIdx: 2,
          },
          headers: {
            ContentType: 'application/json',
          },
          withCredentials: true,
        }).then((res) => {
          console.log('서버에 sns 로그인결과 보내는 곳입니다. ======');
          console.log(res);
        });
      } catch (error) {
        console.log('post 실패!!!!!!');
        console.log(error);
      }
      // try {
      //   await axios({
      //     method: 'post',
      //     url: 'https://test-api.entizen.kr/api/members/join/sns',
      //     data: {
      //       uuid: '' + user.uuid,
      //       snsType: 'NAVER',
      //       snsResponse: {},
      //       email: data.kakao_account.email,
      //     },
      //     headers: {
      //       ContentType: 'application/json',
      //     },
      //     withCredentials: true,
      //   }).then((res) => console.log(res));
      // } catch (error) {
      //   console.log('post 요청 실패');
      //   console.log(error);
      // }
    }
  };
  // 보기 이벤트
  const TermsofServiceHandler = (event: any) => {
    event.stopPropagation();
    // route("/") 어디로?
  };
  useEffect(() => {
    if (route.asPath.includes('Canceled')) {
      route.push('/signin');
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
  // const handleClick = () => {
  //   route.push('/signUp/Check');
  // };

  return (
    <>
      <Wrapper>
        <Header />
        <Notice variant="h3">
          엔티즌 약관에
          <br />
          동의해주세요
        </Notice>
        <Terms>
          <Image
            onClick={fullTermsHandler}
            alt="check"
            src={fullTerms ? CheckOnImg : CheckImg}
          />
          <p onClick={fullTermsHandler}>전체 약관에 동의합니다.</p>
        </Terms>
        <Form
          isterms={requiredTerms.toString()}
          onClick={() => setRequiredTerms((prev) => !prev)}
        >
          <Box className="box">
            <span>
              <Image alt="check" src={requiredTerms ? CheckOnImg : CheckImg} />
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
        {/* <div className="nextPage" onClick={handleOnClick}></div> */}
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
            <Btn
              text="본인인증하기"
              name={'form_chk'}
              handleClick={fnPopup}
              marginTop={42.5}
              isClick={nextBtn}
            />
            {/* <Btn
            text="본인인증하기"
            name={'form_chk'}
            handleClick={testClick}
            isClick={nextBtn}
            marginTop={42.5}
          /> */}
          </form>
          <Buttons className="firstNextPage" onClick={handleForceClick}>
            아아
          </Buttons>
        </div>
      </Wrapper>
    </>
  );
};

export default SignUpTerms;

// const Buttons = styled.button`
//   background-color: #19ce60;

//   width: 360px;
//   height: 40px;

//   margin: 6px 0;

//   border: none;
//   border-radius: 6px;

//   cursor: pointer;
// `;

const ButtonText = styled.h4`
  margin: 0;
  padding: 0;

  font-size: 18px;
  color: #ffffff;
`;

const Wrapper = styled.div`
  padding: 0 15pt 15pt 15pt;
`;
const Notice = styled(Typography)`
  margin-top: 6pt;
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  letter-spacing: -0.02em;
`;
const Terms = styled(Box)`
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
const Buttons = styled.button`
  display: none;
`;

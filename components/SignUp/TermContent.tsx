import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CheckOnImg from 'public/images/check-box-on.svg';
import CheckImg from 'public/images/check-box.svg';
import SmallCheckImg from 'public/images/check-small.svg';
import SmallCheckOnImg from 'public/images/check-small-on.svg';
import { useRouter } from 'next/router';
import colors from 'styles/colors';
import Btn from './button';
import axios from 'axios';

type Props = {
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
  setName: Dispatch<SetStateAction<string>>;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  fullTerms: boolean;
  setFullTerms: Dispatch<SetStateAction<boolean>>;
  requiredTerms: boolean;
  setRequiredTerms: Dispatch<SetStateAction<boolean>>;
  selectTerms: boolean;
  setSelectTerms: Dispatch<SetStateAction<boolean>>;
  nextBtn: boolean;
  setNextBtn: Dispatch<SetStateAction<boolean>>;
  userType?: number;
};

const TermContent = ({
  level,
  setLevel,
  setName,
  setPhoneNumber,
  fullTerms,
  setFullTerms,
  requiredTerms,
  setRequiredTerms,
  selectTerms,
  setSelectTerms,
  nextBtn,
  setNextBtn,
  userType,
}: Props) => {
  // console.log('테스트11입니다 => ' + test11());
  const route = useRouter();

  const [data, setData] = useState<any>();

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
      console.log(cloneDocument.form_chk);

      cloneDocument.form_chk.submit();
    }
  };
  const handleForceClick = () => {
    let key = localStorage.getItem('key');
    if (key !== null) {
      let data = JSON.parse(key);
      setName(data.name);
      setPhoneNumber(data.phone);
      if (data.isMember === true) {
        alert('이미 회원가입 하셨습니다.');
        route.push('/signin');
      } else if (data.isMember === false) {
        setLevel(level + 1);
      }
    }
  };

  const justNextPage = () => {
    setLevel(level + 1);
  };

  useEffect(() => {
    const memberType = 'USER';
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

  // ================================= Term 로직 ========
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
  // 보기 이벤트
  const TermsofServiceHandler = (event: any) => {
    event.stopPropagation();
  };
  useEffect(() => {
    console.log();
    if (route.asPath.includes('Canceled')) {
      route.push('/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 다음 버튼 활성화
  useEffect(() => {
    requiredTerms ? setNextBtn(true) : setNextBtn(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiredTerms]);
  // 전체 약관 동의 활성화
  useEffect(() => {
    if (!requiredTerms || !selectTerms) setFullTerms(false);
    if (requiredTerms && selectTerms) setFullTerms(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiredTerms, selectTerms]);

  return (
    <>
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
      {/* 기업 */}
      {userType === 0 && (
        <Btn
          text="다음"
          handleClick={justNextPage}
          marginTop={42.5}
          isClick={nextBtn}
        />
      )}
      {/* 일반 */}
      {userType === 1 && (
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
      )}
    </>
  );
};

const Notice = styled(Typography)`
  margin-top: 6pt;
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  letter-spacing: -0.02em;
  font-family: 'Spoqa Han Sans Neo';
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

export default TermContent;

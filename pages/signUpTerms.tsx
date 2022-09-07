import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import Header from 'components/header';
import Image from 'next/image';
import CheckImg from 'public/images/check-box.svg';
import CheckOnImg from 'public/images/check-box-on.svg';
import SmallCheckImg from 'public/images/check-small.svg';
import SmallCheckOnImg from 'public/images/check-small-on.svg';
import Btn from 'components/button';
import { useEffect, useState } from 'react';

const signUpTerms = () => {
  const [fullTerms, setFullTerms] = useState(false);
  const [requiredTerms, setRequiredTerms] = useState(false);
  const [selectTerms, setSelectTerms] = useState(false);
  const [nextBtn, setNextBtn] = useState(false);

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

  useEffect(() => {
    requiredTerms ? setNextBtn(true) : setNextBtn(false);
  }, [requiredTerms]);

  return (
    <Wrapper>
      <Header />
      <Notice variant="h3">
        엔티즌 약관에
        <br />
        동의해주세요
      </Notice>
      <Terms>
        <Image
          alt="check"
          src={fullTerms ? CheckOnImg : CheckImg}
          onClick={fullTermsHandler}
        />
        <p>전체 약관에 동의합니다.</p>
      </Terms>
      <Form isterms={requiredTerms.toString()}>
        <Box className="box" onClick={() => setRequiredTerms((prev) => !prev)}>
          <Image alt="check" src={requiredTerms ? CheckOnImg : CheckImg} />
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
            <span>보기</span>
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
            <span>보기</span>
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
            <span>보기</span>
          </Item>
        </Check>
      </Form>
      <BottomForm isterms={selectTerms.toString()}>
        <Box onClick={() => setSelectTerms((prev) => !prev)}>
          <Item>
            <div>
              <Image
                alt="smallCheck"
                src={selectTerms ? SmallCheckOnImg : SmallCheckImg}
              />
              <p>[선택]위치정보 서비스 약관</p>
            </div>
            <span>보기</span>
          </Item>
        </Box>
      </BottomForm>
      <Btn text="다음" isClick={nextBtn} marginTop="63" />
    </Wrapper>
  );
};

export default signUpTerms;

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

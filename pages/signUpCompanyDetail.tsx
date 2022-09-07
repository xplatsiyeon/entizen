import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Btn from 'components/button';
import Header from 'components/header';
import Input from 'components/input';
import colors from 'styles/colors';
import AddImg from 'public/images/add-img.svg';
import Image from 'next/image';

const signUpCompanyDetail = () => {
  return (
    <Wrapper>
      <Header isHome={true} />
      <Notice variant="h3" align="left">
        상세 내용을
        <br /> 입력해주세요
      </Notice>
      <Form
        style={{
          paddingTop: '24pt',
        }}
      >
        <label>회사명</label>
        <Input placeholder="기업명 입력" />
        <OverlapBtn>주소 찾기</OverlapBtn>
      </Form>
      <Form>
        <label>주소</label>
        <Input placeholder="회사 우편번호 입력" />
        <Input placeholder="회사 주소 입력" />
        <Input placeholder="회사 상세주소 입력" />
      </Form>
      <Form>
        <label>사업자 등록증</label>
        <div>
          <File>
            <Image src={AddImg} alt="img" />
            <div>이미지 또는 파일 업로드</div>
            <input type="file" />
          </File>
        </div>
      </Form>
      <Btn text="다음" isClick={false} marginTop="30" />
    </Wrapper>
  );
};

export default signUpCompanyDetail;

const Wrapper = styled.div`
  padding: 0 15pt 15pt 15pt;
`;
const Notice = styled(Typography)`
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 30pt;
  position: relative;
  & > label {
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: -0.02em;
  }
  & > div {
    margin-top: 12pt;
    padding: 15pt 67.5pt;
    border: 0.75pt dashed ${colors.lightGray};
    border-radius: 6pt;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
const OverlapBtn = styled.button`
  position: absolute;
  right: 8pt;
  top: 52.5pt;
  /* right: 0; */
  /* top: 0; */
  background: #e2e5ed;
  color: #ffffff;
  border-radius: 6pt;
  padding: 7.5pt 9pt;
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 12pt;
`;

const File = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 9pt;
  & > input {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
  & > div {
    font-size: 12pt;
    line-height: 12pt;
    color: #caccd1;
  }
`;

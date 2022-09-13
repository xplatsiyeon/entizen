import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { Box, color } from '@mui/system';
import Btn from 'components/button';
import Header from 'components/header';
import Input from 'components/input';
import colors from 'styles/colors';

const phoneCompany: string[] = ['SKT', 'KT', 'LGU+', '알뜰폰'];

const signUpManagerInfo = () => {
  return (
    <Wrapper>
      <Header isHome={true} />
      <Notice variant="h3">
        진행할 담당자 정보를
        <br />
        입력해주세요
      </Notice>
      <Remark variant="subtitle1">고객에게 전달되는 정보예요!</Remark>
      <Form>
        <label>담당자 이름</label>
        <Input placeholder="이름을 입력해주세요" />
      </Form>
      <Form>
        <label>담당자 이메일</label>
        <Input placeholder="이메일 입력" />
        <OverlapBtn
          style={{
            top: '25.5pt',
          }}
        >
          인증
        </OverlapBtn>
        <Input placeholder="이메일 인증번호 입력" />
        <OverlapBtn>확인</OverlapBtn>
      </Form>
      <Form>
        <label>휴대폰 인증</label>
        <PhoneSelect>
          {phoneCompany.map((phone, index) => (
            <div key={index}>{phone}</div>
          ))}
        </PhoneSelect>
        <Input placeholder="휴대폰 번호('-'없이 숫자만 입력)" />
        <OverlapBtn
          style={{
            top: '75pt',
          }}
        >
          인증
        </OverlapBtn>
        <Input placeholder="인증번호 입력" />
        <OverlapBtn
          style={{
            top: '127pt',
          }}
        >
          확인
        </OverlapBtn>
      </Form>
      <Btn marginTop="30" isClick={false} />
    </Wrapper>
  );
};

export default signUpManagerInfo;

const Wrapper = styled.div`
  padding: 0 15pt 15pt 15pt;
`;
const Notice = styled(Typography)`
  margin-top: 6pt;
  font-weight: 700;
  font-size: 21pt;
  line-height: 33pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const Remark = styled(Typography)`
  margin-top: 9pt;
  color: #747780;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
`;
const Form = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 24pt;
  position: relative;
  & > label {
    color: ${colors.main2};
    font-size: 12pt;
    line-height: 12px;
    font-weight: 500;
    letter-spacing: -0.02em;
  }
`;
const OverlapBtn = styled.button`
  position: absolute;
  right: 8pt;
  top: 77pt;
  background: #e2e5ed;
  color: #ffffff;
  border-radius: 6pt;
  padding: 7.5pt 9pt;
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 12pt;
`;
const PhoneSelect = styled(Box)`
  display: flex;
  gap: 3.75pt;
  margin-top: 9pt;
  & > div {
    width: 60pt;
    border: 0.75pt solid ${colors.lightGray};
    padding: 13.5pt 0;
    border-radius: 8px;
    font-weight: 400;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: #a6a9b0;
    text-align: center;
    ::placeholder {
      color: ${colors.gray};
      font-weight: 500;
    }
    :hover {
      outline: 2pt solid ${colors.main};
      border-radius: 0;
    }
  }
`;

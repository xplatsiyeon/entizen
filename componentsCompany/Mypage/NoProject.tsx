import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import UndefindImg from 'public/mypage/requet-undefind-Img.svg';
import colors from 'styles/colors';

const NoProject = () => {
  const route = useRouter();

  //const handlerBtn = () => route.push('quotation/request/1-1');
  return (
    <Wrapper>
      <ImgBox>
        <Image src={UndefindImg} alt="no-history" />
      </ImgBox>
      <Message>진행중인 프로젝트가 없습니다.</Message>
    </Wrapper>
  );
};

export default NoProject;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  @media (max-width: 899.25pt) {
    margin: 100pt 0;
  }
  @media (min-width: 900pt) {
    margin: 0 auto;
  }
`;
const ImgBox = styled.div`
  padding-top: 51pt;
`;
const Message = styled.h1`
  padding-top: 12pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightGray2};
  padding-bottom: 51pt;
`;
const Notice = styled.p`
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightGray3};
  padding: 9pt 63pt 0 63pt;
`;

const Btn = styled(Button)`
  background: ${colors.main};
  color: ${colors.lightWhite};
  margin-top: 44pt;
  border-radius: 6pt;
  padding: 9pt 30pt;
`;

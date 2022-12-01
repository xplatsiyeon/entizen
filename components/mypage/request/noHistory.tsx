import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import UndefindImg from 'public/mypage/requet-undefind-Img.svg';
import colors from 'styles/colors';

type Props = {
  type?: string;
};

const NoHistory = ({ type }: Props) => {
  const route = useRouter();

  const handlerBtn = () => route.push('quotation/request');
  return (
    <Wrapper>
      <ImgBox>
        <Image
          src={UndefindImg}
          alt="no-history"
          style={{
            width: '78.5pt',
            height: '78.5pt',
          }}
        />
      </ImgBox>
      <Message>
        {type === 'project'
          ? '진행중인 프로젝트가 없습니다'
          : '요청한 견적서가 없습니다.'}
      </Message>
      <Notice>
        {type === 'project'
          ? `간단하고 다양한 견적을 무료로 비교해보고, 최적의 상품을 구독해보세요!`
          : `간단하고 다양한 견적을 무료로 비교해보고, \n 최적의 상품을 구독해보세요!`}
      </Notice>
      <Btn onClick={handlerBtn}>견적 요청하기</Btn>
    </Wrapper>
  );
};

export default NoHistory;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ImgBox = styled.div`
  padding-top: 51pt;
`;
const Message = styled.h1`
  font-family: 'Spoqa Han Sans Neo';
  padding-top: 12pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightGray2};
  @media (min-width: 900pt) {
    font-size: 18pt;
    line-height: 15pt;
  }
`;
const Notice = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightGray3};
  white-space: pre;
  padding: 9pt 63pt 0 63pt;
  @media (min-width: 900pt) {
    font-size: 12pt;
    line-height: 18pt;
    white-space: pre-wrap;
  }
`;

const Btn = styled(Button)`
  background: ${colors.main};
  color: ${colors.lightWhite};
  font-family: 'Spoqa Han Sans Neo';
  letter-spacing: -0.02em;
  margin-top: 44pt;
  text-align: center;
  border-radius: 6pt;
  padding: 9pt 30pt;
  @media (min-width: 900pt) {
    padding: 15pt 91.5pt;
    font-size: 12pt;
    line-height: 12pt;
    font-weight: 500;
  }
`;

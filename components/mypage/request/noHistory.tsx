import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import UndefindImg from 'public/mypage/requet-undefind-Img.svg';
import colors from 'styles/colors';

const NoHistory = () => {
  const route = useRouter();

  const handlerBtn = () => route.push('quotation/request/1-1');
  return (
    <Wrapper>
      <ImgBox>
        <Image src={UndefindImg} alt="no-history" />
      </ImgBox>
      <Message>요청한 견적서가 없습니다.</Message>
      <Notice>
        간단하고 다양한 견적을 무료로 비교해보고, 최적의 상품을 구독해보세요!
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
  padding-top: 12pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightGray2};
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

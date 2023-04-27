import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import undefind_img from 'public/mypage/requet-undefind-Img.svg';
import colors from 'styles/colors';
import myChargers_icon from 'public/images/myChargers_icon.svg';

type Props = {
  type: 'quotation' | 'project' | 'myCharging';
};

const NoHistory = ({ type }: Props) => {
  const route = useRouter();

  const handlerBtn = () => route.push('quotation/request');
  return (
    <Wrapper>
      <ImageWrap>
        {(type === 'myCharging') === true && (
          <Image src={myChargers_icon} alt="myChargers_icon" layout="fill" />
        )}
        {(type === 'myCharging') === false && (
          <Image src={undefind_img} alt="undefind_img" layout="fill" />
        )}
      </ImageWrap>
      <H2>
        {type === 'quotation' && '요청한 견적서가 없습니다.'}
        {type === 'project' && '진행중인 프로젝트가 없습니다.'}
        {type === 'myCharging' && '운영 중인 충전소가 없습니다.'}
      </H2>
      <P>
        {type === 'quotation' &&
          `간단하고 다양한 견적을 무료로 비교해보고, \n 최적의 상품을 구독해보세요!`}
        {type === 'project' &&
          `간단하고 다양한 견적을 무료로 비교해보고, \n 최적의 상품을 구독해보세요!`}
        {type === 'myCharging' &&
          `  간단하고 다양한 견적을 무료로 비교해보고, \n최적의 상품을 구독해보세요!`}
      </P>
      <Button onClick={handlerBtn}>견적 요청하기</Button>
    </Wrapper>
  );
};

export default NoHistory;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  min-height: 424.5pt;
  width: 100%;
  margin: 0 auto;
  @media (max-width: 899.25pt) {
    min-height: 100%;
    margin-top: 45pt;
  }
`;
const ImageWrap = styled.div`
  position: relative;
  width: 48pt;
  height: 48pt;
  margin: 0 auto;
  @media (max-width: 899.25pt) {
    margin-top: 0;
  }
`;
const H2 = styled.h2`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 18pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${colors.gray6};
  padding-top: 12pt;

  @media (max-width: 899.25pt) {
    font-size: 12pt;
    line-height: 12pt;
  }
`;
const P = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 12pt;
  line-height: 18pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightGray3};
  padding-top: 12pt;
  white-space: pre;
  @media (max-width: 899.25pt) {
    font-weight: 400;
    font-size: 9pt;
    line-height: 12pt;
  }
`;

const Button = styled.button`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  color: ${colors.lightWhite};
  background: ${colors.main1};
  border-radius: 6pt;
  padding: 15pt 91.5pt;
  margin-top: 33pt;

  @media (max-width: 899.25pt) {
    padding: 9pt 30pt;
    font-size: 9pt;
  }
`;

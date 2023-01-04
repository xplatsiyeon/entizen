import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import React from 'react';

type Props = {};

const term = (props: Props) => {
  return (
    <>
      <MypageHeader back={true} title={'이용약관'} />
      <Wrapper>
        <Title>
          <span>제1장 환영합니다!</span>
        </Title>
        <Subtitle>
          <span>제1조 (목적)</span>
        </Subtitle>
        <Content>
          저희 엔티즌 서비스 및 제품(이하 통칭하여 ‘서비스’ 또는 ‘엔티즌
          서비스’)을 이용해 주셔서 감사 합니다. 본 약관은 서비스의 이용과
          관련하여 서비스를 제공하는 엘에스일렉트릭(주)(이하 ‘회사’)과 이를
          이용하는 회원 또는 비회원과의 관계를 설명합니다. 뿐만 아니라, 여러분이
          엔티즌을 이용하 는 데 도움이 될 만한 유익한 정보를 포함하고 있습니다.
          <br />
          <br />
          엔티즌 서비스를 이용하시거나 회원으로 가입하시는 경우 여러분은 본
          약관에 동의하게 되므로, 잠시 시간을 내시어 본 약관의 내용을 살펴봐
          주시기 바랍니다.
          <br />
        </Content>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
`;
const Title = styled.div`
  margin-top: 21pt;
  & span {
    font-family: Spoqa Han Sans Neo;
    font-size: 18pt;
    font-weight: 700;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const Subtitle = styled.div`
  margin-top: 34pt;
  & span {
    font-family: Spoqa Han Sans Neo;
    font-size: 12pt;
    font-weight: 700;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const SubSubtitle = styled.div`
  margin-top: 24pt;
  & span {
    font-family: Spoqa Han Sans Neo;
    font-size: 12pt;
    font-weight: 400;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const Content = styled.div`
  margin-top: 15pt;
  padding-left: 29.25pt;
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #111111;
`;

export default term;

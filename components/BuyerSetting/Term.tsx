import styled from '@emotion/styled';
import colors from 'styles/colors';
import Image from 'next/image';
import React from 'react';
import BackImg from 'public/images/back-btn.svg';
import { Box, Switch } from '@mui/material';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Props = {
  tabNumber: number;
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
  nowWidth: number;
};

const Term = ({ tabNumber, setTabNumber, nowWidth }: Props) => {
  const { data, isLoading, isError, refetch } = useQuery<any>(
    'entizenTerms',
    () => isTokenGetApi(`/terms/location`),
  );

  console.log('data', data);
  return (
    <WebRapper>
      {nowWidth < 1200 && (
        <Header>
          <div className="img-item" onClick={() => setTabNumber(0)}>
            <Image
              style={{
                cursor: 'pointer',
                width: '18pt',
                height: '18pt',
              }}
              src={BackImg}
              alt="btn"
            />
          </div>
          <span className="text">이용 약관</span>
        </Header>
      )}

      <Wrapper>
        {/* <Title>
          <span>엔티즌 이용약관</span>
        </Title>
        <Subtitle>
          <span>제1장 환영합니다!</span>
        </Subtitle>
        <SubSubtitle>
          <span>제 1조 (목적)</span>
        </SubSubtitle>
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
        <Subtitle>
          <span>제 2 장 엔티즌 플랫폼 서비스를 즐겨보세요.</span>
        </Subtitle>
        <SubSubtitle>
          <span>제2조 (서비스의 제공)</span>
        </SubSubtitle>
        <Content>
          회사는 www.entizen.kr 을 비롯한 엔티즌 도메인의 웹사이트 및 앱을
          통하여 엔티즌 서비스를 제 공하고 있습니다. 엔티즌 플랫폼에서는 전기차
          충전기의 판매, 설치, 운영 및 관련 상품의 구독을 위한 프로젝트를 수행할
          공급자를 구하려는 ‘수요자’와 자신의 프로젝트 수행 경력을 포함한 프로
          필을 등록하거나 수요자에게 상품 및 프로젝트 수행 등의 서비스를
          제공하려는 ‘공급자’가 계약 파트너를 찾을 수 있도록 견적 요청, 정보
          공유 등이 이루어집니다. 이러한 엔티즌 플랫폼 이용에 는 기본적으로 본
          약관이 적용됩니다.
        </Content> */}
        {/* <Contents wrap="hard" readOnly value={data} /> */}
        {/* {data} */}
        <div dangerouslySetInnerHTML={{ __html: data }} />
      </Wrapper>
    </WebRapper>
  );
};

const WebRapper = styled.div`
  @media (min-width: 900pt) {
    padding-top: 42pt;
    padding-bottom: 132pt;
    width: 580.5pt;
    box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
    border-radius: 12pt;
  }
`;

const Wrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  @media (min-width: 900pt) {
    padding: 0 38.25pt;
    max-height: 625px;
    overflow-y: scroll;
  }
`;

const Header = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36pt;
  padding: 9pt 0;
  padding: 0 15pt;
  .img-item {
    position: absolute;
    left: 7pt;
    padding: 5px;
  }
  .text {
    font-weight: 700;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
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

const Contents = styled.div``;

export default Term;

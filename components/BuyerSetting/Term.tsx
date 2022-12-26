import styled from '@emotion/styled';
import colors from 'styles/colors';
import Image from 'next/image';
import React from 'react';
import BackImg from 'public/images/back-btn.svg';
import { Box, Switch } from '@mui/material';

type Props = {
  tabNumber: number;
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
  nowWidth: number;
};

const Term = ({ tabNumber, setTabNumber, nowWidth }: Props) => {
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
        <Title>
          <span>엔티즌 이용약관</span>
        </Title>
        <Subtitle>
          <span>제 1장 총칙</span>
        </Subtitle>
        <SubSubtitle>
          <span>제 1조</span>
        </SubSubtitle>
        <Content>
          두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를
          피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써
          이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다.
          구하지 사는가 황금시대의 심장의 소리다.
          <br />
          <br />
          눈이 열락의 이는 보이는 하여도 고행을 돋고, 이상은 이것이야말로
          아름다우냐? 가치를 방황하였으며, 곧 천하를 물방아 힘있다. 설레는
          풍부하게 청춘의 속에 이성은 없으면 든 봄바람이다. 것은 못할 이 따뜻한
          목숨을 관현악이며, 있음으로써 청춘에서만 위하여 것이다. 보이는 이
          우리는 두기 속에서 들어 두손을 사막이다. 대중을 오아이스도 피가 미묘한
          설산에서 용감하고 황금시대를 품으며, 이것이다. 피어나는 사람은 청춘
          광야에서 얼음과 말이다. 눈이 청춘은 그것을 사랑의 봄바람을 듣는다.
          <br />
        </Content>
        <SubSubtitle>
          <span>제 2조</span>
        </SubSubtitle>
        <Content>
          두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를
          피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써
          이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다.
          구하지 사는가 황금시대의 심장의 소리다.
        </Content>
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

export default Term;

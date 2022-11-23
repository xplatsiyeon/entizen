import styled from '@emotion/styled';
import { InputAdornment, TextField } from '@mui/material';
import BottomNavigation from 'components/BottomNavigation';
import AllChattingList from 'components/Chatting/AllChattingList';
import Favorite from 'components/Chatting/Favorite';
import NotRead from 'components/Chatting/NotRead';
import Image from 'next/image';
import search from 'public/images/search.png';
import { useState } from 'react';

const Chatting = () => {
  const [index, setIndex] = useState<number>(0);

  const tabList = ['전체', '안 읽음', '즐겨찾기'];

  const components = [<AllChattingList />, <NotRead />, <Favorite />];

  const handle = () => {};

  return (
    <Body>
      <Header>
        <H2>소통하기</H2>
      </Header>
      <Input
        placeholder="이름을 검색하세요."
        type="text"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <div style={{ width: '15pt', height: '15pt' }}>
                <Image src={search} alt="searchIcon" layout="intrinsic" />
              </div>
            </InputAdornment>
          ),
        }}
      />
      <Inner>
        <TabList>
          {tabList.map((t, idx) => {
            return (
              <Tab
                key={idx}
                onClick={() => setIndex(idx)}
                tab={idx.toString()}
                index={index.toString()}
              >
                {t}
                <Dot tab={idx.toString()} index={index.toString()} />
              </Tab>
            );
          })}
          <FAQBtn onClick={handle}>FAQ</FAQBtn>
        </TabList>
        {/* 컴포넌트 호출되면 api get() */}
        <>{components[index]}</>
      </Inner>
      <BottomNavigation />
    </Body>
  );
};

export default Chatting;

const Body = styled.div`
  font-family: 'Spoqa Han Sans Neo';
`;
const Header = styled.header`
  position: relative;
  margin: 0 15pt;
`;

const H2 = styled.h2`
  font-style: normal;
  font-weight: 700;
  font-size: 21pt;
  line-height: 21pt;
  letter-spacing: -0.02em;
  color: #222222;
  margin: 12pt 0 15pt;
`;

const Input = styled(TextField)`
  margin: 0 15pt;
  border-radius: 6pt;
  border: 2.5pt solid #5221cb;
  display: flex;
  overflow: hidden;
  justify-content: center;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  margin-top: 0pt;
  .MuiInputBase-root {
    padding: 10.5pt 12pt;
  }
  & input {
    font-size: 10.5pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -2%;
    text-align: left;
    padding: 0;
  }

  ::placeholder {
    color: #caccd1;
    font-weight: 400;
  }
  & span > img {
    width: 15pt;
    height: 15pt;
  }
  & fieldset {
    border: none;
  }

  @media (max-width: 899.25pt) {
    margin-top: 9pt;
  }
`;

const Inner = styled.div`
  position: relative;
`;

const TabList = styled.ul`
  list-style: none;
  display: flex;
  gap: 15pt;
  padding: 22.5pt 0;
  position: relative;
  margin: 0 15pt;
`;
const Tab = styled.li<{ tab: string; index: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${({ tab, index }) => (tab === index ? `#5221CB` : `#CACCD1`)};
`;
const Dot = styled.div<{ tab: string; index: string }>`
  width: 3pt;
  height: 3pt;
  border-radius: 50%;
  margin: 6pt auto 0 auto;
  background-color: ${({ tab, index }) => tab === index && `#5221CB`};
`;

const FAQBtn = styled.button`
  background: #ffc043;
  border: none;
  border-radius: 12pt;
  color: white;
  font-style: normal;
  font-weight: 500;
  font-size: 9pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
  position: absolute;
  right: 0;
  top: 22.4pt;
  padding: 4.5pt 7.5pt;
`;

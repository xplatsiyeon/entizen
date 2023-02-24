import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import BackImg from 'public/images/back-btn.svg';
import colors from 'styles/colors';
import { useMediaQuery } from 'react-responsive';
import WebFooter from 'componentsWeb/WebFooter';
import { useState } from 'react';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebHeader from 'componentsWeb/WebHeader';
import { isTokenGetApi } from 'api';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { alarmNumberSliceAction } from 'store/alarmNumberSlice';

const Alam1_2 = () => {
  const mobile = useMediaQuery({
    query: '(max-width:810pt)',
  });
  const router = useRouter();
  const [openSubLink, setOpenSubLink] = useState<boolean>(false);
  const [componentId, setComponentId] = useState<number>();
  const [tabNumber, setTabNumber] = useState<number>(7);
  const memberType = JSON.parse(localStorage.getItem('MEMBER_TYPE')!);
  const tabHandler = (num: number) => setTab(num);
  const dispatch = useDispatch();
  const tabList: string[] = ['전체 알림', '공지사항'];
  const [tab, setTab] = useState<number>(0);

  return (
    <WebBody>
      {memberType === 'COMPANY' && !mobile ? (
        <WebBuyerHeader
          setOpenSubLink={setOpenSubLink}
          setTabNumber={setTabNumber}
          tabNumber={7}
          openSubLink={openSubLink}
        />
      ) : (
        <WebHeader />
      )}

      <Inner>
        <Wrapper>
          {mobile && (
            <Header>
              <div
                className="img-item"
                onClick={() => {
                  router.back();
                }}
              >
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
              <span className="text">전체 알림</span>
            </Header>
          )}
          <Tab>
            {tabList.map((text, index) => (
              <Text
                tab={tab.toString()}
                idx={index.toString()}
                className="tab-item"
                key={index}
                onClick={() => {
                  tabHandler(index);
                  router.push({
                    pathname: '/alarm',
                    query: {
                      id: index,
                    },
                  });
                }}
              >
                {text}
                {tab === index && <Line2 />}
              </Text>
            ))}
          </Tab>
          <Title>entizen 서비스 오픈</Title>
          <Date>2022.12.28</Date>
          <Line></Line>
          <BodyContainer>
            {/* <h3 className="name">1. 충전기 종류</h3> */}
            <p className="contents">
              안녕하세요 . entizen 입니다. 새로 오픈한 entizen 잘부탁드립니다.
              <br />
              이용시 불편사항은 언제든 문의부탁드립니다. 감사합니다.
            </p>
          </BodyContainer>
          {!mobile && (
            <ListButton
              // onClick={() => {
              //   router.push('/alarm?id=0');
              // }}
              onClick={() => {
                router.push('/alarm');
                dispatch(alarmNumberSliceAction.setalarmNumberSlice(0));
              }}
            >
              <span>목록으로 돌아가기</span>
            </ListButton>
          )}
        </Wrapper>
      </Inner>
      <WebFooter />
    </WebBody>
  );
};

export default Alam1_2;

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  width: 900pt;
  border-radius: 12pt;

  padding: 32.25pt 0 42pt;
  @media (min-width: 899.25pt) {
    padding-left: 127.5pt;
    padding-right: 127.5pt;
  }
  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0%;
    transform: none;
    padding: 0;
    box-shadow: none;
    background: none;
    margin: 0;
  }
  @media (max-height: 500pt) {
    height: 100%;
  }
`;

const Wrapper = styled.div`
  padding-bottom: 20pt;
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
const Title = styled.p`
  font-weight: 700;
  font-size: 13.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  padding-left: 15pt;
  /* padding-top: 25.5pt; */
  padding-top: 66pt;
  color: ${colors.main2};
`;
const Date = styled.div`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  padding-left: 15pt;
  padding-top: 9pt;
  color: #caccd1;
`;
const Line = styled.div`
  padding-top: 18pt;
  border-bottom: 1px solid #e2e5ed;
  transform: rotate(0deg);
`;
const BodyContainer = styled(Box)`
  padding: 30pt 15pt 0 15pt;
  .name {
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .contents {
    font-weight: 400;
    font-size: 12pt;
    line-height: 19.5pt;
    letter-spacing: -0.02em;
    padding-top: 9pt;
    color: ${colors.main2};
  }
`;

const Tab = styled(Box)`
  display: flex;
  border-bottom: 1px solid #f3f4f7;
  @media (min-width: 899.25pt) {
    justify-content: center;
  }
`;
const Text = styled.div<{ tab: string; idx: string }>`
  width: 50%;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${({ tab, idx }) => (tab === idx ? colors.main : '#caccd1')};
  padding: 12pt 0;
  position: relative;
  cursor: pointer;
  @media (min-width: 899.25pt) {
    /* width: 17.334%; */
    width: 24.19%;
  }
`;
const Line2 = styled.div`
  position: absolute;
  left: 15pt;
  right: 15pt;
  bottom: 0;
  border-bottom: 3pt solid ${colors.main};
  border-radius: 3.75pt;
`;

const ListButton = styled.div`
  padding: 9pt 15pt;
  background: #5221cb;
  border-radius: 21.75pt;
  margin: 60pt auto 0;
  width: 108pt;
  cursor: pointer;
  & span {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
    color: white;
  }
`;

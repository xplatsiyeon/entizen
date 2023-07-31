import styled from '@emotion/styled';
import FaqInfomation from 'components/FAQ/FaqInfomation';
import GuideHeader from 'components/guide/header';
import { useEffect, useState } from 'react';
import colors from 'styles/colors';
import RightArrow from 'public/images/black-right-arrow.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CommunicationIcon from 'public/images/communication-icon.svg';
import { ChattingListResponse } from 'components/Chatting/ChattingLists';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import UserRightMenu from 'components/UserRightMenu';
import { getApi, isTokenGetApi } from 'api';
import { useQuery } from 'react-query';
import { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers';

export interface FaqListResponse {
  isSuccess: boolean;
  data: {
    faqs: {
      faqIdx: number;
      faqKind: string;
      question: string;
      answer: string;
    }[];
  };
}

export interface Contents {
  faqIdx: number;
  faqKind: string;
  question: string;
  answer: string;
}
interface Components {
  [key: number]: JSX.Element;
}

const Faq = () => {
  const router = useRouter();
  const [tabNumber, setTabNumber] = useState<number>(0);
  const TabType: string[] = ['서비스 이용', '회원 정보', '신고'];
  const TabTypeEn: string[] = ['service', 'member', 'report'];
  const userID = JSON.parse(sessionStorage.getItem('USER_ID')!);

  // faq 리스트 조회
  const {
    data: faqList,
    isLoading: faqIsLoading,
    isError: faqIsError,
    refetch: faqRefetch,
  } = useQuery<FaqListResponse>('faq-list', () =>
    getApi(`/faqs?faqKind=${TabTypeEn[tabNumber]}`),
  );

  const handleTab = (index: number) => {
    setTabNumber(index);
  };
  const leftOnClick = () => {
    if (router.query.direct && router.query.direct === 'true') {
      router.back();
      // 설정페이지에서 이동
    } else {
      router.push('/setting');
    }
  };
  const rightOnClick = () => {
    router.push('/');
  };

  // 제휴문의 채팅방 보내기
  const { data, isLoading, isError, refetch } = useQuery<ChattingListResponse>(
    'chatting-list',
    () => isTokenGetApi(`/chatting?searchKeyword&filter=all`),
    {
      enabled: userID !== null ? true : false,
    },
  );

  useEffect(() => {
    faqRefetch();
  }, [tabNumber]);

  const chattingRoomIdx =
    data?.data.chattingRooms.entizenChattingRoom.chattingRoomIdx;
  // console.log('data', data);

  return (
    <WebBody>
      {/* 웹헤더 */}
      <WebHeader />
      {/* 오른쪽 메뉴 */}
      <UserRightMenu />
      {/* 내부 */}
      <Inner>
        <GuideHeader
          title="자주 묻는 질문"
          leftOnClick={leftOnClick}
          rightOnClick={rightOnClick}
        />
        <FlexBox>
          <FlexWrap>
            <TabContainer className="tab-head">
              {TabType.map((tab, index) => (
                <TabItem
                  key={index}
                  tab={tabNumber.toString()}
                  index={index.toString()}
                  onClick={() => {
                    handleTab(index);
                  }}
                >
                  {tab}
                  <Dot tab={tabNumber.toString()} index={index.toString()} />
                </TabItem>
              ))}
            </TabContainer>
            {/* <Main>{components[tabNumber]}</Main> */}
            {/* 메인 내용 */}
            <Main>
              <FaqInfomation faqList={faqList!} tabNumber={tabNumber} />
            </Main>
          </FlexWrap>
          <FlexWrap>
            <InfoText>
              <p>고객센터</p>
              <p>1544-6811</p>
              <p>평일 09:00~17:00</p>
              <p>
                점심시간 12:00 ~ 13:00
                <br />
                주말 및 공휴일 제외
              </p>
            </InfoText>
            <TextBox className="ask">
              <div>더 자세한 문의 사항은?</div>
              {/* 엔티즌과 소통하기 */}
              <Button
                onClick={() => {
                  if (userID) {
                    router.push({
                      pathname: `/chatting/chattingRoom`,
                      query: {
                        chattingRoomIdx: chattingRoomIdx,
                        entizen: true,
                      },
                    });
                  } else {
                    router.push('/signin');
                  }
                }}
              >
                <div>
                  <Image src={CommunicationIcon} alt="right-arrow" />
                </div>
                엔티즌과 소통하기
                <div>
                  <Image src={RightArrow} alt="right-arrow" />
                </div>
              </Button>
            </TextBox>
          </FlexWrap>
        </FlexBox>
      </Inner>
      <WebFooter />
    </WebBody>
  );
};

export default Faq;

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #ffffff;
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 100pt auto;
  width: 900pt;
  height: 100%;
  border-radius: 12pt;
  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    padding: 0;
    box-shadow: none;
    background: none;
    margin: 0;
  }
`;

const TabContainer = styled.div`
  display: flex;
  position: relative;
  padding-left: 15pt;
  padding-right: 15pt;
  cursor: pointer;
  @media (max-width: 899.25pt) {
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    padding: 0;
  }
`;
const TabItem = styled.div<{ tab: string; index: string }>`
  text-align: center;
  font-weight: 700;
  padding: 0 0 12pt;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  margin-right: 24pt;
  color: ${({ tab, index }) => (tab === index ? colors.main : '#CACCD1')};

  @media (max-width: 899.25pt) {
    margin-right: 0;
    padding: 12pt 0;
  }
`;
const Dot = styled.div<{ tab: string; index: string }>`
  width: 3pt;
  height: 3pt;
  border-radius: 50%;
  margin: 6pt auto 0 auto;
  background-color: ${({ tab, index }) => tab === index && `${colors.main}`};
`;
const Main = styled.div`
  padding: 30pt 12pt 0 12pt;
  @media (max-width: 899.25pt) {
    padding: 36pt 12pt 0 12pt;
  }
`;
const TextBox = styled.div`
  width: 100%;
  padding-top: 75pt;
  margin-bottom: 42pt;
  position: absolute;
  bottom: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div {
    font-weight: 500;
    font-size: 12pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray3};
  }
  @media (max-width: 899.25pt) {
    margin-bottom: 9pt;
  }
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15pt;
  padding: 10.5pt 12pt;
  border-radius: 21.75pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  background: #f3f4f7;
  color: ${colors.main2};
  cursor: pointer;
`;
const FlexBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  position: relative;

  @media (max-width: 899.25pt) {
    //flex-direction: column;
    //align-items: center;
    display: block;
    width: 100%;
  }
`;

const FlexWrap = styled.div`
  position: relative;

  &:nth-of-type(1) {
    width: 580.5pt;
  }

  &:nth-of-type(2) {
    width: 255pt;
    /* min-height: 312pt; */
    height: 312pt;
    box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
    border-radius: 16px;
  }

  @media (max-width: 899.25pt) {
    &:nth-of-type(1) {
      width: 100%;
    }
    &:nth-of-type(2) {
      width: 100%;
      height: 100%;
      box-shadow: none;
      border-radius: 0;
      height: 184pt;
      //position: fixed;
      //bottom: 0;
    }
  }
`;
const InfoText = styled.div`
  padding-top: 42pt;
  text-align: center;
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  letter-spacing: -0.02em;
  p {
    &:nth-of-type(1) {
      font-style: normal;
      font-weight: 700;
      font-size: 12pt;
      line-height: 12pt;
      letter-spacing: -0.02em;
      margin-bottom: 9pt;
    }
    &:nth-of-type(2) {
      font-style: normal;
      font-weight: 700;
      font-size: 30px;
      line-height: 30px;
      color: #5a2dc9;
      margin-bottom: 18pt;
    }
    &:nth-of-type(3) {
      font-style: normal;
      font-weight: 500;
      font-size: 13pt;
      line-height: 24pt;
      margin-bottom: 12pt;
    }
    &:nth-of-type(4) {
      font-weight: 500;
      font-size: 10.5pt;
      line-height: 16.5pt;
      //text-decoration: underline;
      color: #a6a9b0;
    }
  }

  @media (max-width: 899.25pt) {
    display: none;
  }
`;

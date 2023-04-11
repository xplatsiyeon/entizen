import styled from '@emotion/styled';
import FaqInfomation from 'components/FAQ/FaqInfomation';
import GuideHeader from 'components/guide/header';
import { useEffect, useState } from 'react';
import colors from 'styles/colors';
import RightArrow from 'public/images/black-right-arrow.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CommunicationIcon from 'public/images/communication-icon.svg';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';
import { isTokenGetApi } from 'api';
import { useQuery } from 'react-query';
import { ChattingListResponse } from 'components/Chatting/ChattingLists';
import useDebounce from 'hooks/useDebounce';
import { FaqListResponse } from 'pages/faq';

export interface Contents {
  id: number;
  name: string;
  text: string;
}
interface Components {
  [key: number]: JSX.Element;
}
const contents: Contents[] = [
  // {
  //   id: 0,
  //   name: '고객 요청서는 어디서 확인하나요?',
  //   text: '두기	 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
  // },
  // {
  //   id: 1,
  //   name: '낙찰 후 프로세스는 어떻게 되나요?',
  //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
  // },
  // {
  //   id: 2,
  //   name: '계약서 내용을 수정하고 싶어요',
  //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
  // },
  {
    id: 3,
    name: '서비스 이용료는 얼마인가요?',
    text: '서비스 이용료는 구독 기간에 따라 상이함으로 고객센터에 문의 부탁드립니다.',
  },
  // {
  //   id: 4,
  //   name: '알림 설정은 어떻게 하나요?',
  //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
  // },
  // {
  //   id: 5,
  //   name: '부당한 리뷰를 받았습니다.',
  //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
  // },
  // {
  //   id: 6,
  //   name: '보낸 견적을 취소할 수 있나요?',
  //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
  // },
  // {
  //   id: 7,
  //   name: '보낸 견적을 수정할 수 있나요?',
  //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
  // },
  // {
  //   id: 8,
  //   name: '견적은 어떤 과정을 통해 최종 종료되나요?',
  //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
  // },
  // {
  //   id: 9,
  //   name: '견적 제출은 어떻게 하나요?',
  //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
  // },
  // {
  //   id: 10,
  //   name: '현장실사는 어떻게 진행하면 되나요?',
  //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
  // },
  // {
  //   id: 11,
  //   name: '현장실사 후 견적 금액이 달라졌어요.',
  //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
  // },
];
const userInfo: Contents[] = [
  {
    id: 0,
    name: '담당자 변경은 어떻게 하나요?',
    text: '담당자 변경은 프로필 변경 페이지에서 변경된 담당자 인증 후 가능합니다.',
  },
  // {
  //   id: 1,
  //   name: '제품 정보는 어떻게 등록/변경 하나요?',
  //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
  // },
  // {
  //   id: 2,
  //   name: '회사명이 바뀌면 어떻게 하나요?',
  //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
  // },
  // {
  //   id: 3,
  //   name: '메일 주소가 바뀌면 어떻게 하나요?',
  //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
  // },
  // {
  //   id: 4,
  //   name: '회원 탈퇴는 어떻게 하나요?',
  //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
  // },
  // {
  //   id: 5,
  //   name: '탈퇴 후 재가입이 가능한가요?',
  //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
  // },
];
const report: Contents[] = [
  {
    id: 0,
    name: '이용 중 불편사항을 신고할 수 있나요?',
    text: '이용 중 불편사항은 1:1문의를 통해 접수 부탁드립니다.',
  },
  // {
  //   id: 1,
  //   name: '신고 받은 사람은 어떤 패널티를 받나요? ',
  //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
  // },
  // {
  //   id: 2,
  //   name: '부정 거래를 신고하면 어떤 혜택을 받나요? ',
  //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
  // },
  // {
  //   id: 3,
  //   name: '부정 거래란 무엇이며, 어떤 사례가 있나요?',
  //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
  // },
];

const Faq = () => {
  const router = useRouter();
  const [tabNumber, setTabNumber] = useState<number>(7);
  const [tabCompNumber, setTabCompNumber] = useState<number>(0);
  const [componentId, setComponentId] = useState<number>();
  const TabType: string[] = ['서비스 이용', '회원 정보', '신고'];
  const TabTypeEn: string[] = ['service', 'member', 'report'];

  // faq 리스트 조회
  const {
    data: faqList,
    isLoading: faqIsLoading,
    isError: faqIsError,
    refetch: faqRefetch,
  } = useQuery<FaqListResponse>('faq-list', () =>
    isTokenGetApi(`/faqs?faqKind=${TabTypeEn[tabCompNumber]}`),
  );
  const userID = sessionStorage.getItem('USER_ID');

  const components: Components = {
    0: <FaqInfomation faqList={faqList!} tabNumber={tabNumber} />,
    1: <FaqInfomation faqList={faqList!} tabNumber={tabNumber} />,
    2: <FaqInfomation faqList={faqList!} tabNumber={tabNumber} />,
  };
  const handleTab = (index: number) => {
    setTabCompNumber(index);
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
  const [openSubLink, setOpenSubLink] = useState<boolean>(false);

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
  }, [tabCompNumber]);

  const chattingRoomIdx =
    data?.data.chattingRooms.entizenChattingRoom.chattingRoomIdx;

  return (
    <WebBody>
      <CompanyRightMenu />
      <WebBuyerHeader
        setTabNumber={setTabNumber}
        tabNumber={tabNumber!}
        componentId={componentId}
        openSubLink={openSubLink}
        setOpenSubLink={setOpenSubLink}
      />
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
                  tab={tabCompNumber.toString()}
                  index={index.toString()}
                  onClick={() => handleTab(index)}
                >
                  {tab}
                  <Dot
                    tab={tabCompNumber.toString()}
                    index={index.toString()}
                  />
                </TabItem>
              ))}
            </TabContainer>
            {/* <Main>{components[tabCompNumber]}</Main> */}
            <Main>
              <FaqInfomation faqList={faqList!} tabNumber={tabCompNumber} />
            </Main>
          </FlexWrap>
          <FlexWrap>
            <InfoText>
              <p>고객센터</p>
              <p>9818-8856</p>
              <p>평일 10:00~17:00</p>
              <p>
                점심시간 12:00 ~ 13:00 /<br />
                주말 및 공휴일 제외
              </p>
            </InfoText>
            <TextBox className="ask">
              <div>더 자세한 문의 사항은?</div>
              <Button
                onClick={() =>
                  router.push({
                    pathname: `/company/chatting/chattingRoom`,
                    query: {
                      chattingRoomIdx: chattingRoomIdx,
                      entizen: true,
                    },
                  })
                }
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
  background: #fcfcfc;
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
  @media (min-width: 900pt) {
    margin: 54pt auto 100pt;
  }
`;

const TabContainer = styled.div`
  display: flex;
  position: relative;
  padding-left: 15pt;
  padding-right: 15pt;
  cursor: pointer;
  @media (max-width: 899.25pt) {
    width: 100%;
  }
`;
const TabItem = styled.span<{ tab: string; index: string }>`
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
    margin-right: 15pt;
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
    min-height: 312pt;
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
      text-decoration: underline;
      color: #a6a9b0;
    }
  }

  @media (max-width: 899.25pt) {
    display: none;
  }
`;

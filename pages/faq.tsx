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
// const contents: Contents[] = [
//   // {
//   //   id: 0,
//   //   name: '간편견적은 어떻게 이용하나요?',
//   //   text: '두기	 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
//   // },
//   // {
//   //   id: 1,
//   //   name: '구독료는 언제 지불하나요?',
//   //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
//   // },
//   // {
//   //   id: 2,
//   //   name: '보조금 신청은 어떻게 하나요?',
//   //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
//   // },
//   {
//     id: 3,
//     name: '파트너와 연락이 되지 않습니다.',
//     text: '해당 문제는 1:1 문의를 통해 접수 부탁드립니다.',
//   },
//   // {
//   //   id: 4,
//   //   name: '어떤 충전기를 사야할지 모르겠어요.',
//   //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
//   // },
//   // {
//   //   id: 5,
//   //   name: '조금 더 자세한 상담을 받고 싶습니다.',
//   //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
//   // },
//   // {
//   //   id: 6,
//   //   name: '견적 취소요청은 어떻게 하나요?',
//   //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
//   // },
//   // {
//   //   id: 7,
//   //   name: '공사 진행 중 거래를 중단할 수 있나요?',
//   //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
//   // },
// ];
// const userInfo: Contents[] = [
//   // {
//   //   id: 0,
//   //   name: '회원가입은 어떻게 진행하나요?',
//   //   text: '두기	 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
//   // },
//   // {
//   //   id: 1,
//   //   name: '외국인도 회원가입이 가능한가요?',
//   //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
//   // },
//   // {
//   //   id: 2,
//   //   name: '타인 명의로 가입할 수 있나요?',
//   //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
//   // },
//   {
//     id: 3,
//     name: '개인 정보 변경은 어떻게 하나요?',
//     text: '프로필 변경에서 수정 가능합니다.',
//   },
//   // {
//   //   id: 4,
//   //   name: '회원 탈퇴는 어떻게 하나요?',
//   //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
//   // },
//   // {
//   //   id: 5,
//   //   name: '탈퇴 후 재가입이 가능한가요?',
//   //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
//   // },
// ];
// const report: Contents[] = [
//   {
//     id: 0,
//     name: '이용 중 불편사항을 신고할 수 있나요?',
//     text: '이용 중 불편하상은 1:1문의를 통해 접수 부탁드립니다.',
//   },
//   // {
//   //   id: 1,
//   //   name: '신고 받은 사람은 어떤 패널티를 받나요? ',
//   //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
//   // },
//   // {
//   //   id: 2,
//   //   name: '부정 거래를 신고하면 어떤 혜택을 받나요? ',
//   //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
//   // },
//   // {
//   //   id: 3,
//   //   name: '부정 거래란 무엇이며, 어떤 사례가 있나요?',
//   //   text: '두기 굳세게 광야에서 속에 기쁘며, 들어 얼음이 예가 있다. 황금시대를 피가 발휘하기 피고, 너의 봄바람이다. 인생의 이상의 실로 있음으로써 이상의 두손을 철환하였는가? 보이는 위하여 우리는 곧 청춘의 힘있다. 구하지 사는가 황금시대의 심장의 소리다.',
//   // },
// ];

const Faq = () => {
  const router = useRouter();
  const [tabNumber, setTabNumber] = useState<number>(0);
  const TabType: string[] = ['서비스 이용', '회원 정보', '신고'];
  const TabTypeEn: string[] = ['service', 'member', 'report'];
  const userID = JSON.parse(localStorage.getItem('USER_ID')!);

  // faq 리스트 조회
  const {
    data: faqList,
    isLoading: faqIsLoading,
    isError: faqIsError,
    refetch: faqRefetch,
  } = useQuery<FaqListResponse>('faq-list', () =>
    getApi(`/faqs?faqKind=${TabTypeEn[tabNumber]}`),
  );

  console.log('🐣 faqList 🐣', faqList);

  const handleTab = (index: number) => {
    setTabNumber(index);
  };
  const leftOnClick = () => {
    router.back();
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
      <WebHeader />
      <UserRightMenu />
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
            <Main>
              <FaqInfomation faqList={faqList!} tabNumber={tabNumber} />
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
                    pathname: `/chatting/chattingRoom`,
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
  color: ${({ tab, index }) =>
    tab === index ? colors.main : colors.lightGray};

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

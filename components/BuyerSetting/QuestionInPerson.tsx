import styled from '@emotion/styled';
import FaqInfomation from 'components/FAQ/FaqInfomation';
import GuideHeader from 'components/guide/header';
import BackImg from 'public/images/back-btn.svg';
import { Box, Switch } from '@mui/material';
import { useState } from 'react';
import colors from 'styles/colors';
import RightArrow from 'public/images/black-right-arrow.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CommunicationIcon from 'public/images/communication-icon.svg';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import CallModal from 'components/CallModal';
import { ChattingListResponse } from 'components/Chatting/ChattingLists';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';

export interface Contents {
  id: number;
  name: string;
  text: string;
}
interface Components {
  [key: number]: JSX.Element;
}

type Props = {
  tabNumber: number;
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
};

const QuestionInPerson = ({ tabNumber, setTabNumber }: Props) => {
  const router = useRouter();
  const userID = JSON.parse(sessionStorage.getItem('USER_ID')!);
  const [mailOn, setMailOn] = useState<boolean>(false);
  const [callBtnModal, setCallBtnModal] = useState<boolean>(false);

  const leftOnClick = () => {
    router.back();
  };
  const rightOnClick = () => {
    router.push('/');
  };

  // 이메일 주소 복사하는 함수
  const handleCopyEmail = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
    } catch (error) {}
  };

  // 제휴문의 채팅방 보내기
  const { data, isLoading, isError, refetch } = useQuery<ChattingListResponse>(
    'chatting-list',
    () => isTokenGetApi(`/chatting?searchKeyword&filter=all`),
    {
      enabled: userID !== null ? true : false,
    },
  );

  const onClickBack = () => {
    if (router.query.direct && router.query.direct === 'true') {
      router.back();
      // 설정페이지에서 이동
    } else {
      setTabNumber(0);
    }
  };

  const chattingRoomIdx =
    data?.data?.chattingRooms?.entizenChattingRoom?.chattingRoomIdx;

  return (
    <WebBody>
      <Inner>
        <Header>
          <div className="img-item" onClick={onClickBack}>
            {/* <div className="img-item" onClick={() => router.back()}> */}
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
          <span className="text">1:1 문의</span>
        </Header>
        <CustomerCenterWrapper>
          <CustomerTitle>
            고객센터 운영 안내
            <CustomerBox>
              <CustomerSapn>• 평일 10:00 ~ 17:00</CustomerSapn>
              <CustomerSapn>
                • 점심시간 12:00 ~ 13:00 / 주말 및 공휴일 제외
              </CustomerSapn>
            </CustomerBox>
          </CustomerTitle>
        </CustomerCenterWrapper>
        <Wrapper>
          <SettingBox
            onClick={() => {
              setMailOn(true);
              setTimeout(function () {
                setMailOn(false);
              }, 1500);
              handleCopyEmail('entizen@entizen.kr');
            }}
          >
            <SettingList>이메일 문의하기</SettingList>
            <div>
              <Image src={RightArrow} alt="right-arrow" />
            </div>
          </SettingBox>
          <SettingBox
            onClick={() =>
              userID
                ? router.push({
                    pathname: `/chatting/chattingRoom`,
                    query: {
                      chattingRoomIdx: chattingRoomIdx,
                      entizen: true,
                    },
                  })
                : router.push('/signin')
            }
          >
            <SettingList>엔티즌과 소통하기</SettingList>
            <div>
              <Image src={RightArrow} alt="right-arrow" />
            </div>
          </SettingBox>
          {/* 앱 심사로 인해 일시적으로 주석 처리 */}
          {/* <CallBox href="tel:9818-8856">
            <SettingList
            // onClick={() => {
            //   setCallBtnModal(true);
            // }}
            >
              전화 문의하기
            </SettingList>

            <div>
              <Image src={RightArrow} alt="right-arrow" />
            </div>
          </CallBox> */}
          <MailCopyBtn mailOn={mailOn}>
            이메일 주소가 복사 되었습니다.
          </MailCopyBtn>
        </Wrapper>
        {/* {callBtnModal === true && (
          <CallModal
            setCallBtnModal={setCallBtnModal}
            callBtnModal={callBtnModal}
          />
        )} */}
      </Inner>
    </WebBody>
  );
};

export default QuestionInPerson;

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

  @media (min-width: 900pt) {
    display: none;
  }
`;

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

  @media (min-width: 900pt) {
    display: none;
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

const CustomerCenterWrapper = styled.div`
  background-color: #fbfcff;
  padding: 16.5pt 82.5pt 15.75pt 15pt;
`;

const CustomerTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 12pt;
  line-height: 16pt;
`;
const CustomerBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 12pt;
`;
const CustomerSapn = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 9pt;
  line-height: 13.5pt;
  color: #a6a9b0;
`;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  padding-left: 15pt;
  padding-right: 15pt;
`;

const SettingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13.5pt 22.5pt 0 0;
`;

const SettingList = styled.div`
  position: relative;
  padding-top: 10.5pt;
  padding-bottom: 10.5pt;
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  cursor: pointer;
`;

const MailCopyBtn = styled.div<{ mailOn: boolean }>`
  position: relative;
  top: 140pt;
  padding: 16pt 49.5pt;
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
  background-color: #464646;
  color: #ffffff;
  border-radius: 8pt;
  display: ${({ mailOn }) => (mailOn === true ? '' : 'none')};
`;

const CallBox = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13.5pt 22.5pt 0 0;
  text-decoration: none;
  color: #222222;
`;

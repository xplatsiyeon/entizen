import styled from '@emotion/styled';
import FaqInfomation from 'components/FAQ/FaqInfomation';
import GuideHeader from 'components/guide/header';
import { useState } from 'react';
import colors from 'styles/colors';
import RightArrow from 'public/images/black-right-arrow.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CommunicationIcon from 'public/images/communication-icon.svg';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import CallModal from 'components/CallModal';
import { isTokenGetApi } from 'api';
import { useQuery } from 'react-query';
import { ChattingListResponse } from 'components/Chatting/ChattingLists';

export interface Contents {
  id: number;
  name: string;
  text: string;
}
interface Components {
  [key: number]: JSX.Element;
}

const questionInPerson = () => {
  const router = useRouter();
  const userID = JSON.parse(sessionStorage.getItem('USER_ID')!);
  const [tabNumber, setTabNumber] = useState<number>(0);
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

  const chattingRoomIdx =
    data?.data?.chattingRooms?.entizenChattingRoom?.chattingRoomIdx;

  return (
    <WebBody>
      <WebHeader />
      <Inner>
        <GuideHeader
          title="1:1 문의"
          leftOnClick={leftOnClick}
          rightOnClick={rightOnClick}
        />
        <CustomerCenterWrapper>
          <CustomerTitle>
            고객센터 운영 안내
            <CustomerBox>
              <CustomerSapn>• 평일 09:00 ~ 17:00</CustomerSapn>
              <CustomerSapn>
                • 점심시간 12:00 ~ 13:00 / 주말 및 공휴일 제외
              </CustomerSapn>
            </CustomerBox>
          </CustomerTitle>
        </CustomerCenterWrapper>
        <Wrapper>
          <SettingBox>
            {/* 나중에 이 버튼은 누르면 엔티즌? 이메일 복사 하는 기능 추가해야합니다! */}
            <SettingList
              onClick={() => {
                setMailOn(true);
                setTimeout(function () {
                  setMailOn(false);
                }, 2000);
                handleCopyEmail('help@entizen.kr');
              }}
            >
              이메일 문의하기
            </SettingList>
            <div>
              <Image src={RightArrow} alt="right-arrow" />
            </div>
          </SettingBox>
          <SettingBox>
            <SettingList
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
              엔티즌과 소통하기
            </SettingList>
            <div>
              <Image src={RightArrow} alt="right-arrow" />
            </div>
          </SettingBox>
          {/* 전화 문의하기 */}
          <SettingBox
            onClick={() => {
              setCallBtnModal(true);
            }}
          >
            <SettingList>전화 문의하기</SettingList>
            <div>
              <Image src={RightArrow} alt="right-arrow" />
            </div>
          </SettingBox>
          <MailCopyBtn mailOn={mailOn}>
            이메일 주소가 복사 되었습니다.
          </MailCopyBtn>
        </Wrapper>
        {callBtnModal === true && (
          <CallModal
            setCallBtnModal={setCallBtnModal}
            callBtnModal={callBtnModal}
          />
        )}
      </Inner>
      <WebFooter />
    </WebBody>
  );
};

export default questionInPerson;

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

import React, { useState } from 'react';
import BackImg from 'public/images/back-btn.svg';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Image from 'next/image';
import RightArrow from 'public/images/black-right-arrow.svg';
import ChatsSvg from 'public/images/ChatsBlackSvg.svg';
import MailSvg from 'public/images/MailBlackSvg.svg';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import { ChattingListResponse } from 'components/Chatting/ChattingLists';
import { useRouter } from 'next/router';

const QuestionInPersonWeb = () => {
  const router = useRouter();
  const [mailOn, setMailOn] = useState<boolean>(false);
  const userID = JSON.parse(sessionStorage.getItem('USER_ID')!);

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
    <Wrapper>
      <Box>
        <MainTitle>1:1 문의</MainTitle>
        <FlexWrapper>
          <SubTitle>고객센터 운영 관리</SubTitle>
          <CallNumber>9818-8856</CallNumber>
        </FlexWrapper>
        <CustomerBox>
          <CustomerSapn>• 평일 10:00 ~ 17:00</CustomerSapn>
          <CustomerSapn>
            • 점심시간 12:00 ~ 13:00 / 주말 및 공휴일 제외
          </CustomerSapn>
        </CustomerBox>
        <QuestionBox>
          <QuestionText>더 자세한 문의사항은?</QuestionText>
          <SpeechWrap>
            <SpeechBubble
              onClick={() =>
                userID
                  ? router.push({
                      pathname: `/company/chatting/chattingRoom`,
                      query: {
                        chattingRoomIdx: chattingRoomIdx,
                        entizen: true,
                      },
                    })
                  : router.push('/signin')
              }
            >
              <Image src={ChatsSvg} alt="Chats" />
              <SpeechText>엔티즌과 소통하기</SpeechText>
              <Image src={RightArrow} alt="right-arrow" />
            </SpeechBubble>
            <SpeechBubble
              onClick={() => {
                setMailOn(true);
                setTimeout(function () {
                  setMailOn(false);
                }, 1500);
                handleCopyEmail('entizen@entizen.kr');
              }}
            >
              <Image src={MailSvg} alt="Mail" />
              <SpeechText>이메일 문의하기</SpeechText>
              <Image src={RightArrow} alt="right-arrow" />
            </SpeechBubble>
          </SpeechWrap>
        </QuestionBox>
        <MailCopyBtn mailOn={mailOn}>
          이메일 주소가 복사 되었습니다.
        </MailCopyBtn>
      </Box>
    </Wrapper>
  );
};

export default QuestionInPersonWeb;

const TextNormal = css`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 580.5pt;
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
`;

const Box = styled.div`
  padding: 42pt 38.25pt 253pt 38.25pt;
`;

const MainTitle = styled.div`
  ${TextNormal}
  font-size: 18pt;
  line-height: 24pt;
  letter-spacing: -0.02em;
  text-align: left;
  padding-bottom: 45pt;
  color: #222222;
`;

const SubTitle = styled.div`
  ${TextNormal}
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #222222;
`;

const CallNumber = styled.div`
  ${TextNormal}
  font-size: 22.5pt;
  line-height: 22.5pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #5221cb;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 18pt;
`;

const CustomerBox = styled.div`
  padding-bottom: 90pt;
`;

const CustomerSapn = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 16.5pt;
  letter-spacing: -0.02em;
  color: #a6a9b0;
`;

const QuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const QuestionText = styled.div`
  ${TextNormal}
  color: #A6A9B0;
  font-size: 12pt;
  line-height: 15pt;
  padding-bottom: 15pt;
`;

const SpeechWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 310pt;
`;

const SpeechBubble = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 13.875pt;
  padding-right: 15.75pt;
  border-radius: 21.75pt;
  width: 150.125pt;
  height: 33pt;
  background-color: #f3f4f7;
  cursor: pointer;
`;

const IconBox = styled.div`
  margin: 0 auto;
  width: 20pt;
`;

const IconBox2 = styled.div`
  margin: 0 auto;
  width: 13pt;
`;

const SpeechText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #222222;
`;

const MailCopyBtn = styled.div<{ mailOn: boolean }>`
  /* position: relative;
  top: 140pt; */
  position: absolute;
  top: 70%;
  left: 53%;
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

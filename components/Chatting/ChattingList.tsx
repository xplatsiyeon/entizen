import styled from '@emotion/styled';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import defaultImg from 'public/images/default-img.png';
import { TouchEvent, useRef, useState } from 'react';
import QuitModal from './QuitModal';
import unChecked from 'public/images/unChecked.png';
import checked from 'public/images/checked.png';
import hiddenUnChecked from 'public/images/hiddenUnChecked.png';
import hiddenChecked from 'public/images/hiddenChecked.png';
import hiddenStopAlarm from 'public/images/hiddenStopAlarm.png';
import hiddenAlarm from 'public/images/hiddenAlarm.png';
import { ChattingListResponse } from 'pages/chatting';
import { useMutation, useQueryClient } from 'react-query';
import { isTokenPatchApi } from 'api';

type Props = {
  data: ChattingListResponse;
};
const ChattingList = ({ data }: Props) => {
  const router = useRouter();
  const queryClinet = useQueryClient();

  const [modal, setModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>();

  const {
    mutate: patchMutate,
    isLoading: patchIsLoading,
    isError: patchIsError,
  } = useMutation(isTokenPatchApi, {
    onSuccess: () => {
      queryClinet.invalidateQueries('chatting-list');
    },
    onError: () => {},
  });

  /*메세지 시간 표현 처리 함수 */
  const handleTime = (target: string | undefined) => {
    const now = dayjs();
    const diff = now.diff(target, 'h');

    if (diff < 24) {
      const createdAt = dayjs(target).format('HH:mm');

      //오전, 오후로 나누기
      const pm = dayjs(target).subtract(12, 'h').format('HH:mm');
      if (Number(pm.substring(0, 3)) > 12) {
        return `오후 ${pm}`;
      } else {
        return `오전 ${pm}`;
      }
    } else if (diff > 24 && diff < 48) {
      const createdAt = dayjs(target).format('HH:mm');
      const pm = dayjs(target).subtract(12, 'h').format('HH:mm');

      if (Number(pm.substring(0, 3)) > 12) {
        return `어제 ${pm}`;
      } else {
        return `어제 ${pm}`;
      }
    } else {
      const createdAt = dayjs(target).format('YYYY-MM-DD HH:mm');
      const year = dayjs(target).get('y');
      const month = dayjs(target).get('month');
      const day = dayjs(target).get('day');

      if (now.get('y') !== year) {
        return `${year}년 ${month}월 ${day}일`;
      } else {
        return `${month}월 ${day}일 `;
      }
    }
  };
  /* 드래그 조절 함수 */
  const chattingList = useRef<HTMLDivElement>(null);
  let pressed = false;
  let prev: number;
  let start: string;
  const touchStart = (e: TouchEvent<HTMLElement>) => {
    if (pressed) {
      return;
    } else {
      pressed = true;
      prev = e.changedTouches[0].clientX;
      if (!e.currentTarget.style.marginLeft) {
        e.currentTarget.style.marginLeft = '-40%'; //맨 처음, 값 초기화.
      }
      start = e.currentTarget.style.marginLeft.slice(0, -1);
      console.log('s', start);
    }
  };
  const touchMove = (e: TouchEvent<HTMLElement>, idx: number) => {
    if (!pressed) {
      return;
    } else {
      const now = e.changedTouches[0].clientX;

      //현재 스타일의 marginLeft 객체의 값에서 숫자만 남기기.
      const nowNum = e.currentTarget.style.marginLeft.slice(0, -1);

      //드래그되는 속도 조절 부분. 숫자가 클수록 속도가 빨라진다.
      let n = prev - now > 0 ? -0.5 : 0.5;

      if (start === '-40') {
        if (prev - now > 50) {
          const newNum = Number(nowNum) + n;
          const num = newNum < -60 ? -60 : newNum;
          // console.log('??', newNum)
          e.currentTarget.style.marginLeft = `${num}%`;
        } else if (prev - now < -50) {
          //오른쪽으로
          const newNum = Number(nowNum) + n;
          const num = newNum > 0 ? 0 : newNum;
          e.currentTarget.style.marginLeft = `${num}%`;
        }
      }

      if (start === '0') {
        n = prev - now > 0 ? -0.7 : 0.7;
        if (prev - now > 50) {
          const newNum = Number(nowNum) + n;
          const num = newNum < -40 ? -40 : newNum;
          //console.log('??', num)
          e.currentTarget.style.marginLeft = `${num}%`;
        }
      }

      if (start === '-60') {
        if (prev - now < -50) {
          const newNum = Number(nowNum) + n;
          const num = newNum > -40 ? -40 : newNum;
          e.currentTarget.style.marginLeft = `${num}%`;
        }
      }
    }
  };
  const touchEnd = (e: TouchEvent<HTMLElement>) => {
    const target = e.currentTarget;

    if (pressed) {
      const now = e.changedTouches[0].clientX;

      if (start === '-40') {
        if (prev - now > 50) {
          e.currentTarget.style.transition = '0.4s';
          e.currentTarget.style.marginLeft = '-60%';
        } else if (prev - now < -50) {
          e.currentTarget.style.transition = '0.4s';
          e.currentTarget.style.marginLeft = '-0%';
        } else {
          e.currentTarget.style.marginLeft = `${start}%`;
        }
      }

      if (start === '0') {
        if (prev - now > 50) {
          e.currentTarget.style.transition = '0.4s';
          e.currentTarget.style.marginLeft = '-40%';
        } else {
          e.currentTarget.style.marginLeft = `${start}%`;
        }
      }

      if (start === '-60') {
        if (prev - now < -100) {
          e.currentTarget.style.transition = '0.4s';
          e.currentTarget.style.marginLeft = '-40%';
        } else {
          e.currentTarget.style.marginLeft = `${start}%`;
        }
      }

      //e.currentTarget.style.transition = 'none';
    }

    setTimeout(() => {
      pressed = false;
      target.style.transition = 'none';
    }, 450);
  };

  const onClickFavorite = (chattingRoomIdx: number) => {
    patchMutate({
      url: `/chatting/${chattingRoomIdx}/favorite`,
    });
  };
  const onClickAlarm = (chattingRoomIdx: number) => {
    patchMutate({
      url: `/chatting/${chattingRoomIdx}/notification`,
    });
  };

  /* 디테일 페이지 이동 */
  const handleRoute = (
    chattingRoomIdx: number,
    name: string,
    alarm: boolean,
  ) => {
    console.log('route');
    router.push({
      pathname: `/chatting`,
      query: {
        chattingRoomIdx: chattingRoomIdx,
        name: name,
        alarm: alarm,
      },
    });
  };

  return (
    <Body ref={chattingList}>
      {data?.data?.chattingRooms?.userChattingRooms?.map((chatting, idx) => {
        return (
          <Chatting
            className="chattingRoom"
            key={idx}
            onTouchStart={(e) => touchStart(e)}
            onTouchMove={(e) => touchMove(e, idx)}
            onTouchEnd={touchEnd}
          >
            <HiddenBox1>
              {/* 버튼에 즐겨찾기 설정 api함수 */}
              <FavoriteBtn
                onClick={() => onClickFavorite(chatting.chattingRoomIdx)}
              >
                {chatting.chattingRoomFavorite.isFavorite ? (
                  <HiddenIconWrap>
                    <Image src={hiddenChecked} layout="fill" />
                  </HiddenIconWrap>
                ) : (
                  <HiddenIconWrap>
                    <Image src={hiddenUnChecked} layout="fill" />
                  </HiddenIconWrap>
                )}
              </FavoriteBtn>
              {/* 버튼에 알림 설정 api함수 */}
              <AlramBtn onClick={() => onClickAlarm(chatting.chattingRoomIdx)}>
                {chatting.chattingRoomNotification.isSetNotification ? (
                  <HiddenIconWrap>
                    <Image src={hiddenAlarm} layout="fill" />
                  </HiddenIconWrap>
                ) : (
                  <HiddenIconWrap>
                    <Image src={hiddenStopAlarm} layout="fill" />
                  </HiddenIconWrap>
                )}
              </AlramBtn>
            </HiddenBox1>
            <ChattingRoom
              className="content-box"
              onClick={() =>
                handleRoute(
                  chatting.chattingRoomIdx,
                  chatting.companyMember.companyMemberAdditionalInfo
                    .companyName,
                  chatting.chattingRoomNotification.isSetNotification,
                )
              }
            >
              <ChattingRoomImage>
                {/* 이미지 파일 src가 없으면 */}
                <ImageWrap>
                  <Image src={defaultImg} layout="fill" />
                </ImageWrap>
              </ChattingRoomImage>
              <ChattingRoomPreview>
                <FromMember>
                  {
                    chatting.companyMember.companyMemberAdditionalInfo
                      .companyName
                  }
                </FromMember>
                <Previw>{chatting.chattingLogs?.content}</Previw>
              </ChattingRoomPreview>
              <ChattingRoomInfo>
                <Created>
                  {handleTime(chatting.chattingLogs?.createdAt)}
                </Created>
                <Box>
                  <UnRead
                    wasRead={chatting.chattingLogs?.wasRead || undefined}
                  />
                  <Favorite>
                    {chatting.chattingRoomFavorite.isFavorite ? (
                      <Image src={checked} layout="fill" />
                    ) : (
                      <Image src={unChecked} layout="fill" />
                    )}
                  </Favorite>
                </Box>
              </ChattingRoomInfo>
            </ChattingRoom>
            <HiddenBox2>
              <QuitBtn
                onClick={() => {
                  setDeleteId(chatting?.chattingRoomIdx!);
                  setModal(true);
                }}
              >
                <span> 나가기 </span>
              </QuitBtn>
            </HiddenBox2>
          </Chatting>
        );
      })}
      {modal && <QuitModal deleteId={deleteId} setModal={setModal} />}
    </Body>
  );
};

export default ChattingList;

const Body = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  overflow: hidden;
`;

const Chatting = styled.div`
  display: flex;
  width: 160%;
  margin-left: -40%;
  &.move {
    transition: 0.4s;
  }
`;
const ChattingRoom = styled.div`
  display: flex;
  padding: 13.5pt 1pt 13.5pt 0;
  border-bottom: 1px solid #e2e5ed;
  width: calc((100% / 8) * 5);
`;
const ChattingRoomImage = styled.div`
  margin-left: 21pt;

  @media (max-width: 899pt) {
    margin-left: 15pt;
  }
`;
const ChattingRoomPreview = styled.div`
  flex: auto;
  margin: 0 12pt;

  position: relative;
`;
const ChattingRoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9pt;
  margin-right: 21pt;

  @media (max-width: 899pt) {
    margin-right: 15pt;
  }
`;
const ImageWrap = styled.div`
  width: 36pt;
  height: 36pt;
  position: relative;
`;
const FromMember = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: #222222;
`;
const Previw = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  color: #222222;
  position: absolute;
  width: 120%;
`;

const Created = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #caccd1;
  min-width: 67.5pt;
  height: 12pt;
  text-align: end;
`;

const Box = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 6.75pt;
  align-items: center;
`;
const UnRead = styled.div<{ wasRead?: boolean }>`
  width: 6pt;
  height: 6pt;
  border-radius: 50%;
  background: ${({ wasRead }) => (wasRead ? `none` : `#5221CB`)};
`;
const Favorite = styled.div`
  position: relative;
  width: 9pt;
  height: 9pt;
`;

const HiddenBox1 = styled.div`
  display: flex;
  width: 25%;
  position: relative;
`;
const HiddenBox2 = styled.div`
  display: flex;
  width: 12.5%;
  position: relative;
`;

const HiddenIconWrap = styled.div`
  position: relative;
  width: 15pt;
  height: 15pt;
`;

const FavoriteBtn = styled.div`
  width: 50%;
  height: 100%;
  background: rgba(90, 45, 201, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlramBtn = styled.div`
  width: 50%;
  height: 100%;
  background: #5221cb;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuitBtn = styled.div`
  width: 100%;
  height: 100%;
  background: #f75015;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #ffffff;
`;

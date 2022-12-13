import styled from '@emotion/styled';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import defaultImg from 'public/images/default-img.png';
import { TouchEvent, useEffect, useRef, useState } from 'react';
import unChecked from 'public/images/unChecked.png';
import checked from 'public/images/checked.png';
import QuitModal from 'components/Chatting/QuitModal';
import { ChattingListResponse } from 'pages/chatting';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation, useQueryClient } from 'react-query';
import { isTokenPatchApi } from 'api';
import hiddenUnChecked from 'public/images/hiddenUnChecked.png';
import hiddenChecked from 'public/images/hiddenChecked.png';
import hiddenStopAlarm from 'public/images/hiddenStopAlarm.png';
import hiddenAlarm from 'public/images/hiddenAlarm.png';
import chatEntizen from 'public/images/chatEntizen.png';
import { handleTime } from 'utils/messageTime';

type Props = {
  // type: number
  data: ChattingListResponse; 
  refetch : <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) =>
            Promise<QueryObserverResult<ChattingListResponse, unknown>>
};

type UserChattingLogs = {
  chattingRoomIdx: number;
  companyMember: {
    //판매자 회원정보
    memberIdx: number;
    companyMemberAdditionalInfo: {
      companyName: string;
    };
  };
  userMember: {
    //구매자 회원정보
    memberIdx: number;
    name: string;
  };
  chattingLogs: {
    fromMemberIdx: number;
    fromMemberType: string;
    wasRead: boolean;
    createdAt: string;
    content: string;
    fileUrl: string | null;
  } | null; //채팅방 정보
  chattingRoomFavorite: {
    // 채팅방 즐겨찾기 관련 정보
    chattingRoomFavoriteIdx: number;
    isFavorite: boolean;
  };
  chattingRoomNotification: {
    //채팅방 알림설정
    chattingRoomNotificationIdx: number;
    isSetNotification: boolean;
  };
};

const ComChattingList = ({ data, refetch }: Props) => {
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

  useEffect(()=>{
    refetch();
  },[])

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
  const touchMove = (e: TouchEvent<HTMLElement>) => {
    if (!pressed) {
      return;
    } else {
      const now = e.changedTouches[0].clientX;

      //현재 스타일의 marginLeft 객체의 값에서 숫자만 남기기.
      const nowNum = e.currentTarget.style.marginLeft.slice(0, -1);

      //드래그되는 속도 조절 부분. 숫자가 클수록 속도가 빨라진다.
      let n = prev - now > 0 ? -2 : 2;

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
        n = prev - now > 0 ? -4 : 4;
        if (prev - now > -50) {
          //오른쪽으로
          const newNum = Number(nowNum) + n;
          const num = newNum < -40 ? -40 : newNum;
          //console.log('??', num)
          e.currentTarget.style.marginLeft = `${num}%`;
        }
      }

      if (start === '-60') {
        if (prev - now < 50) {
          const newNum = Number(nowNum) + n;
          const num = newNum > -40 ? -40 : newNum;
          e.currentTarget.style.marginLeft = `${num}%`;
        }
      }
    }
  };
  const touchEnd = (e: TouchEvent<HTMLElement>) => {
    if (pressed) {
      const now = e.changedTouches[0].clientX;

      if (start === '-40') {
        if (prev - now > 0) {
          e.currentTarget.style.marginLeft = '-60%';
        } else if (prev - now < 0) {
          e.currentTarget.style.marginLeft = '-0%';
        }
      }

      if (start === '0') {
        if (prev - now > 0) {
          e.currentTarget.style.marginLeft = '-40%';
        }
      }

      if (start === '-60') {
        if (prev - now < -0) {
          e.currentTarget.style.marginLeft = '-40%';
        }
      }
      pressed = false;
    }
  };
  const onClickFavorite = (chattingRoomIdx: number) => {
    patchMutate({
      url: `/chatting/${chattingRoomIdx}/favorite`,
    });
    refetch();
  };
  const onClickAlarm = (chattingRoomIdx: number) => {
    patchMutate({
      url: `/chatting/${chattingRoomIdx}/notification`,
    });
  };
  /* 디테일 페이지 이동 */
  const handleRoute = (chattingRoomIdx: number, entizen?:boolean) => {
   if(entizen){
    router.push({
      pathname: `/company/chatting/chattingRoom`,
      query: {
        chattingRoomIdx: chattingRoomIdx,
        entizen: true
      },
    });
  }else{
    router.push({
      pathname: `/company/chatting/chattingRoom`,
      query: {
        chattingRoomIdx: chattingRoomIdx,
      },
    });
  }
  };

  console.log('com,list', data?.data.chattingRooms.userChattingRooms)

  return (
    <Body ref={chattingList}>

      {/* 엔티젠. 상위 고정 && 채팅방 나가기 불가.*/}
      <Chatting
            className="chattingRoom"
            onTouchStart={(e) => touchStart(e)}
            onTouchMove={(e) => touchMove(e)}
            onTouchEnd={touchEnd}
          >
            <HiddenBox1>
              {/* 버튼에 즐겨찾기 설정 api함수 */}
              <FavoriteBtn
                onClick={() => onClickFavorite(data.data.chattingRooms.entizenChattingRoom?.chattingRoomFavorite.chattingRoomFavoriteIdx)}
              >
                {data?.data.chattingRooms.entizenChattingRoom?.chattingRoomFavorite.isFavorit ? (
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
              <AlramBtn onClick={() => onClickAlarm(data?.data.chattingRooms.entizenChattingRoom?.chattingRoomNotification.chattingRoomNotificationIdx)}>
                {data?.data.chattingRooms.entizenChattingRoom?.chattingRoomNotification.isSetNotification ? (
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
              onClick={() => handleRoute(data?.data.chattingRooms.entizenChattingRoom?.chattingRoomIdx, true)}
            >
              <ChattingRoomImage>
                {/* 이미지 파일 src가 없으면 */}
                <ImageWrap>
                  <Image src={chatEntizen} layout="fill" />
                </ImageWrap>
              </ChattingRoomImage>
              <ChattingRoomPreview>
                <FromMember>
                  엔티즌
                </FromMember>
                <Previw>{data?.data.chattingRooms.entizenChattingRoom?.chattingLog?.content}</Previw>
              </ChattingRoomPreview>
              <ChattingRoomInfo>
                <Created>
                  {handleTime(data?.data.chattingRooms.entizenChattingRoom?.chattingLog?.createdAt)}
                </Created>
                <Box>
                  <UnRead
                    wasRead={data?.data.chattingRooms?.entizenChattingRoom.chattingLog === null ? null : true}
                  />
                  <Favorite>
                    {data?.data.chattingRooms.entizenChattingRoom?.chattingRoomFavorite.isFavorit? (
                      <Image src={checked} layout="fill" />
                    ) : (
                      <Image src={unChecked} layout="fill" />
                    )}
                  </Favorite>
                </Box>
              </ChattingRoomInfo>
            </ChattingRoom>
      </Chatting>

      {data?.data?.chattingRooms?.userChattingRooms?.map((chatting, idx) => {
        return (
          <Chatting
            className="chattingRoom"
            key={idx}
            onTouchStart={(e) => touchStart(e)}
            onTouchMove={(e) => touchMove(e)}
            onTouchEnd={(e) => touchEnd(e)}
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
              /* 자신의 Id, 상대방 id, name, alarm여부(채팅목록에는 알람여부 정보가 없어서) */
              onClick={() => handleRoute(chatting.chattingRoomIdx)}
            >
              <ChattingRoomImage>
                {/* 이미지 파일 src가 없으면 */}
                <ImageWrap>
                  <Image src={defaultImg} layout="fill" />
                </ImageWrap>
              </ChattingRoomImage>
              <ChattingRoomPreview>
                <FromMember>{chatting.userMember.name}</FromMember>
                <Previw>{chatting.chattingLogs?.content}</Previw>
              </ChattingRoomPreview>
              <ChattingRoomInfo>
                <Created>
                  {handleTime(chatting.chattingLogs?.createdAt)}
                </Created>
                <Box>
                  <UnRead  
                  wasRead={chatting?.chattingLogs === null ? null : Boolean(chatting?.chattingLogs?.wasRead)}
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
      {modal && <QuitModal deleteId={Number(deleteId)} setModal={setModal} />}
    </Body>
  );
};

export default ComChattingList;

const Body = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  overflow: hidden;
`;

const Chatting = styled.div`
  display: flex;
  width: 160%;
  margin-left: -40%;
`;
const ChattingRoom = styled.div`
  display: flex;
  cursor: pointer;
  padding: 13.5pt 1pt 13.5pt 0;
  border-bottom: 1px solid #e2e5ed;
  width: calc((100% / 8) * 5);
`;
const ChattingRoomImage = styled.div`
  margin-left: 21pt;

  @media (max-width: 899.25pt) {
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

  @media (max-width: 899.25pt) {
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

const UnRead = styled.div<{ wasRead: boolean | null}>`
width: 6pt;
height: 6pt;
border-radius: 50%;
background: ${({ wasRead }) => (wasRead === null || wasRead === true ? `none` : `#5221CB`)};
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
const HiddenIconWrap = styled.div`
  position: relative;
  width: 15pt;
  height: 15pt;
`;
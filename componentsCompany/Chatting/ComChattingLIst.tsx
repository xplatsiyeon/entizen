import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import defaultImg from 'public/images/defaultImg.png';
import entizenCK from 'public/images/entizenCK.png';
import { TouchEvent, useEffect, useRef, useState } from 'react';
import unChecked from 'public/images/unChecked.png';
import checked from 'public/images/checked.png';
import QuitModal from 'components/Chatting/QuitModal';
import {
  ChattingListResponse,
  EntizenChattingRoom,
  UserChattingRooms,
} from 'pages/chatting';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from 'react-query';
import { isTokenPatchApi } from 'api';
import hiddenUnChecked from 'public/images/hiddenUnChecked.png';
import hiddenChecked from 'public/images/hiddenChecked.png';
import hiddenStopAlarm from 'public/images/hiddenStopAlarm.png';
import hiddenAlarm from 'public/images/hiddenAlarm.png';
import newChatEntizen from 'public/images/newChatEntizen.png';
import { handleTime } from 'utils/messageTime';
import ChattingContextModal from 'components/Modal/ChattingContextModal';

type Props = {
  // type: number
  data: ChattingListResponse;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<ChattingListResponse, unknown>>;
};

const ComChattingList = ({ data, refetch }: Props) => {
  const router = useRouter();
  const [modal, setModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>();
  const [chattingType, setChattingType] = useState<'ADMIN' | 'MEMBER'>();
  const [chatting, setChatting] = useState<
    UserChattingRooms | EntizenChattingRoom
  >();

  const mobRef = useRef<HTMLDivElement>(null);
  const startPoint = useRef<number>(0);

  // 채팅리스트를 모두 돌면서, 현재 선택한 채팅방(class = 'on')을 제외한 모든 채팅방의 슬라이드 인덱스 초기화.
  const clearMove = () => {
    const list = mobRef.current?.querySelectorAll(
      '.chattingRoom',
    ) as NodeListOf<HTMLElement>;
    list.forEach((ele) => {
      if (!ele.classList.contains('slide1') && !ele.classList.contains('on')) {
        ele.style.transition = '0.3s';
        ele.style.transform = `translate3d(-160px, 0px ,0px)`;
        ele.classList.remove('slide0');
        ele.classList.remove('slide2');
        ele.classList.add('slide1');
      }

      //현재 채팅방 선택 해제.
      ele.classList.remove('on');
      setTimeout(() => (ele.style.transition = '0s'), 400);
    });
  };

  //채팅창 드래그 시작점 set.
  const handleMoveStart = (e: TouchEvent) => {
    const start = e.changedTouches[0].clientX;
    startPoint.current = start;
  };

  //드래그 함수. 드래그한 만큼 슬라이드 이동.
  //엔티즌 채팅방은 오른쪽방향 드래그 금지시켜야 함.
  const handleMove = (e: TouchEvent, entizen?: boolean) => {
    const target = e.currentTarget as HTMLDivElement;

    // 드래그할 때 마다 x의 값 갱신.
    const x = e.changedTouches[0].clientX;

    //현재 이동시키는 채팅방을 클래스네임을 주어서 따로 표시.
    target.classList.add('on');

    //현재 이동시키는 채팅방을 제외한 모든 채팅방의 슬라이드 인덱스를 1로 초기화.
    clearMove();

    //슬라이드 인덱스 별로 움직여야하는 px수가 정해져있다.(x축만)
    // slide0: 0px까지. slide1: -160px까지. slide2: -240px까지.
    if (target.classList.contains('slide0')) {
      //드래그 방향 결정하는 조건.
      //드래그의 시작점이 현재 드래그 지점보다 크면 오른쪽으로 이동.
      //드래그의 시작점이 현재 드래그 지점보다 작으면 왼쪽으로 이동.
      if (startPoint.current > x) {
        const moving = (x - startPoint.current) * 0.3; //양수.
        console.log(moving);
        target.style.transform = `translate3d(${moving}px, 0px ,0px)`;
      }
    } else if (target.classList.contains('slide1')) {
      if (startPoint.current < x) {
        const moving = -160 + (x - startPoint.current) * 0.3;
        if (moving >= 0) {
          target.style.transform = `translate3d(0px, 0px ,0px)`;
        } else {
          target.style.transform = `translate3d(${moving}px, 0px ,0px)`;
        }
      } else if (startPoint.current > x) {
        const moving = -160 + (x - startPoint.current) * 0.3;
        if (moving <= -240 && !Boolean(entizen)) {
          target.style.transform = `translate3d(-240px, 0px ,0px)`;
        } else if (entizen) {
          target.style.transform = `translate3d(-160px, 0px ,0px)`;
        } else {
          target.style.transform = `translate3d(${moving}px, 0px ,0px)`;
        }
      }
    } else if (target.classList.contains('slide2')) {
      if (startPoint.current < x) {
        const moving = -240 + (x - startPoint.current) * 0.3; //음수.
        console.log(moving);
        target.style.transform = `translate3d(${moving}px, 0px ,0px)`;
      }
    }
  };

  //슬라이드 인덱스를 결정해주는 함수. 슬라이드가 어느 정도 움직여야 슬라이드의 인덱스가 바뀐다.
  //슬라이드 인덱스 별로 움직일 수 있는 방향이 정해져있다.
  //slide0: 오른쪽으로만 이동 가능. slide1: 양방향으로 이동 가능. slide2: 왼쪽으로만 이동 가능.
  //엔티즌 채팅방은 오른쪽방향 드래그 금지시켜야 함.
  const handleMoveEnd = (e: TouchEvent, entizen?: boolean) => {
    const target = e.currentTarget as HTMLDivElement;
    const endPoint = e.changedTouches[0].clientX;
    //드래그(슬라이딩)가 되는 도중은 transition속성이 있으면 오히려 더 버벅이는 모션이 되지만,
    //슬라이드 인덱스가 바뀔때는 transition속성이 있어야 더 부드러운 모션이 되므로 이 때에만 transition속성을 준다.
    target.style.transition = '0.3s';

    if (target.classList.contains('slide0')) {
      if (startPoint.current - endPoint >= 50) {
        target.style.transform = `translate3d(-160px, 0px ,0px)`;
        target.classList.remove('slide0');
        target.classList.add('slide1');
      } else {
        target.style.transform = `translate3d(0px, 0px ,0px)`;
      }
    } else if (target.classList.contains('slide1')) {
      if (startPoint.current - endPoint <= -50) {
        console.log('slide1, ', startPoint.current - endPoint);
        target.style.transform = `translate3d(0px, 0px ,0px)`;
        target.classList.remove('slide1');
        target.classList.add('slide0');
      } else if (startPoint.current - endPoint >= 50 && !Boolean(entizen)) {
        console.log('slide1, ', startPoint.current - endPoint);
        target.style.transform = `translate3d(-240px, 0px ,0px)`;
        target.classList.remove('slide1');
        target.classList.add('slide2');
      } else {
        target.style.transform = `translate3d(-160px, 0px ,0px)`;
      }
    } else if (target.classList.contains('slide2')) {
      if (startPoint.current - endPoint <= -50) {
        target.style.transform = `translate3d(-160px, 0px ,0px)`;
        target.classList.remove('slide2');
        target.classList.add('slide1');
      } else {
        target.style.transform = `translate3d(-240px, 0px ,0px)`;
      }
    }

    //transition 속성 제거. transition은 위에 적어둔 시간만큼 지속되어야 하므로
    //setTimeout으로 위에 적은 시간만큼 기다린 후에 transition을 0s로 바꾼다.
    setTimeout(() => {
      target.style.transition = '0s';
    }, 400);
  };

  const {
    mutate: patchMutate,
    isLoading: patchIsLoading,
    isError: patchIsError,
  } = useMutation(isTokenPatchApi, {
    onSuccess: () => {
      //queryClinet.invalidateQueries('chatting-list');
      refetch();
    },
    onError: () => {},
  });

  // 채팅 알림 함수
  const onClickFavorite = (chattingRoomIdx: number) => {
    patchMutate({
      url: `/chatting/${chattingRoomIdx}/favorite`,
    });
  };
  // 채팅 알림 함수
  const onClickAlarm = (chattingRoomIdx: number) => {
    patchMutate({
      url: `/chatting/${chattingRoomIdx}/notification`,
    });
  };
  // 채팅방 나가기
  const onClickDelete = (chattingRoomIdx: number) => {
    setDeleteId(chattingRoomIdx!);
    setModal(true);
  };
  /* 디테일 페이지 이동 */
  const handleRoute = (chattingRoomIdx: number, entizen?: boolean) => {
    if (entizen) {
      router.push({
        pathname: `/company/chatting/chattingRoom`,
        query: {
          chattingRoomIdx: chattingRoomIdx,
          entizen: true,
        },
      });
    } else {
      router.push({
        pathname: `/company/chatting/chattingRoom`,
        query: {
          chattingRoomIdx: chattingRoomIdx,
        },
      });
    }
  };

  // 우클릭
  const onClickDeleteChattingRoom = (
    event: React.MouseEvent<HTMLDivElement>,
    userChattingData?: UserChattingRooms,
    entizenChattingData?: EntizenChattingRoom,
  ) => {
    event.preventDefault();
    // 유저 데이터
    if (userChattingData) {
      setChattingType('MEMBER');
      setChatting(userChattingData);
    }
    // 엔티즌 데이터
    if (entizenChattingData) {
      setChattingType('ADMIN');
      setChatting(entizenChattingData);
    }
    // 우클릭 모달창
    const modal: HTMLElement | null = document.getElementById('modal');
    console.log('modal: ', modal);

    const xPos = event.clientX;
    const yPos = event.clientY;

    // 모달 창 위치 설정
    if (modal) {
      modal.style.left = xPos + 'px';
      modal.style.top = yPos + 'px';

      // 모달 창 보이기
      modal.style.display = 'block';
    }
  };

  return (
    <>
      {/* 오른쪽 마우스 클릭 시 뜨는 모달 */}
      {
        <ChattingContextModal
          type={chattingType!}
          chatting={chatting}
          onClickFavorite={() => onClickFavorite(chatting?.chattingRoomIdx!)}
          onClickAlarm={() => onClickAlarm(chatting?.chattingRoomIdx!)}
          onClickRouter={() => handleRoute(chatting?.chattingRoomIdx!)}
          onClickDelete={() => onClickDelete(chatting?.chattingRoomIdx!)}
        />
      }
      {/* PC */}
      <Web>
        <Body>
          {/* 엔티즌. 상위 고정 && 채팅방 나가기 불가.*/}
          <Chatting
            className="chattingRoom"
            onContextMenu={(event) =>
              onClickDeleteChattingRoom(
                event,
                undefined,
                data?.data?.chattingRooms?.entizenChattingRoom as any,
              )
            }
          >
            <HiddenBox1>
              {/* 버튼에 즐겨찾기 설정 api함수 */}
              <FavoriteBtn
                onClick={() =>
                  onClickFavorite(
                    data?.data?.chattingRooms?.entizenChattingRoom
                      ?.chattingRoomIdx!,
                  )
                }
              >
                {data?.data?.chattingRooms?.entizenChattingRoom
                  ?.chattingRoomFavorite?.isFavorite ? (
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
              <AlramBtn
                onClick={() =>
                  onClickAlarm(
                    data?.data?.chattingRooms?.entizenChattingRoom
                      ?.chattingRoomIdx!,
                  )
                }
              >
                {data?.data.chattingRooms.entizenChattingRoom
                  ?.chattingRoomNotification.isSetNotification ? (
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
            <ChattingRoom className="content-box">
              <ChattingRoomImage>
                {/* 이미지 파일 src가 없으면 */}
                <ImageWrap>
                  <Image src={newChatEntizen} layout="fill" />
                </ImageWrap>
              </ChattingRoomImage>
              <ChattingRoomPreview
                onClick={() =>
                  handleRoute(
                    data?.data?.chattingRooms.entizenChattingRoom
                      ?.chattingRoomIdx!,
                    true,
                  )
                }
              >
                <FromMember>
                  {' '}
                  <span>엔티즌</span>{' '}
                  <Image src={entizenCK} width={16} height={16} />
                </FromMember>
                <Previw>
                  {
                    data?.data?.chattingRooms?.entizenChattingRoom?.chattingLog
                      ?.content!
                  }
                </Previw>
              </ChattingRoomPreview>
              <ChattingRoomInfo>
                <Created>
                  {handleTime(
                    data?.data?.chattingRooms?.entizenChattingRoom?.chattingLog
                      ?.createdAt!,
                  )}
                </Created>
                <Box>
                  <EnUnRead
                    wasRead={
                      data?.data?.chattingRooms?.entizenChattingRoom
                        ?.chattingLog?.fromMemberType !== 'COMPANY' &&
                      !Boolean(
                        data?.data?.chattingRooms?.entizenChattingRoom
                          ?.chattingLog?.wasRead,
                      )
                        ? true
                        : false
                    }
                  />
                  <Favorite
                    onClick={() =>
                      onClickFavorite(
                        data?.data?.chattingRooms?.entizenChattingRoom
                          ?.chattingRoomIdx!,
                      )
                    }
                  >
                    {data?.data.chattingRooms.entizenChattingRoom
                      ?.chattingRoomFavorite.isFavorite ? (
                      <Image src={checked} layout="fill" />
                    ) : (
                      <Image src={unChecked} layout="fill" />
                    )}
                  </Favorite>
                </Box>
              </ChattingRoomInfo>
            </ChattingRoom>
          </Chatting>

          {/* ============================== 유저 채팅방 리스트 ==========================*/}

          {data?.data?.chattingRooms?.userChattingRooms?.map(
            (chatting, idx) => {
              return (
                <Chatting
                  className="chattingRoom"
                  key={idx}
                  onContextMenu={(event) =>
                    onClickDeleteChattingRoom(event, chatting)
                  }
                >
                  <HiddenBox1>
                    {/* 버튼에 즐겨찾기 설정 api함수 */}
                    <FavoriteBtn
                      onClick={() =>
                        onClickFavorite(chatting?.chattingRoomIdx!)
                      }
                    >
                      {chatting?.chattingRoomFavorite?.isFavorite ? (
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
                    <AlramBtn
                      onClick={() => onClickAlarm(chatting?.chattingRoomIdx!)}
                    >
                      {chatting?.chattingRoomNotification?.isSetNotification ? (
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
                  <ChattingRoom className="content-box">
                    <ChattingRoomImage>
                      {/* 이미지 파일 src가 없으면 */}
                      <ImageWrap>
                        {chatting.userMember.profileImageUrl ? (
                          <img src={chatting.userMember.profileImageUrl} />
                        ) : (
                          <Image src={defaultImg} layout="fill" />
                        )}
                      </ImageWrap>
                    </ChattingRoomImage>
                    {/* 채팅방 디테일 라우팅 */}
                    <ChattingRoomPreview
                      onClick={() => handleRoute(chatting.chattingRoomIdx!)}
                    >
                      <FromMember>{chatting.userMember?.name}</FromMember>
                      <Previw>{chatting.chattingLogs?.content}</Previw>
                    </ChattingRoomPreview>
                    <ChattingRoomInfo>
                      <Created>
                        {handleTime(chatting.chattingLogs?.createdAt)}
                      </Created>
                      <Box>
                        <UnRead
                          wasRead={
                            chatting?.chattingLogs?.fromMemberIdx !==
                              chatting?.companyMember.memberIdx &&
                            chatting?.chattingLogs?.wasRead === false
                              ? true
                              : false
                          }
                        />
                        {/* 즐겨찾기 */}
                        <Favorite
                          onClick={() =>
                            onClickFavorite(chatting?.chattingRoomIdx!)
                          }
                        >
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
                    {/* 채팅방 나가기 */}
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
            },
          )}
          {/* 모바일 나가기 모달창 */}
          {modal && (
            <QuitModal deleteId={Number(deleteId)} setModal={setModal} />
          )}
        </Body>
      </Web>

      {/* 모바일 */}
      <Mob ref={mobRef}>
        <Body>
          {data?.data?.chattingRooms?.entizenChattingRoom && (
            /* 엔티젠. 상위 고정 && 채팅방 나가기 불가.*/
            <Chatting
              className="chattingRoom slide1"
              onTouchStart={(e) => handleMoveStart(e)}
              onTouchMove={(e) => handleMove(e, true)}
              onTouchEnd={(e) => handleMoveEnd(e, true)}
              onContextMenu={(event) =>
                onClickDeleteChattingRoom(
                  event,
                  undefined,
                  data?.data?.chattingRooms?.entizenChattingRoom as any,
                )
              }
            >
              <HiddenBox1>
                {/* 버튼에 즐겨찾기 설정 api함수 */}
                <FavoriteBtn
                  onClick={() =>
                    onClickFavorite(
                      data?.data?.chattingRooms?.entizenChattingRoom
                        ?.chattingRoomIdx!,
                    )
                  }
                >
                  {data?.data?.chattingRooms?.entizenChattingRoom
                    ?.chattingRoomFavorite?.isFavorite ? (
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
                <AlramBtn
                  onClick={() =>
                    onClickAlarm(
                      data?.data?.chattingRooms?.entizenChattingRoom
                        ?.chattingRoomIdx!,
                    )
                  }
                >
                  {data?.data.chattingRooms.entizenChattingRoom
                    ?.chattingRoomNotification.isSetNotification ? (
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
                onClick={() => {
                  handleRoute(
                    data?.data?.chattingRooms?.entizenChattingRoom
                      ?.chattingRoomIdx!,
                    true,
                  );
                }}
              >
                <ChattingRoomImage>
                  {/* 이미지 파일 src가 없으면 */}
                  <ImageWrap>
                    <Image src={newChatEntizen} layout="fill" />
                  </ImageWrap>
                </ChattingRoomImage>
                <ChattingRoomPreview>
                  <FromMember>
                    <span>엔티즌</span>
                    <Image src={entizenCK} width={16} height={16} />{' '}
                  </FromMember>
                  <Previw>
                    {
                      data?.data?.chattingRooms?.entizenChattingRoom
                        ?.chattingLog?.content!
                    }
                  </Previw>
                </ChattingRoomPreview>
                <ChattingRoomInfo>
                  <Created>
                    {handleTime(
                      data?.data?.chattingRooms?.entizenChattingRoom
                        ?.chattingLog?.createdAt!,
                    )}
                  </Created>
                  <Box>
                    <EnUnRead
                      //메세지 보낸이 === 엔티즌 && 메세지 읽음 여부 ? true : false
                      wasRead={
                        data?.data?.chattingRooms?.entizenChattingRoom
                          ?.chattingLog?.fromMemberType !== 'COMPANY' &&
                        !Boolean(
                          data?.data?.chattingRooms?.entizenChattingRoom
                            ?.chattingLog?.wasRead,
                        )
                          ? true
                          : false
                      }
                    />

                    <Favorite>
                      {data?.data.chattingRooms.entizenChattingRoom
                        ?.chattingRoomFavorite.isFavorite ? (
                        <Image
                          src={checked}
                          layout="fill"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onClickFavorite(
                              data?.data?.chattingRooms?.entizenChattingRoom
                                ?.chattingRoomIdx!,
                            );
                          }}
                        />
                      ) : (
                        <Image
                          src={unChecked}
                          layout="fill"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onClickFavorite(
                              data?.data?.chattingRooms?.entizenChattingRoom
                                ?.chattingRoomIdx!,
                            );
                          }}
                        />
                      )}
                    </Favorite>
                  </Box>
                </ChattingRoomInfo>
              </ChattingRoom>
            </Chatting>
          )}

          {/* 유저 채팅방.*/}
          {data?.data?.chattingRooms?.userChattingRooms?.map(
            (chatting, idx) => {
              return (
                <Chatting
                  className="chattingRoom slide1"
                  key={idx}
                  onTouchStart={(e) => handleMoveStart(e)}
                  onTouchMove={(e) => handleMove(e)}
                  onTouchEnd={(e) => handleMoveEnd(e)}
                  onContextMenu={(event) =>
                    onClickDeleteChattingRoom(event, chatting)
                  }
                >
                  <HiddenBox1>
                    {/* 버튼에 즐겨찾기 설정 api함수 */}
                    <FavoriteBtn
                      onClick={() =>
                        onClickFavorite(chatting?.chattingRoomIdx!)
                      }
                    >
                      {chatting?.chattingRoomFavorite?.isFavorite ? (
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
                    <AlramBtn
                      onClick={() => onClickAlarm(chatting?.chattingRoomIdx!)}
                    >
                      {chatting?.chattingRoomNotification?.isSetNotification ? (
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
                        {chatting.userMember.profileImageUrl ? (
                          <img src={chatting.userMember.profileImageUrl} />
                        ) : (
                          <Image src={defaultImg} layout="fill" />
                        )}
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
                          //wasRead={chatting?.chattingLogs === null ? null : Boolean(chatting?.chattingLogs?.wasRead)}

                          //메세지 보낸 멤버와 컴퍼니 유저가 다름 && 상대방이 메세지를 읽지않음 ? true : false;
                          wasRead={
                            chatting?.chattingLogs?.fromMemberIdx !==
                              chatting?.companyMember.memberIdx &&
                            chatting?.chattingLogs?.wasRead === false
                              ? true
                              : false
                          }
                        />
                        <Favorite>
                          {chatting.chattingRoomFavorite.isFavorite ? (
                            <Image
                              src={checked}
                              layout="fill"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onClickFavorite(chatting?.chattingRoomIdx!);
                              }}
                            />
                          ) : (
                            <Image
                              src={unChecked}
                              layout="fill"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onClickFavorite(chatting?.chattingRoomIdx!);
                              }}
                            />
                          )}
                        </Favorite>
                      </Box>
                    </ChattingRoomInfo>
                  </ChattingRoom>
                  <HiddenBox2>
                    <QuitBtn
                      onClick={() => {
                        onClickDelete(chatting?.chattingRoomIdx!);
                      }}
                    >
                      <span> 나가기 </span>
                    </QuitBtn>
                  </HiddenBox2>
                </Chatting>
              );
            },
          )}
          {modal && (
            <QuitModal deleteId={Number(deleteId)} setModal={setModal} />
          )}
        </Body>
      </Mob>
    </>
  );
};

export default ComChattingList;

const Web = styled.div`
  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const Mob = styled.div`
  position: fixed;
  @media (min-width: 900pt) {
    display: none;
  }
`;

const Body = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  overflow: hidden;
`;

const Chatting = styled.div`
  display: flex;
  width: calc(100vw + 240px);
  transform: translate3d(-160px, 0px, 0px);
  @media (min-width: 900pt) {
    width: 160%;
    transform: translate3d(0px, 0px, 0px);
  }
  //일단.. 드래그시 덜컹거리면 삭제하자. 그리고 터치엔드 함수로 transition 주기
  //transition: 0.4s;
`;

const ChattingRoom = styled.div`
  display: flex !important;
  cursor: pointer;
  padding: 12pt 1pt 12pt 0;
  border-bottom: 1px solid #e2e5ed;
  width: calc((100% / 8) * 5);
  /* border: 1px solid red; */

  @media (max-width: 899pt) {
    width: 100vw !important;
  }
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
  border-radius: 50%;
  overflow: hidden;
  border: 0.75pt solid #d3d3d3;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const FromMember = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: #222222;
  span {
    margin-right: 3pt;
  }
`;
const Previw = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  color: #222222;
  position: absolute;
  width: 100%;
  height: 18pt;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

const UnRead = styled.div<{ wasRead: boolean | null }>`
  width: 6pt;
  height: 6pt;
  border-radius: 50%;
  background: ${({ wasRead }) => (Boolean(wasRead) ? `#5221CB` : `none`)};
`;
const EnUnRead = styled.div<{ wasRead: boolean }>`
  width: 6pt;
  height: 6pt;
  border-radius: 50%;
  background: ${({ wasRead }) => (wasRead ? `#5221CB` : `none`)};
`;

const Favorite = styled.div`
  position: relative;
  width: 9pt;
  height: 9pt;
`;

const HiddenBox1 = styled.div`
  display: flex !important;
  width: 25%;
  position: relative;

  > div {
    flex: 1;
  }

  display: none !important;

  @media (max-width: 899.25pt) {
    display: flex !important;
    height: 60.75pt;
    width: 160px;
  }
`;

const HiddenBox2 = styled.div`
  display: flex !important;
  width: 12.5%;
  position: relative;
  right: -2pt;

  @media (max-width: 899pt) {
    //width: 60pt!important;
    //position: absolute;
    height: 60.75pt;
    width: 80px;
  }
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

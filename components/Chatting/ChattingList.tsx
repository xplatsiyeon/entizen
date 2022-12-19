import styled from '@emotion/styled';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import defaultImg from 'public/images/defaultImg.png';
import { Dispatch, SetStateAction, TouchEvent, useRef, useState } from 'react';
import QuitModal from './QuitModal';
import unChecked from 'public/images/unChecked.png';
import checked from 'public/images/checked.png';
import hiddenUnChecked from 'public/images/hiddenUnChecked.png';
import hiddenChecked from 'public/images/hiddenChecked.png';
import hiddenStopAlarm from 'public/images/hiddenStopAlarm.png';
import hiddenAlarm from 'public/images/hiddenAlarm.png';
//import chatEntizen from 'public/images/chatEntizen.png';
import newChatEntizen from 'public/images/newChatEntizen.png';
import { ChattingListResponse } from 'pages/chatting';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
  useQueryClient,
} from 'react-query';
import { isTokenPatchApi } from 'api';
import { handleTime } from 'utils/messageTime';

import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


type Props = {
  data: ChattingListResponse;
  setName?: Dispatch<SetStateAction<string>> | undefined;
  setIsAlarm?: Dispatch<SetStateAction<string>> | undefined;
  refetch?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<ChattingListResponse, unknown>>;
  chattingRoom?:boolean;
};

const ChattingList = ({ data, refetch,chattingRoom }: Props) => {
  const router = useRouter();
  const queryClinet = useQueryClient();

  const [modal, setModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>();

  // 채팅방 알림 에러
  const {
    mutate: patchMutate,
    isLoading: patchIsLoading,
    isError: patchIsError,
  } = useMutation(isTokenPatchApi, {
    onSuccess: () => {
      refetch!();
      // queryClinet.invalidateQueries('chatting-list');
    },
    onError: (error) => {
      console.log('채팅 알림 기능 에러');
      console.log(error);
    },
  });

  // 채팅 즐겨찾기 함수
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

  /* 디테일 페이지 이동 */
  const handleRoute = (chattingRoomIdx: number, entizen?:boolean) => {
    if(entizen){
     router.push({
       pathname: `/chatting/chattingRoom`,
       query: {
         chattingRoomIdx: chattingRoomIdx,
         entizen: true
       },
     });
   }else{
     router.push({
       pathname: `/chatting/chattingRoom`,
       query: {
         chattingRoomIdx: chattingRoomIdx,
       },
     });
   }
   };

   const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    initialSlide : 1,
    responsive: [
      
      {
        breakpoint: 1199,
        settings: {
          variableWidth: true,
          centerMode: false
        }
      }
    ]
  };

  return (
    <>

    <Web>
    <Body>
      { data?.data?.chattingRooms?.entizenChattingRoom &&
      /* 엔티젠. 상위 고정 && 채팅방 나가기 불가.*/
      <Chatting
            className="chattingRoom"
          >
            <HiddenBox1>
              {/* 버튼에 즐겨찾기 설정 api함수 */}
              <FavoriteBtn
                onClick={() => onClickFavorite(data?.data?.chattingRooms?.entizenChattingRoom?.chattingRoomIdx!)}
              >
                {data?.data.chattingRooms.entizenChattingRoom?.chattingRoomFavorite.isFavorite ? (
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
              <AlramBtn onClick={() => onClickAlarm(data?.data?.chattingRooms?.entizenChattingRoom?.chattingRoomIdx!)}>
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
                  <Image src={newChatEntizen} layout="fill" />
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
                     wasRead={data?.data?.chattingRooms?.entizenChattingRoom.chattingLog?.fromMemberIdx === data?.data?.chattingRooms?.entizenChattingRoom.chattingRoomIdx && !Boolean(data?.data?.chattingRooms?.entizenChattingRoom?.chattingLog?.wasRead)?true:false}
                  />
                  <Favorite>
                    {data?.data.chattingRooms.entizenChattingRoom?.chattingRoomFavorite.isFavorite? (
                      <Image src={checked} layout="fill" />
                    ) : (
                      <Image src={unChecked} layout="fill" />
                    )}
                  </Favorite>
                </Box>
              </ChattingRoomInfo>
            </ChattingRoom>
      </Chatting>
      }


      {/* 유저 채팅방.*/}
      {data?.data?.chattingRooms?.userChattingRooms?.map((chatting, idx) => {
        return (
          <Chatting
            className="chattingRoom"
            key={idx}
          >
            <HiddenBox1>
              {/* 버튼에 즐겨찾기 설정 api함수 */}
              <FavoriteBtn
                onClick={() => onClickFavorite(chatting.chattingRoomIdx!)}
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
              <AlramBtn onClick={() => onClickAlarm(chatting.chattingRoomIdx!)}>
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
              onClick={() => handleRoute(chatting.chattingRoomIdx)}
            >
              <ChattingRoomImage>
                {/* 이미지 파일 src가 없으면 */}
                <ImageWrap>
                  { chatting.companyMember.companyMemberAdditionalInfo?.companyLogoImageUrl
                  ?<img src={chatting.companyMember.companyMemberAdditionalInfo?.companyLogoImageUrl} />
                  :<Image src={defaultImg} layout="fill" />
                  }
                </ImageWrap>
              </ChattingRoomImage>
              <ChattingRoomPreview>
                <FromMember>
                  {
                    chatting.companyMember.companyMemberAdditionalInfo
                      .companyName
                  }
                </FromMember>
                <Previw>{chatting?.chattingLogs?.content}</Previw>
              </ChattingRoomPreview>
              <ChattingRoomInfo>
                <Created>
                  {handleTime(chatting?.chattingLogs?.createdAt!)}
                </Created>
                <Box>
                  <UnRead
                    //wasRead={chatting?.chattingLogs === null? true : chatting?.chattingLogs.wasRead}
                    wasRead={ chatting?.chattingLogs?.fromMemberIdx !== chatting?.userMember.memberIdx&& chatting?.chattingLogs?.wasRead === false?true:false}
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
    </Web>


    <Mob>
    <Body>
      { data?.data?.chattingRooms?.entizenChattingRoom &&
      /* 엔티젠. 상위 고정 && 채팅방 나가기 불가.*/
      <Chatting
            className="chattingRoom"
          >
              <Slider {...settings} className="target">
            <HiddenBox1>
              {/* 버튼에 즐겨찾기 설정 api함수 */}
              <FavoriteBtn
                onClick={() => onClickFavorite(data?.data?.chattingRooms?.entizenChattingRoom?.chattingRoomIdx!)}
              >
                {data?.data.chattingRooms.entizenChattingRoom?.chattingRoomFavorite.isFavorite ? (
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
              <AlramBtn onClick={() => onClickAlarm(data?.data?.chattingRooms?.entizenChattingRoom?.chattingRoomIdx!)}>
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
                  <Image src={newChatEntizen} layout="fill" />
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
                    wasRead={data?.data.chattingRooms?.entizenChattingRoom.chattingLog?.wasRead!}
                  />
                  <Favorite>
                    {data?.data.chattingRooms.entizenChattingRoom?.chattingRoomFavorite.isFavorite? (
                      <Image src={checked} layout="fill" />
                    ) : (
                      <Image src={unChecked} layout="fill" />
                    )}
                  </Favorite>
                </Box>
              </ChattingRoomInfo>
            </ChattingRoom>
            </Slider>
      </Chatting>
      }

      {/* 유저 채팅방.*/}
      {data?.data?.chattingRooms?.userChattingRooms?.map((chatting, idx) => {
        return (
          <Chatting
            className="chattingRoom"
            key={idx}
          >
             <Slider {...settings} className="target">
            <HiddenBox1>
              {/* 버튼에 즐겨찾기 설정 api함수 */}
              <FavoriteBtn
                onClick={() => onClickFavorite(chatting.chattingRoomIdx!)}
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
              <AlramBtn onClick={() => onClickAlarm(chatting.chattingRoomIdx!)}>
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
              onClick={() => handleRoute(chatting.chattingRoomIdx)}
            >
              <ChattingRoomImage>
                {/* 이미지 파일 src가 없으면 */}
                <ImageWrap>
                  { chatting.companyMember.companyMemberAdditionalInfo?.companyLogoImageUrl
                  ?<img src={chatting.companyMember.companyMemberAdditionalInfo?.companyLogoImageUrl} />
                  :<Image src={defaultImg} layout="fill" />
                  }
                </ImageWrap>
              </ChattingRoomImage>
              <ChattingRoomPreview>
                <FromMember>
                  {
                    chatting.companyMember.companyMemberAdditionalInfo
                      .companyName
                  }
                </FromMember>
                <Previw>{chatting?.chattingLogs?.content}</Previw>
              </ChattingRoomPreview>
              <ChattingRoomInfo>
                <Created>
                  {handleTime(chatting?.chattingLogs?.createdAt!)}
                </Created>
                <Box>
                  <UnRead
                    wasRead={chatting?.chattingLogs === null? true : chatting?.chattingLogs.wasRead}
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
            </Slider>
          </Chatting>
        );
      })}
      {modal && <QuitModal deleteId={Number(deleteId)} setModal={setModal} />}
    </Body>
    </Mob>    
    
    </>


  );
};

export default ChattingList;

const Web = styled.div`
@media (max-width: 899.25pt) {
  display: none;
  }
`
const Mob = styled.div`
@media (min-width: 900pt) {
  display: none;
  }
`

const Body = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  overflow: hidden;
`;

const Chatting = styled.div`
 display: flex;
  width: 100%;
  @media (min-width: 900pt) {
    width: 160%;
  }
  //일단.. 드래그시 덜컹거리면 삭제하자. 그리고 터치엔드 함수로 transition 주기
  //transition: 0.4s;
  .target {
    width: 100% !important;
    .slick-track {
      width: 199% !important;
      margin-left: 0% !important; 

      .slick-slide {
        &:nth-of-type(1) {
          width: 20% !important;
          >div{
            width: 100%;
            position: relative;
          }
        }
        &:nth-of-type(2) {
          width: 15% !important;
          >div{
            width: 100%;
            position: relative;
          }
        }
        &:nth-of-type(3) {
          width: 55% !important;
          >div{
            width: 100%;
            position: relative;
          }
        }
      }
    }
  }
`;
const ChattingRoom = styled.div`
  display: flex!important;
  padding: 13.5pt 1pt 13.5pt 0;
  border-bottom: 1px solid #e2e5ed;
  width: calc((100% / 8) * 5);

  @media (max-width: 899pt) {
    width: 340%!important;
  }
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
  cursor: pointer;
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
  border-radius: 50%;
  overflow: hidden;
  border: 0.75pt solid #D3D3D3;
  >img{
    width:100%;
  }
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
background: ${({ wasRead }) => (Boolean(wasRead) ?`#5221CB` : `none` )};
`;

const Favorite = styled.div`
  position: relative;
  width: 9pt;
  height: 9pt;
`;

const HiddenBox1 = styled.div`
  display: flex!important;
  width: 25%;
  position: relative;

  >div{
    flex: 1;
  }
  
  display: none!important;

  @media (max-width: 899.25pt) {
  display: flex!important;
    height: 65.25pt;
  }

`;
const HiddenBox2 = styled.div`
  display: flex!important;;
  width: 12.5%;
  position: relative;

  @media (max-width: 899pt) {
    width: 28%!important;
    position: absolute;
    height: 65.25pt;
    right: 8%;
  }
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

import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import defaultImg from 'public/images/default-img.png';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import send from 'public/images/send.png';
import sendBlue from 'public/images/send-blue.png'
import fileBtn from 'public/images/fileBtn.png'
import addBtn from 'public/images/addBtn.png'
import stopAlarm from 'public/images/stopAlarm.png'
import alarmBtn from 'public/images/alarm.png'
import moreBtn from 'public/images/moreBtn.png'
import QuitModal from "components/Chatting/QuitModal";
import MoreModal from "components/Chatting/MoreModal";
import { ChattingResponse } from 'pages/chatting/chattingRoom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { isTokenGetApi, isTokenPostApi } from 'api';

type ChattingLogs = {
  createdAt: string;
  chattingLogIdx: number;
  fromMemberIdx: number;
  fromMemberType: string;
  content: string | null;
  messageType: string;
  fileUrl: string | null;
  wasRead: boolean;
};

export interface ChattingRoom {
  date: string;
  logs: ChattingLogs[];
}

type Props = {
  user: string;
  name: string | string[] | undefined;
  alarm: string | string[] | undefined;
};

const ChattingRoom = ({ user, name, alarm }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const chattingRoomIdx = router.query.chattingRoomIdx;
  const [data, setData] = useState<ChattingRoom[]>([]);
  const [text, setText] = useState('');
  //const [company, setCompany] = useState<string>()

  //   채팅방 내용 보기
  const {
    data: chattingData,
    isError: chattingIsError,
    isLoading: chattingIsLoading,
    refetch: chattingRefetch,
  } = useQuery<ChattingResponse>(
    'chatting-data',
    () => {
      // isTokenGetApi(`/chatting/${chattingRoomIdx}?page=1`)
      return isTokenGetApi('/chatting/2?page=1');
    },
    {
      // 몇초마다 갱신 해줄 것인가.
      //   refetchInterval: 3000,
    },
  );

  //   채팅 POST
  const {
    mutate: chattingPostMutate,
    isLoading: chattingPostIsLoading,
    isError: chattingPostIsError,
  } = useMutation(isTokenPostApi, {
    onSuccess: () => {
      setText('');
      //   chattingRefetch();
      queryClient.invalidateQueries();
      window.scrollTo(0, document.body.scrollHeight);
    },
    onError: () => {},
  });

    const [moreModal, setMoreModal] = useState<boolean>(false);
    const [quitModal, setQuitModal] = useState<boolean>(false);

    //const modalComponents = [<QuitModal setModal={setModal}/>, <MoreModal/> ]
    
    //const [company, setCompany] = useState<string>()

    /* useEffect(() => {
         console.log(company)
         if (typeof (router.query.companyMemberId) === 'string') {
             setCompany(router.query.companyMemberId)
         }
     }, [router.query.companyMemberId]) */

  /* 호출되는 데이터는 최신순 정렬. 제일 오래된 데이터가 맨 위로 가도록 정렬 후, 같은 날자끼리 묶는 함수*/
  useEffect(() => {
    /*arr.data.chattingLogs.map((d,idx)=>{
            const date = dayjs(d.createdAt).format("YYYY.MM.DD HH:mm:ss");
        })*/
    if (!chattingIsLoading && chattingData?.isSuccess === true) {
      const sortArr = Array.from(chattingData.data.chattingLogs);
      sortArr.sort((a, b) => {
        const fomatedA = dayjs(a.createdAt).format('YYYY.MM.DD HH:mm:ss');
        const fomatedB = dayjs(b.createdAt).format('YYYY.MM.DD HH:mm:ss');
        if (fomatedA > fomatedB) {
          return 1;
        }
        if (fomatedA < fomatedB) {
          return -1;
        }
        return 0;
      });
      //console.log(sortArr)

      /* 날짜 최신순으로 정렬된 배열을 날짜 기준으로 다시 묶기. 
            순서가 보장되었기 때문에 , 모든 요소 하나하나와 비교하지않고, 바로 전의 요소와만 비교해도 된다.
        */
      const temp: ChattingRoom[] = [];
      sortArr.forEach((a, idx) => {
        const date1 = dayjs(a.createdAt).format('YYYY.MM.DD');
        /*맨 처음 배열 요소는 그냥 push*/
        if (idx === 0) {
          temp.push({
            date: date1,
            logs: [a],
          });
          /* 배열의 바로 전 요소 날짜값과 현재 요소의 날짜값이 같으면, temp배열의 가장 마지막 인덱스 요소(Logs)에 푸쉬. 
                  배열의 바로 전 요소 날짜값과 현재 요소의 날짜값이 다르면, temp 배열에 새롭게 Push.
                */
        } else {
          if (
            dayjs(sortArr[idx - 1].createdAt).format('YYYY.MM.DD') === date1
          ) {
            temp[temp.length - 1].logs.push(a);
          } else {
            temp.push({
              date: date1,
              logs: [a],
            });
          }
        }
      });
      console.log('temp', temp);
      setData(temp);
    }
  }, [user, chattingData]); //의존성 배열, 호출할때만으로 정해야 함.

  const handleTime = (st: string) => {
    //오전, 오후로 나누기
    const pm = dayjs(st).subtract(12, 'h').format('HH:mm');
    if (Number(pm.substring(0, 3)) > 12) {
      return `오전 ${pm}`;
    } else {
      return `오후 ${pm}`;
    }
  };
  // 인풋 텍스트 입력
  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };
  // 채팅 onsubmit
  const onSubmitText = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    chattingPostMutate({
      //   url: `chatting/${chattingRoomIdx}`,
      url: `/chatting/2`,
      data: {
        content: text,
        fileUrl: null,
      },
    });
    console.log('온클릭');
  };

  /* 웹에서 글자 입력될때 마다 send 버튼 색상 변경*/
  const webBox = useRef<HTMLDivElement>(null);
  const imgChange = (n: boolean) => {
    const target = webBox.current;
    const on = target?.querySelector('.typing.on') as HTMLElement;
    const off = target?.querySelector('.typing.off') as HTMLElement;
    if (on && off && n) {
      on.style.display = 'block';
      off.style.display = 'none';
    }
    if (on && off && !n) {
      on.style.display = 'none';
      off.style.display = 'block';
    }
  };

  /* 파일버튼 누르면 나타나는 애니메이션 */
  const mobBox = useRef<HTMLDivElement>(null);
  const handleButton = (e: MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const hiddenBox = mobBox.current?.querySelector('.hidden') as HTMLElement;
    if (target.classList.contains('on') && hiddenBox) {
      target.classList.remove('on');
      hiddenBox.style.height = '0';
    } else if (!target.classList.contains('on') && hiddenBox) {
      target.classList.add('on');
      hiddenBox.style.height = '97pt';
    }
  };

  return (
    <Body>
      <TopBox>
        <MypageHeader
          back={true}
          title={String(name)}
          handle={true}
          handleOnClick={() =>
            router.push({
              pathname: '/company/chatting',
            })
          }
        />
        <IconBox>
          {/*onClick 알람 설정 api 달기*/}
          <IconWrap className="web">
            {Boolean(alarm) ? (
              <Image src={alarmBtn} layout="fill" />
            ) : (
              <Image src={stopAlarm} layout="fill" />
            )}
          </IconWrap>
          <IconWrap>
            <Image src={moreBtn} layout="fill" onClick={()=>setMoreModal(true)}/>
          </IconWrap>
        </IconBox>
      </TopBox>
      <Inner>
        {data.map((d, idx) => {
          return (
            <DateChatting key={idx}>
              <Date>{d.date}</Date>
              <List>
                {d.logs.map((item, idx) => {
                  return (
                    <ChatBox
                      key={item.chattingLogIdx}
                      className={`${
                        item.fromMemberType === 'USER' ? 'user' : 'company'
                      }`}
                    >
                      {item.fromMemberType === 'USER' ? (
                        <ImageWrap>
                          {/* 이미지 파일 src가 없으면 */}
                          <Image src={defaultImg} layout="fill" />
                        </ImageWrap>
                      ) : null}
                      {item.content && (
                        <Chat
                          className={`${
                            item.fromMemberType === 'USER' ? 'user' : 'company'
                          }`}
                        >
                          {item.content}
                        </Chat>
                      )}
                      {item.fileUrl && <File>{item.fileUrl}</File>}
                      <MessageDate>
                        {handleTime(item.createdAt)}
                        {'/' + dayjs(item.createdAt).format('HH:mm')}
                      </MessageDate>
                    </ChatBox>
                  );
                })}
              </List>
            </DateChatting>
          );
        })}
      </Inner>
      <BottomBox ref={mobBox}>
        <FlexBox onSubmit={onSubmitText}>
          <AddBtn onClick={handleButton}>
            <Image src={addBtn} layout="intrinsic" />
          </AddBtn>
          <TextInput
            placeholder="메세지를 입력하세요"
            value={text}
            onChange={onChangeText}
          />
          <IconWrap2>
            <Image src={send} layout="fill" />
          </IconWrap2>
        </FlexBox>
        <div className="hidden"></div>
      </BottomBox>
      <WebBottomBox ref={webBox}>
        <FlexBox2 onSubmit={onSubmitText}>
          <InputWrap>
            <FileIconWrap>
              <Image src={fileBtn} layout="fill" />
            </FileIconWrap>
            <TextInput
              placeholder="메세지를 입력하세요"
              onKeyDown={() => imgChange(true)}
              onKeyUp={() => imgChange(false)}
              value={text}
              onChange={onChangeText}
            />
          </InputWrap>
          <div className="typing off">
            <Image src={send} layout="fill" />
          </div>
          <div className="typing on">
            <Image src={sendBlue} layout="fill" />
          </div>
        </FlexBox2>
      </WebBottomBox>
            {/* 더보기 모달 제어 */}
            {moreModal && <MoreModal setMoreModal={setMoreModal} setQuitModal={setQuitModal}  />}

            {/* 나가기 모달 제어 */}
            {quitModal && <QuitModal setModal={setQuitModal}/>}
    </Body>
  );
};

export default ChattingRoom;

const Body = styled.div`
  position: relative;
`;

const WebBottomBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 3pt 0pt 16.5pt;

  div.typing {
    width: 18.75pt;
    height: 20.6pt;
    position: relative;
    &.on {
      display: none;
    }
    &.off {
      display: block;
    }
  }
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const FlexBox2 = styled.form`
  margin: 0 22.5pt 0 13.5pt;
  display: flex;
  gap: 14.25pt;
  align-items: center;
`;
const InputWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid #d3d3d3;
  border-radius: 37.5pt;
`;
const FileIconWrap = styled.div`
  position: relative;
  width: 14.5pt;
  height: 15.45pt;
  margin: 0 0 0 13.5pt;
`;

const BottomBox = styled.div`
  background: #e9eaee;
  position: fixed;
  bottom: 0;
  padding: 3pt 0pt 36pt;
  width: 100%;
  @media (min-width: 900pt) {
    position: absolute;
    display: none;
  }

  .hidden {
    background-color: aqua;
    width: 30pt;
    height: 0;
    //height: 97.5pt;
    position: absolute;
    bottom: 72pt;
    left: 11.5pt;
    transition: 0.3s;
  }
`;
const FlexBox = styled.form`
  display: flex;
  align-items: center;
  gap: 10.5pt;
  padding: 0 15pt;
`;
const AddBtn = styled.div`
  position: relative;
  width: 9pt;
  height: 9pt;
  padding: 5pt 6pt 6pt;
  border-radius: 50%;
  background: #a6a9b0;
  transition: 0.3s;
  &.on {
    transform: rotate(45deg);
  }
`;
const TextInput = styled.input`
  flex: auto;
  border-radius: 37.5pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
  padding: 6pt 7.8pt;
  ::placeholder {
    color: #d3d3d3;
  }
`;
const IconWrap2 = styled.div`
  position: relative;
  width: 18.75pt;
  height: 20.7pt;
`;

const TopBox = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 5;

  @media (min-width: 900pt) {
    position: absolute;
    border-bottom: 1px solid #e2e5ed;
    width: -webkit-fill-available;
    padding: 22.5pt 5pt;
  }
`;
const IconBox = styled.div`
  position: absolute;
  right: 15pt;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 6.4pt;
  align-items: center;

  @media (min-width: 900pt) {
    right: 21pt;
  }
`;
const IconWrap = styled.div`
  position: relative;
  width: 12pt;
  height: 13.5pt;
  @media (min-width: 900pt) {
    width: 20.5pt;
    height: 20.5pt;

    &.web {
      width: 13pt;
      height: 15.25pt;
    }
  }
`;
const Inner = styled.div`
  position: relative;
  padding-top: 36pt;
  padding-bottom: 66pt;
  @media (min-width: 900pt) {
    padding-top: 105pt;
  }
`;
const DateChatting = styled.div`
  width: 100%;
  font-family: 'Spoqa Han Sans Neo';
  text-align: center;
  position: relative;

  &::before {
    display: block;
    content: '';
    clear: both;
    width: 50%;
    height: 1px;
    background: #e2e5ed;
    position: absolute;
    top: 15pt;
    left: 0;
    z-index: -1;
  }
  &::after {
    display: block;
    content: '';
    clear: both;
    width: 50%;
    height: 1px;
    background: #e2e5ed;
    position: absolute;
    top: 15pt;
    right: 0;
    z-index: -1;
  }
`;
const Date = styled.span`
  display: inline-block;
  padding: 9pt;
  background: white;
  font-style: normal;
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #a6a9b0;
  position: relative;

  @media (min-width: 900pt) {
    border: 1px solid #e2e5ed;
    border-radius: 12pt;
    padding: 6pt 9pt;
  }
`;

const List = styled.div`
  margin: 0 15pt;
  @media (min-width: 900pt) {
    margin: 0 21pt;
  }
`;

const ChatBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 9pt;
  gap: 6pt;
  &.company {
    flex-direction: row-reverse;
  }
`;
const ImageWrap = styled.div`
  width: 36pt;
  height: 36pt;
  position: relative;
`;

const Chat = styled.div`
  border-radius: 6pt;
  color: white;
  padding: 7.5pt 6pt;
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 16.5pt;
  letter-spacing: -0.02em;
  &.user {
    background: #5221cb;
  }
  &.company {
    background: #f3f4f7;
    color: #222222;
  }
`;
const File = styled.div`
  background: #5221cb;
  border-radius: 6pt;
  color: white;
  padding: 7.5pt 6pt;
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 16.5pt;
  letter-spacing: -0.02em;
`;
const MessageDate = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 7.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #caccd1;
  margin-top: 12pt;
`;

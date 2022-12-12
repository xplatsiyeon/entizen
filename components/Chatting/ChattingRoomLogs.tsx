import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import defaultImg from 'public/images/default-img.png';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import send from 'public/images/send.png';
import MoreModal from 'components/Chatting/MoreModal';
import QuitModal from 'components/Chatting/QuitModal';
import sendBlue from 'public/images/send-blue.png';
import fileBtn from 'public/images/fileBtn.png';
import addBtn from 'public/images/addBtn.png';
import stopAlarm from 'public/images/stopAlarm.png';
import alarmBtn from 'public/images/alarm.png';
import moreBtn from 'public/images/moreBtn.png';
import { QueryObserverResult, useMutation, useQuery, useQueryClient } from 'react-query';
import { isTokenGetApi, isTokenPostApi, multerApi } from 'api';
import Loader from 'components/Loader';
import WebMoreModal from './WebMoreModal';
import WebFileModal from './WebFileModal';
import { MulterResponse } from 'componentsCompany/MyProductList/ProductAddComponent';
import { AxiosError } from 'axios';
import fileImg from 'public/mypage/file-icon.svg';
import Modal from 'components/Modal/Modal';
import chatFileAdd from 'public/images/chatFileAdd.png';
import chatCamera from 'public/images/chatCamera.png';
import chatPhotoAdd from 'public/images/chatPhotoAdd.png';
import { EdgesensorHigh, TransgenderTwoTone } from '@mui/icons-material';
import { ChattingListResponse } from './ChattingLists';

type ChattingLogs = {
  createdAt: string;
  chattingLogIdx: number;
  fromMemberIdx: number;
  fromMemberType: string;
  content: string | null;
  messageType: string;
  fileUrl: string | null;
  fileSize: null | number;
  fileOriginalName: null | string,
  wasRead: boolean;
};

export interface ChattingRoom {
  date: string;
  logs: ChattingLogs[];
}

export interface ChattingResponse {
  isSuccess: true;
  data: {
    chattingRoomIdx: number;
    userMember: {
      memberIdx: number;
      name: string;
    };
    companyMember: {
      memberIdx: number;
      companyMemberAdditionalInfo: {
        companyName: string;
      };
    };
    chattingRoomNotification: {
      chattingRoomNotificationIdx: number;
      isSetNotification: boolean;
    };
    chattingLogs: ChattingLogs[];
  };
}

type Props = {
  userChatting: boolean;
  listRefetch :() => Promise<QueryObserverResult<ChattingListResponse>>;
};

const TAG = 'pages/chatting/chattingRomm/index.tsx';
const ChattingRoomLogs = ({ userChatting, listRefetch }: Props) => {

  const queryClient = useQueryClient();
  const router = useRouter();
  const routerId = router?.query?.chattingRoomIdx;
  const [data, setData] = useState<ChattingRoom[]>([]);
  const [text, setText] = useState('');
  const [fileModal, setFileModal] = useState<boolean>(false)

  //나가기 모달
  const [moreModal, setMoreModal] = useState<boolean>(false);
  const [quitModal, setQuitModal] = useState<boolean>(false);

  // 에러 모달
  const [isModal, setIsModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const logs = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  //   채팅방 내용 보기
  const {
    data: chattingData,
    isError: chattingIsError,
    isLoading: chattingIsLoading,
    refetch,
  } = useQuery<ChattingResponse>(
    'chatting-data',
    () => {
      return isTokenGetApi(`/chatting/${routerId}?page=1`);
    },
    {
      enabled: router.isReady,
      // 몇초마다 갱신 해줄 것인가.
      refetchInterval: 3000,
    },
  );

  useEffect(() => {
    if (routerId) {
      refetch();
    }
  }, [routerId]);


  //   채팅 POST
  const {
    mutate: chattingPostMutate,
    isLoading: chattingPostIsLoading,
    isError: chattingPostIsError,
  } = useMutation(isTokenPostApi, {
    onSuccess: async () => {
      setText('');
      await queryClient.invalidateQueries('chatting-data');
    },
    onError: (error) => {
      console.log('🔥 채팅방 POST 에러 발생');
      console.log(error);
    },
  });

  /* 호출되는 데이터는 최신순 정렬. 제일 오래된 데이터가 맨 위로 가도록 정렬 후, 같은 날자끼리 묶는 함수*/
  useEffect(() => {
    if (!chattingIsLoading && chattingData?.isSuccess === true) {
      const sortArr = Array.from(chattingData?.data?.chattingLogs!);
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
      //   console.log('temp', temp);
      setData(temp);
    }
  }, [routerId, chattingData]); //의존성 배열, 호출할때만으로 정해야 함.

  useLayoutEffect(() => {
    //window.scrollTo(0, document.body.scrollHeight);
    const chattings = logs.current?.querySelectorAll('.chattingLog'); 
    if(chattings){
      const target = chattings[chattings.length - 1] as HTMLElement;
      console.log(target);
      target?.focus();
    } 
    // target?.focus();
    listRefetch();
  }, [data]); 

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
      url: `/chatting/${routerId}`,
      // url: `/chatting/2`,
      data: {
        content: text,
        files: null,
      },
    });
    console.log('온클릭');
  };

  /* // 파일,사진 onsubmit
  const onSubmitFile = (url: string) => {
    chattingPostMutate({
      url: `/chatting/${routerId}`,
      // url: `/chatting/2`,
      data: {
        content: null,
        fileUrl: `${url}`,
      },
    });
    console.log('파일전송');
  }; */

    // 파일,사진 onsubmit
    const onSubmitFile = (url: string) => {
      chattingPostMutate({
        url: `/chatting/${routerId}`,
        // url: `/chatting/2`,
        data: {
          content: null,
          files: [{
            type : 'IMAGE',
            url: "http://test.test.com",
            size: 123422,
            originalName: "my fileq22222"
          },{}],
        },
      });
      console.log('파일전송');
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
      hiddenBox.style.border = `none`;
    } else if (!target.classList.contains('on') && hiddenBox) {
      target.classList.add('on');
      hiddenBox.style.height = '97pt';
      hiddenBox.style.border = `1px solid #D3D3D3`;
    }
  };

  const handleRoute = () => {
    if (userChatting) {
      router.push({
        pathname: '/chatting',
      });
    } else {
      router.push({
        pathname: '/company/chatting',
      });
    }
  };

  const handleName = () => {
    if (router.query.entizen) {
      return '엔티즌';
    } else {
      if (userChatting) {
        return chattingData?.data?.companyMember?.companyMemberAdditionalInfo
          ?.companyName!;
      } else {
        return chattingData?.data?.userMember?.name!;
      }
    }
  };


  // image s3 multer 저장 API (with useMutation)
  const { mutate: multerImage, isLoading: multerImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: (res) => {
      chattingPostMutate({
        url: `/chatting/${routerId}`,
        // url: `/chatting/2`,
        data: {
          content: null,
          files: [{
            type : 'IMAGE',
            url: res.uploadedFiles[0].url,
            size: res.uploadedFiles[0].size,
            originalName: decodeURIComponent(res.uploadedFiles[0].originalName)
          }],
        },
      });
      refetch();
      setFileModal(false)
    },
    onError: (error: any) => {
      setFileModal(false)
      if (error.response.data.message) {
        setErrorMessage(error.response.data.message);
        setIsModal(true);
      } else if (error.response.status === 413) {
        setErrorMessage('용량이 너무 큽니다.');
        setIsModal(true);
      } else {
        setErrorMessage('다시 시도해주세요');
        setIsModal(true);
      }
    },
  });
  // file s3 multer 저장 API (with useMutation)
  const { mutate: multerFile, isLoading: multerFileLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: (res) => {
      console.log(res)
      chattingPostMutate({
        url: `/chatting/${routerId}`,
        // url: `/chatting/2`,
        data: {
          content: null,
          files: [{
            type : 'FILE',
            url: res.uploadedFiles[0].url,
            size: res.uploadedFiles[0].size,
            originalName: decodeURIComponent(res.uploadedFiles[0].originalName)
          }],
        },
      });
      refetch();
      setFileModal(false)
    },
    onError: (error: any) => {
      setFileModal(false)
      if (error.response.data.message) {
        setErrorMessage(error.response.data.message);
        setIsModal(true);
      } else if (error.response.status === 413) {
        setErrorMessage('용량이 너무 큽니다.');
        setIsModal(true);
      } else {
        setErrorMessage('다시 시도해주세요');
        setIsModal(true);
      }
    },
  });

  // 파일 저장
  const saveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target; if(!(files?.length)){setFileModal(false)
    }else{
    const formData = new FormData();
    formData.append(
      'chatting',
      files![0],
      encodeURIComponent(files![0].name),
    );
    multerFile(formData);
    e.target.value ='';
  };
}

  //이미지저장
  const saveFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if(!(files?.length)){setFileModal(false)
    }else{
    const formData = new FormData();
    formData.append(
      'chatting',
      files![0],
      encodeURIComponent(files![0].name),
    );
    multerImage(formData); 
    e.target.value ='';
   }
  };


  //이미지 온클릭
  const imgHandler = () => {
    imgRef?.current?.click();
  };
  //파일 온클릭
  const fileHandler = () => {
    fileRef?.current?.click();
  };


  const DownloadFile = useCallback((item: ChattingLogs) => {
    let fileName = item.fileOriginalName!;
    const url = item.fileUrl!;
    const element = document.createElement('a');
    element.href = url;
    element.download = fileName;
    element.type = 'blob';
    document.body.appendChild(element);
    element.click();
    element.remove();
    window.URL.revokeObjectURL(url);
  }, []);

  return (
    <Body ref={logs}>
    {isModal && <Modal click={()=>setIsModal(false)} text={errorMessage} />}
      <TopBox>
        <MypageHeader
          back={true}
          title={handleName()}
          handle={true}
          handleOnClick={handleRoute}
        />
        <IconBox>
          <IconWrap className="alarm">
            {chattingData?.data?.chattingRoomNotification?.isSetNotification ? (
              <Image src={alarmBtn} layout="fill" />
            ) : (
              <Image src={stopAlarm} layout="fill" />
            )}
          </IconWrap>
          <IconWrap onClick={() => setMoreModal(true)}>
            <Image src={moreBtn} layout="fill" />
          </IconWrap>
        </IconBox>
        {moreModal && (
          <WebMoreModal
            setMoreModal={setMoreModal}
            setQuitModal={setQuitModal}
          />
        )}
      </TopBox>
      <Inner>
        {data.map((d, idx) => {
          return (
            <DateChatting key={idx}>
              <Date>{d.date}</Date>
              <List>
                {d.logs.map((item, idx) => {
                  if (item.messageType === 'SYSTEM') {
                    return;
                  } else {
                    return (
                      <ChatBox
                        userChatting={userChatting}
                        key={item.chattingLogIdx}
                        className={`${item.fromMemberType === 'USER' ? 'user' : 'company'
                          } chattingLog`}
                        tabIndex={1}  
                      >
                          <ImageWrap className={item.fromMemberType === 'USER'? 'user' : 'company'} userChatting={userChatting}>
                            {/* 이미지 파일 src가 없으면 */}
                            <Image src={defaultImg} layout="fill" />
                          </ImageWrap>
                        {item.content && (
                          <Chat
                            userChatting={userChatting}
                            className={`${item.fromMemberType === 'USER'
                                ? 'user'
                                : 'company'
                              }`}
                            tabIndex={1}  
                          >
                            {item.content}
                          </Chat>
                        )}
                        {item.messageType === 'FILE' && 
                        <File>
                           <FileDownload
                            // onClick={DownloadFile}
                            href={item?.fileUrl!}
                            download={item?.fileOriginalName!}
                            type={'blob'}
                          >
                            <Image src={fileImg} alt="file-icon" layout="intrinsic"/>
                            {item?.fileOriginalName}
                          </FileDownload>
                        </File>
                        }

                        {item.messageType === 'IMAGE' && 
                        <>
                           <FileDownload
                            onClick={()=>DownloadFile(item)}
                           // href={item?.fileUrl!}
                           // download={item?.fileOriginalName!}
                           // type={'blob'}
                          >
                            <img src={item?.fileUrl!} style={{width: '112.5pt', objectFit:'scale-down', background:'#0000001c'}}/>
                          </FileDownload>
                         {/* <div className='chattingLog' tabIndex={1} style={{width:'1pt', height:'1pt', position:'absolute', bottom:'-50pt'}}></div> */}
                        </>
                        }   
                        <MessageDate>{handleTime(item.createdAt)}</MessageDate>
                      </ChatBox>
                    );
                  }
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
        <div className="hidden">
          <IconWrap3 onClick={imgHandler}>
            <Image src={chatPhotoAdd} layout="fill"/></IconWrap3>
          <IconWrap3><Image src={chatCamera} layout="fill"/></IconWrap3>
          <IconWrap3 onClick={fileHandler}>
            <Image src={chatFileAdd} layout="fill"/></IconWrap3>
        </div>
      </BottomBox>
      <WebBottomBox ref={webBox}>
        <FlexBox2 onSubmit={onSubmitText}>
          <InputWrap>
            <FileIconWrap onClick={() => setFileModal(true)}>
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
          <button className="typing off">
            <Image src={send} layout="fill" />
          </button>

          <button className="typing on">
            <Image src={sendBlue} layout="fill" />
          </button>
        </FlexBox2>
      </WebBottomBox>

      <input style={{ display: 'none' }}
        ref={imgRef}
        type="file"
        accept="image/*"
        onChange={saveFileImage}
      />
      <input
        style={{ display: 'none' }}
        ref={fileRef}
        type="file"
        accept="xlsx"
        onChange={saveFile}
      />

      {fileModal && <WebFileModal setFileModal={setFileModal} imgClick={imgHandler} fileClick={fileHandler} />}
      {/* 더보기 모달 제어 */}
      {moreModal && (
        <MoreModal setMoreModal={setMoreModal} setQuitModal={setQuitModal} />
      )}
      {/* 나가기 모달 제어 */}
      {quitModal && <QuitModal setModal={setQuitModal} deleteId={Number(routerId)}/>}
    </Body>
  );
};

export default ChattingRoomLogs;

const Body = styled.div`
  position: relative;
  flex: 1;
  //height: 495pt;
  //overflow-y: scroll;
`;
const WebBottomBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 3pt 0pt 16.5pt;
  button.typing {
    width: 18.75pt;
    height: 20.6pt;
    position: relative;
    background: none;
    cursor: pointer;
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
    width: 30pt;
    height: 0;
    position: absolute;
    bottom: 72pt;
    left: 11.5pt;
    transition: 0.3s;
    background-color: white;
    border: 1px solid #D3D3D3;
    border-radius: 16.5pt;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
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
const IconWrap2 = styled.button`
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
  align-items: center;
  gap: 6.4pt;
  @media (min-width: 900pt) {
    right: 21pt;
  }
`;
const IconWrap = styled.div`
  position: relative;
  width: 12pt;
  height: 13.5pt;
  cursor: pointer;
  &.alarm {
    cursor: auto;
  }
  @media (min-width: 900pt) {
    width: 20.5pt;
    height: 20.5pt;
  }
`;
const Inner = styled.div`
  position: relative;
  padding-top: 36pt;
  height: 83vh;
  overflow-y: scroll;
  @media (min-width: 900pt) {
    margin-top: 105pt;
    height: 320pt;
    overflow-y: scroll;
    padding: 0;
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

const ChatBox = styled.div<{ userChatting: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 9pt;
  gap: 6pt;

  &:focus {
  outline: none;
}
  &.user {
    flex-direction: ${({ userChatting }) =>
    userChatting ? 'row-reverse' : 'row'};
  }
  &.company {
    flex-direction: ${({ userChatting }) =>
    userChatting ? 'row' : 'row-reverse'};
  }
`;
const ImageWrap = styled.div<{userChatting : boolean}>`
  width: 36pt;
  height: 36pt;
  position: relative;
  &.user{
    display: ${({userChatting})=> userChatting ? 'none' : 'block'};
  }
  &.company{
    display: ${({userChatting})=> userChatting ? 'block' : 'none'}
  }
`;

const Chat = styled.div<{ userChatting: boolean }>`
  border-radius: 6pt;
  padding: 7.5pt 6pt;
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 16.5pt;
  letter-spacing: -0.02em;
  &.user {
    color: ${({ userChatting }) => (userChatting ? 'white' : '#222222')};
    background: ${({ userChatting }) => (userChatting ? '#5221cb' : '#f3f4f7')};
  }
  &.company {
    color: ${({ userChatting }) => (userChatting ? '#222222' : 'white')};
    background: ${({ userChatting }) => (userChatting ? '#f3f4f7' : '#5221cb')};
  }
`;
const FileDownload = styled.a`
text-decoration: none;
display: flex;
align-items: center;
gap: 3pt;
color: '#E2E5ED';
`
const File = styled.button`
  margin-bottom: 6pt;
  margin-right: 6pt;
  padding: 7.5pt 6pt;
  border: 0.75pt solid '#999999';
  border-radius: 8px;
  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
  }
`

const MessageDate = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 7.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #caccd1;
  margin-top: 12pt;
`;

const IconWrap3 = styled(IconWrap2)`
  background: transparent;
`
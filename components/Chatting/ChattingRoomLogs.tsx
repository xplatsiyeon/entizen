import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import defaultImg from 'public/images/defaultImg.png';
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
import addBtnSvg from 'public/images/addBtnSvg.svg';
import stopAlarm from 'public/images/stopAlarm.png';
import alarmBtn from 'public/images/alarm.png';
import moreBtn from 'public/images/moreBtn.png';
import {
  QueryObserverResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { isTokenGetApi, isTokenPatchApi, isTokenPostApi, multerApi } from 'api';
import WebMoreModal from './WebMoreModal';
import WebFileModal from './WebFileModal';
import { MulterResponse } from 'componentsCompany/MyProductList/ProductAddComponent';
import { AxiosError } from 'axios';
import fileImg from 'public/mypage/file-icon.svg';
import Modal from 'components/Modal/Modal';
import chatFileAdd from 'public/images/chatFileAdd.png';
import chatPhotoAdd from 'public/images/chatPhotoAdd.png';
import { ChattingListResponse } from './ChattingLists';
import ReportModal from './ReportModal';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { fileDownload, requestPermissionCheck } from 'bridge/appToWeb';
import { CollectionsBookmarkOutlined } from '@mui/icons-material';

type ChattingLogs = {
  createdAt: string;
  chattingLogIdx: number;
  fromMemberIdx: number;
  fromMemberType: string;
  content: string | null;
  messageType: string;
  fileUrl: string | null;
  fileSize: null | number;
  fileOriginalName: null | string;
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
      profileImageUrl: null | string;
    };
    companyMember: {
      memberIdx: number;
      companyMemberAdditionalInfo: {
        companyName: string;
        companyLogoImageUrl: null | string;
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
  listRefetch: () => Promise<QueryObserverResult<ChattingListResponse>>;
};

const ChattingRoomLogs = ({ userChatting, listRefetch }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const routerId = router?.query?.chattingRoomIdx;
  const [data, setData] = useState<ChattingRoom[]>([]);
  const [text, setText] = useState('');
  const [fileModal, setFileModal] = useState<boolean>(false);
  // const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);

  //나가기 모달
  const [moreModal, setMoreModal] = useState<boolean>(false);
  const [quitModal, setQuitModal] = useState<boolean>(false);

  // 신고하기 누르면 나오는 모달
  const [reportModal, setReportModal] = useState<boolean>(false);

  // 에러 모달
  const [isModal, setIsModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [loading, setLoading] = useState<boolean>(false);

  const [typing, setTyping] = useState<boolean>(false);

  const logs = useRef<HTMLDivElement>(null);
  const webInputRef = useRef<HTMLInputElement>(null);
  const mobInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLInputElement>(null);

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
      setTimeout(() => {
        if (mobInputRef.current)
          mobInputRef.current.focus({ preventScroll: true });
      }, 300);
    },
    onError: (error) => {
      // console.log('🔥 채팅방 POST 에러 발생');
      // console.log(error);
    },
  });

  // 인풋 텍스트 입력
  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;
    setText(val);
    if (val.trim().length > 0) {
      setTyping(true);
    } else {
      setTyping(false);
    }
  };

  // 채팅 onsubmit
  const onSubmitText = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text.trim().length > 0) {
      chattingPostMutate({
        url: `/chatting/${routerId}`,
        // url: `/chatting/2`,
        data: {
          content: text,
          files: null,
        },
      });
      setTyping(false);
    }
  };

  // 알람 설정
  const { mutate: patchMutate } = useMutation(isTokenPatchApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('chatting-data');
      setMoreModal(false);
    },
    onError: (error) => {
      // console.log('채팅 알림 기능 에러');
      // console.log(error);
      setMoreModal(false);
    },
  });

  const onClickAlarm = () => {
    patchMutate({
      url: `/chatting/${routerId}/notification`,
    });
  };

  /* 웹에서 글자 입력될때 마다 send 버튼 색상 변경*/
  const webBox = useRef<HTMLDivElement>(null);

  /* 파일버튼 누르면 나타나는 애니메이션 */
  const handleButton = (e: MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    //console.log(target)
    const hiddenBox = target.querySelector('.hidden') as HTMLElement;
    //console.log(hiddenBox)
    if (target.classList.contains('on') && hiddenBox) {
      target.classList.remove('on');
      hiddenBox.style.height = '0';
      hiddenBox.style.border = `none`;
    } else if (!target.classList.contains('on') && hiddenBox) {
      target.classList.add('on');
      // hiddenBox.style.height = '97pt';
      hiddenBox.style.height = '60pt';
      hiddenBox.style.border = `0.75pt solid #D3D3D3`;
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

  const handleImg = () => {
    if (router.query.entizen) {
      return '/images/newChatEntizen.png';
    } else {
      if (userChatting) {
        // console.log(chattingData?.data?.companyMember?.companyMemberAdditionalInfo?.companyLogoImageUrl!)
        return chattingData?.data?.companyMember?.companyMemberAdditionalInfo
          ?.companyLogoImageUrl!;
      } else {
        // console.log(chattingData?.data?.userMember?.profileImageUrl!)
        return chattingData?.data?.userMember?.profileImageUrl!;
      }
    }
  };

  const handleTime = (st: string) => {
    //오전, 오후로 나누기
    const h = dayjs(st).get('h');
    if (Number(h) > 12) {
      const pm = dayjs(st).subtract(12, 'h').format('HH:mm');
      return `오후 ${pm}`;
    } else if (Number(h) === 12) {
      const pm12 = dayjs(st).format('HH:mm');
      return `오후 ${pm12}`;
    } else {
      const am = dayjs(st).format('HH:mm');
      return `오전 ${am}`;
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
          files: [
            {
              type: 'IMAGE',
              url: res.uploadedFiles[0].url,
              size: res.uploadedFiles[0].size,
              originalName: decodeURIComponent(
                res.uploadedFiles[0].originalName,
              ),
            },
          ],
        },
      });
      refetch();
      //setLoading(false)
      setFileModal(false);
    },
    onError: (error: any) => {
      setFileModal(false);
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
      // console.log(res);
      chattingPostMutate({
        url: `/chatting/${routerId}`,
        // url: `/chatting/2`,
        data: {
          content: null,
          files: [
            {
              type: 'FILE',
              url: res.uploadedFiles[0].url,
              size: res.uploadedFiles[0].size,
              originalName: decodeURIComponent(
                res.uploadedFiles[0].originalName,
              ),
            },
          ],
        },
      });
      refetch();
      setFileModal(false);
    },
    onError: (error: any) => {
      setFileModal(false);
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
    const { files } = e.target;
    if (!files?.length) {
      setFileModal(false);
    } else {
      const formData = new FormData();
      formData.append(
        'chatting',
        files![0],
        encodeURIComponent(files![0].name),
      );
      multerFile(formData);
      setLoading(true);
      e.target.value = '';
    }
  };

  //이미지저장
  const saveFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files?.length) {
      setFileModal(false);
    } else {
      const formData = new FormData();
      formData.append(
        'chatting',
        files![0],
        encodeURIComponent(files![0].name),
      );
      multerImage(formData);
      setLoading(true);
      e.target.value = '';
    }
  };

  //이미지 온클릭
  const imgHandler = () => {
    if (!userAgent) {
      imgRef?.current?.click();
    } else {
      requestPermissionCheck(userAgent, 'photo');
    }
  };
  //파일 온클릭
  const fileHandler = () => {
    if (!userAgent) {
      fileRef?.current?.click();
    } else {
      requestPermissionCheck(userAgent, 'file');
    }
  };

  useEffect(() => {
    if (loading) {
      loadingRef.current?.focus();
    }
  }, [loading]);

  /* 호출되는 데이터는 최신순 정렬. 제일 오래된 데이터가 맨 위로 가도록 정렬 후, 같은 날자끼리 묶는 함수*/
  useEffect(() => {
    // console.log('쿼리아이디, 데이타 변경됨');
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
      // console.log(sortArr)

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
      // console.log('temp', temp);
      setData(temp);

      const inner = logs.current?.querySelector('.inner');

      if (loading) {
        setLoading(false);
        // console.log('img');
        setTimeout(() => {
          if (inner)
            inner.scroll({
              top: inner.scrollHeight + 500,
              left: 0,
              behavior: 'auto',
            });

          if (webInputRef.current) {
            webInputRef.current.focus({
              preventScroll: true,
            });
          }
        }, 300);
      } else {
        // console.log('chat');
        setTimeout(() => {
          //focusRef.current?.focus()
          if (inner)
            inner.scroll({
              top: inner.scrollHeight,
              left: 0,
              behavior: 'auto',
            });

          if (webInputRef.current) {
            webInputRef.current.focus({
              preventScroll: true,
            });
          }
        }, 100);
      }
    }
  }, [routerId, chattingData]); //의존성 배열, 호출할때만으로 정해야 함.

  useEffect(() => {
    const inner = logs.current?.querySelector('.inner');

    setTimeout(() => {
      // console.log('처음에만');
      //focusRef.current?.focus();

      // console.log(width);
      if (inner)
        inner.scroll({
          top: inner.scrollHeight,
          left: 0,
          behavior: 'auto',
        });

      focusRef.current?.focus({ preventScroll: true });
      // console.log(focusRef.current);
    }, 600);

    setTimeout(() => {
      // console.log('처음에만');
    }, 2000);

    listRefetch();
  }, []);

  // 앱에서 이미지 or 파일 온클릭 (앱->웹)
  useEffect(() => {
    if (userAgent === 'Android_App') {
      window.openGallery = () => {
        imgRef?.current?.click();
      };
      window.openFileUpload = () => {
        fileRef?.current?.click();
      };
    } else if (userAgent === 'iOS_App') {
      window.openGallery = () => {
        imgRef?.current?.click();
      };
      window.openFileUpload = () => {
        fileRef?.current?.click();
      };
    }
  }, []);

  const handleFocus = (e: MouseEvent) => {
    mobInputRef.current?.focus();
    mobInputRef.current?.classList.add('on');
  };

  //텍스트 인풋에 포커스 될 때, 블러 될 때 form박스 스타일 변경.
  const inputStyle = (e: React.FocusEvent, type: boolean) => {
    const target = e.currentTarget as HTMLFormElement;
    if (type) {
      target.classList.replace('off', 'on');
    } else {
      //파일 버튼, 메세지 전송 버튼을 누르면 포커스가 블러되는데 handleFoucs함수로 인해
      //메세지 전송 버튼을 눌러도 텍스트인풋에 다시 포커스된다.
      // settimeout으로 0.3초 후 text input에 포커스가 있으면 스타일변경x.
      setTimeout(() => {
        const input = target.querySelector('.textInput:focus');
        console.log(input);
        if (!input) {
          target.classList.replace('on', 'off');
        }
      }, 300);
    }
  };
  return (
    <Body ref={logs}>
      {isModal && <Modal click={() => setIsModal(false)} text={errorMessage} />}
      <TopBox>
        <MypageHeader
          back={true}
          title={handleName()}
          handle={true}
          handleOnClick={handleRoute}
          handleBackClick={handleRoute}
        />
        <IconBox>
          <IconWrap className="alarm" onClick={onClickAlarm}>
            {chattingData?.data?.chattingRoomNotification?.isSetNotification ? (
              <Image src={alarmBtn} layout="fill" />
            ) : (
              <Image src={stopAlarm} layout="fill" />
            )}
          </IconWrap>
          {router.query.entizen ? null : (
            <IconWrap onClick={() => setMoreModal(true)}>
              <Image src={moreBtn} layout="fill" />
            </IconWrap>
          )}
        </IconBox>
        {moreModal && (
          <WebMoreModal
            setMoreModal={setMoreModal}
            setQuitModal={setQuitModal}
            setReportModal={setReportModal}
            alarm={
              chattingData?.data?.chattingRoomNotification.isSetNotification
            }
          />
        )}
      </TopBox>
      <Inner className="inner">
        <div className="wrap">
          {data.map((d, idx) => {
            return (
              <DateChatting
                key={idx}
                className={`${idx === data.length - 1 ? 'target-p' : ''}`}
              >
                <Date>
                  {d.date.split('.')[0]}년 {d.date.split('.')[1]}월{' '}
                  {d.date.split('.')[2]}일
                </Date>
                <List>
                  {d.logs.map((item, index) => {
                    if (item.messageType === 'SYSTEM') {
                      return;
                    } else {
                      console.log(d.logs.length);
                      return (
                        <Wrap key={index}>
                          <ChatBox
                            userChatting={userChatting}
                            className={`${
                              item.fromMemberType === 'USER'
                                ? 'user'
                                : 'company'
                            } chattingLog`}
                          >
                            <ImageWrap
                              className={
                                item.fromMemberType === 'USER'
                                  ? 'user'
                                  : 'company'
                              }
                              userChatting={userChatting}
                            >
                              {handleImg() ? (
                                <img src={handleImg()} />
                              ) : (
                                <Image src={defaultImg} layout="fill" />
                              )}
                            </ImageWrap>

                            <StyledWrap
                              className={`${
                                item.fromMemberType === 'USER'
                                  ? 'user'
                                  : 'company'
                              }`}
                              userChatting={userChatting}
                            >
                              {item.content && (
                                <Chat
                                  userChatting={userChatting}
                                  className={`${
                                    item.fromMemberType === 'USER'
                                      ? 'user'
                                      : 'company'
                                  }`}
                                  //tabIndex={1}
                                >
                                  {item.content}
                                </Chat>
                              )}
                              {item.messageType === 'FILE' && (
                                <File>
                                  <FileDownload
                                    // onClick={DownloadFile}
                                    // href={item?.fileUrl!}
                                    download={item?.fileOriginalName!}
                                    onClick={() => {
                                      fileDownload(
                                        userAgent,
                                        item?.fileOriginalName!,
                                        item?.fileUrl!,
                                      );
                                    }}
                                    type={'blob'}
                                  >
                                    <Image
                                      src={fileImg}
                                      alt="file-icon"
                                      layout="intrinsic"
                                    />
                                    {item?.fileOriginalName}
                                  </FileDownload>
                                </File>
                              )}

                              {item.messageType === 'IMAGE' && (
                                <>
                                  <FileDownload
                                    // href={item?.fileUrl!}
                                    download={item?.fileOriginalName!}
                                    type={'blob'}
                                    onClick={() => {
                                      fileDownload(
                                        userAgent,
                                        item?.fileOriginalName!,
                                        item?.fileUrl!,
                                      );
                                    }}
                                  >
                                    <img
                                      src={item?.fileUrl!}
                                      style={{
                                        maxWidth: '112.5pt',
                                        maxHeight: '150pt',
                                        objectFit: 'cover',
                                        background: '#0000001c',
                                      }}
                                    />
                                  </FileDownload>
                                </>
                              )}
                            </StyledWrap>
                            <WrapDate
                              className={`${
                                item.fromMemberType === 'USER'
                                  ? 'user'
                                  : 'company'
                              }`}
                            >
                              <P
                                className={`${
                                  item.fromMemberType === 'USER'
                                    ? 'user-p'
                                    : 'company-p'
                                } ${
                                  idx === data.length - 1 &&
                                  index === d.logs.length - 1 &&
                                  `p-target`
                                } ???`}
                                userChatting={userChatting}
                              >
                                {item.wasRead ? '읽음' : ''}
                              </P>
                              <MessageDate>
                                {handleTime(item.createdAt)}
                              </MessageDate>
                            </WrapDate>
                          </ChatBox>
                        </Wrap>
                      );
                    }
                  })}
                </List>
              </DateChatting>
            );
          })}

          {loading && (
            <LoadingWrap tabIndex={1} ref={loadingRef}>
              <img src="/images/loading.gif" alt="" className="loading" />
            </LoadingWrap>
          )}

          <FocusBox tabIndex={1} className="target" ref={focusRef} />
        </div>
      </Inner>

      <MobBottomWrap>
        <BottomBox onClick={handleFocus}>
          <FlexBox
            onSubmit={onSubmitText}
            className="off"
            onFocus={(e) => {
              inputStyle(e, true);
            }}
            onBlur={(e) => {
              inputStyle(e, false);
            }}
          >
            <TextInput
              className="textInput"
              placeholder="메세지를 입력하세요"
              value={text}
              onChange={onChangeText}
              ref={mobInputRef}
            />
            <IconWrap2
              onClick={handleFocus}
              className={`typing ${typing ? 'on' : 'off'}`}
            >
              {typing ? (
                <Image src={sendBlue} layout="fill" />
              ) : (
                <Image src={send} layout="fill" />
              )}
            </IconWrap2>
          </FlexBox>
        </BottomBox>
        <AddBtn onClick={handleButton}>
          <ImgTag src={'/images/addBtnSvg.svg'} />
          <div className="hidden">
            <IconWrap3 onClick={imgHandler}>
              <Image src={chatPhotoAdd} layout="fill" />
            </IconWrap3>
            {/* <IconWrap3>
              <Image src={chatCamera} layout="fill" />
            </IconWrap3> */}
            <IconWrap3 onClick={fileHandler}>
              <Image src={chatFileAdd} layout="fill" />
            </IconWrap3>
          </div>
        </AddBtn>
      </MobBottomWrap>

      <WebBottomBox ref={webBox}>
        <FlexBox2 onSubmit={onSubmitText}>
          <InputWrap>
            <FileIconWrap onClick={() => setFileModal(true)}>
              <Image src={fileBtn} layout="fill" />
            </FileIconWrap>
            <TextInput
              placeholder="메세지를 입력하세요"
              // onKeyDown={() => imgChange(true)}
              // onKeyUp={() => imgChange(false)}
              value={text}
              onChange={onChangeText}
              ref={webInputRef}
            />
          </InputWrap>
          <button className={`typing ${typing ? 'on' : 'off'}`}>
            {typing ? (
              <Image src={sendBlue} layout="fill" />
            ) : (
              <Image src={send} layout="fill" />
            )}
          </button>
        </FlexBox2>
      </WebBottomBox>

      <input
        style={{ display: 'none' }}
        ref={imgRef}
        type="file"
        accept="image/*"
        onChange={saveFileImage}
        capture={userAgent === 'Android_App' && true}
      />
      <input
        style={{ display: 'none' }}
        ref={fileRef}
        type="file"
        accept=".xlsx,.pdf,.pptx,.ppt,.ppt,.xls,.doc,.docm,.docx,.txt,.hwp"
        onChange={saveFile}
      />

      {fileModal && (
        <WebFileModal
          setFileModal={setFileModal}
          imgClick={imgHandler}
          fileClick={fileHandler}
        />
      )}
      {/* 더보기 모달 제어 */}
      {moreModal && (
        <MoreModal
          setMoreModal={setMoreModal}
          setQuitModal={setQuitModal}
          setReportModal={setReportModal}
          alarm={chattingData?.data.chattingRoomNotification.isSetNotification}
        />
      )}
      {/* 나가기 모달 제어 */}
      {quitModal && (
        <QuitModal setModal={setQuitModal} deleteId={Number(routerId)} />
      )}

      {/* 신고하기 누르면 나오는 모달 추가 수정 필요 */}
      {reportModal && <ReportModal setModal={setReportModal} />}
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
  background: white;
  button {
    background: transparent;
  }
  button.typing {
    width: 18.75pt;
    height: 20.6pt;
    position: relative;
    cursor: pointer;

    &.on {
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
  border: 0.75pt solid #d3d3d3;
  border-radius: 37.5pt;
`;
const FileIconWrap = styled.div`
  position: relative;
  width: 14.5pt;
  height: 15.45pt;
  margin: 0 0 0 13.5pt;
`;
const MobBottomWrap = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;
const BottomBox = styled.div`
  background: #e9eaee;
  padding: 3pt 0pt 3pt;
  /* border: 1px solid red; */
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
    //border: 0.75pt solid #D3D3D3;
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
  justify-content: space-between;
  padding: 0 12pt 0 38.25pt;

  &.off {
    margin-bottom: 20pt;
  }
  &.on {
    transition: 0s 0.5s;
    margin-bottom: 0;
  }
`;
const AddBtn = styled.div`
  position: absolute;
  top: 6pt;
  left: 14.25pt;
  width: 20pt;
  height: 20pt;
  border-radius: 50%;
  background: #a6a9b0;
  transition: 0.3s;
  &.on {
    //transform: rotate(45deg);
    .add {
      transition: 0.3s;
      transform: rotate(45deg);
    }
  }
  .hidden {
    width: 30pt;
    height: 0;
    position: absolute;
    bottom: 36pt;
    left: -3.5pt;
    transition: 0.3s;
    background-color: white;
    //border: 0.75pt solid #D3D3D3;
    border-radius: 16.5pt;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const ImgTag = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const TextInput = styled.input`
  width: 100%;
  border-radius: 37.5pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  /* font-size: 12pt; */
  line-height: 9pt;
  letter-spacing: -0.02em;
  padding: 6pt 7.8pt;
  margin: 0 9pt;
  ::placeholder {
    color: #d3d3d3;
  }
`;
const IconWrap2 = styled.button`
  position: relative;
  min-width: 18.75pt;
  width: 18.75pt;
  height: 20.7pt;
  background: transparent;
`;
const TopBox = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 5;
  @media (min-width: 900pt) {
    position: absolute;
    border-bottom: 0.75pt solid #e2e5ed;
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
  z-index: 99999;
  //gap: 6.4pt;
  @media (min-width: 900pt) {
    right: 21pt;
  }
`;
const IconWrap = styled.div`
  position: relative;
  width: 18pt;
  height: 18pt;
  cursor: pointer;

  &.alarm {
    margin-right: 15pt;
  }
  @media (min-width: 900pt) {
    width: 21pt;
    height: 21pt;
  }
`;
const Inner = styled.div`
  position: relative;
  padding-top: 36pt;
  height: 90vh;
  overflow-y: scroll;
  padding-bottom: 60pt;
  .wrap {
    position: relative;
  }
  @media (min-width: 900pt) {
    margin-top: 105pt;
    height: 330pt;
    overflow-y: scroll;
    padding: 0;
  }
`;
const LoadingWrap = styled.div`
  position: absolute;
  width: 112.5pt;
  height: 112.5pt;
  right: 0;

  &:focus {
    outline: none;
  }

  > img {
    position: absolute;
    width: 50%;
    height: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const Wrap = styled.div`
  min-height: 39pt;
`;

const DateChatting = styled.div`
  width: 100%;
  font-family: 'Spoqa Han Sans Neo';
  text-align: center;
  position: relative;
`;
const Date = styled.span`
  display: inline-block;
  background: white;
  font-style: normal;
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #a6a9b0;
  position: relative;
  margin: 8pt auto 18pt;
  border-radius: 12pt;
  border: 0.75pt solid #e2e5ed;
  padding: 6pt 9pt;
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
  align-items: flex-end;
  position: relative;

  &.user {
    flex-direction: ${({ userChatting }) =>
      userChatting ? 'row-reverse' : 'row'};
  }
  &.company {
    flex-direction: ${({ userChatting }) =>
      userChatting ? 'row' : 'row-reverse'};
  }
`;
const StyledWrap = styled.div<{ userChatting: boolean }>`
  &.user {
    margin-left: ${({ userChatting }) => (userChatting ? '0pt' : '36pt')};
    @media (max-width: 899.25pt) {
      margin-left: ${({ userChatting }) => (userChatting ? '0pt' : '33pt')};
    }
  }
  &.company {
    margin-left: ${({ userChatting }) => (userChatting ? '36pt' : '0')};
    @media (max-width: 899.25pt) {
      margin-left: ${({ userChatting }) => (userChatting ? '33pt' : '0')};
    }
  }
`;
const ImageWrap = styled.div<{ userChatting: boolean }>`
  width: 27pt;
  height: 27pt;
  position: absolute;
  top: 0;
  border-radius: 50%;
  overflow: hidden;
  border: 0.75pt solid #d3d3d3;

  @media (max-width: 899.25pt) {
    width: 24pt;
    height: 24pt;
  }

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &.user {
    display: ${({ userChatting }) => (userChatting ? 'none' : 'block')};
  }
  &.company {
    display: ${({ userChatting }) => (userChatting ? 'block' : 'none')};
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
  max-width: 300pt;
  word-break: break-all;
  &.user {
    color: ${({ userChatting }) => (userChatting ? 'white' : '#222222')};
    background: ${({ userChatting }) => (userChatting ? '#5221cb' : '#f3f4f7')};
    text-align: left;
  }
  &.company {
    color: ${({ userChatting }) => (userChatting ? '#222222' : 'white')};
    background: ${({ userChatting }) => (userChatting ? '#f3f4f7' : '#5221cb')};
    text-align: left;
  }
  @media (max-width: 899.25pt) {
    max-width: 200pt;
  }
`;
const FileDownload = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 3pt;
  color: '#E2E5ED';
`;
const File = styled.button`
  margin-bottom: 6pt;
  margin-right: 6pt;
  padding: 7.5pt 6pt;
  border: 0.75pt solid '#999999';
  border-radius: 6pt;

  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
  }
`;

const MessageDate = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 7.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #caccd1;
  //margin-top: 12pt;
`;

const IconWrap3 = styled(IconWrap2)`
  background: transparent;
`;
const FocusBox = styled.div`
  width: 100%;
  height: 10pt;
  position: relative;
  &:focus {
    outline: none;
  }
`;
const WrapDate = styled.div`
  display: flex;
  flex-direction: column;
  &.user {
    margin-left: 6pt;
  }
  &.company {
    margin-right: 6pt;
  }
`;
const P = styled.p<{ userChatting: boolean }>`
  font-style: normal;
  font-weight: 400;
  font-size: 7.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #caccd1;
  display: none;

  &.user-p {
    &.p-target {
      text-align: right;
      display: ${({ userChatting }) => (userChatting ? 'block' : 'none')};
    }
  }
  &.company-p {
    &.p-target {
      text-align: right;
      display: ${({ userChatting }) => (userChatting ? 'none' : 'block')};
    }
  }
`;

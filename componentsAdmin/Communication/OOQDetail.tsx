import styled from '@emotion/styled';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import send from 'public/images/send.png';
import sendBlue from 'public/images/send-blue.png';
import fileBtn from 'public/images/fileBtn.png';
import Modal from 'components/Modal/Modal';
import WebFileModal from 'components/Chatting/WebFileModal';
import AdminHeader from 'componentsAdmin/Header';
import defaultImg from 'public/images/defaultImg.png';
import fileImg from 'public/mypage/file-icon.svg';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { isTokenAdminGetApi, isTokenAdminPostApi, multerApi } from 'api';
import { MulterResponse } from 'componentsCompany/MyProductList/ProductAddComponent';

type ChattingLogs = {
  createdAt: string;
  chattingLogIdx: number;
  fromMemberType: string;
  content: string | null;
  fileUrl: string | null;
  fileSize: null | number;
  fileOriginalName: null | string;
  wasRead: boolean;
  messageType: string;
};

export interface ChattingRoom {
  date: string;
  logs: ChattingLogs[];
}

export interface ChattingResponse {
  isSuccess: boolean;
  data: {
    chattingLogs: {
      member: {
        memberIdx: number;
        id: string;
        profileImageUrl: string;
        companyMemberAdditionalInfo: {
          companyMemberAdditionalInfoIdx: number;
          companyLogoImageUrl: string;
        };
      };
      chattingLogs: ChattingLogs[];
    };
  };
}

type Props = {
  detatilId: string;
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  setNowHeight:
    | React.Dispatch<React.SetStateAction<number | undefined>>
    | undefined;
  userType: string;
  memberIdx?: string;
};

const OOQDetail = ({
  detatilId,
  setNowHeight,
  setIsDetail,
  setIsRefetch,
  userType,
  memberIdx,
}: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [data, setData] = useState<ChattingRoom[]>([]);
  const [text, setText] = useState('');
  const [fileModal, setFileModal] = useState<boolean>(false);

  const chattingExcel = `/admin/chatting/consultations/${detatilId}/excel`;

  // 채팅 내역 불러오는 api
  const {
    data: OOQDetailData,
    isLoading: OOQDetailIsLoading,
    isError: OOQDetailIsError,
    refetch: OOQDetailRefetch,
  } = useQuery<ChattingResponse>(
    'OOQDetail',
    () => {
      return isTokenAdminGetApi(
        `/admin/chatting/consultations/${detatilId}?page=1&limit=10`,
      );
    },
    {
      enabled: router.isReady,
      // 몇초마다 갱신 해줄 것인가.
      refetchInterval: 3000,
    },
  );

  const [endChat, setEndChat] = useState(false);
  // 채팅 내용 중에 상담종료 있는지 없는지 판단

  // 에러 모달
  const [isModal, setIsModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [loading, setLoading] = useState<boolean>(false);

  const logs = useRef<HTMLDivElement>(null);
  const webInputRef = useRef<HTMLInputElement>(null);
  const mobInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLInputElement>(null);

  //   채팅 POST
  const {
    mutate: chattingPostMutate,
    isLoading: chattingPostIsLoading,
    isError: chattingPostIsError,
  } = useMutation(isTokenAdminPostApi, {
    onSuccess: async () => {
      setText('');
      await queryClient.invalidateQueries('chatting-data');
      setTimeout(() => {
        if (mobInputRef.current) mobInputRef.current.focus();
      }, 300);
    },
    onError: (error) => {
      // console.log('🔥 채팅방 POST 에러 발생');
      // console.log(error);
    },
  });

  // image s3 multer 저장 API (with useMutation)
  const { mutate: multerImage, isLoading: multerImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: (res) => {
      chattingPostMutate({
        url: `/chatting/${detatilId}`,
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
      OOQDetailRefetch();
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
        url: `/chatting/${detatilId}`,
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
      OOQDetailRefetch();
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

  // 인풋 텍스트 입력
  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };

  // 채팅 onsubmit
  const onSubmitText = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text) {
      chattingPostMutate({
        url: `/chatting/${detatilId}`,
        data: {
          content: text,
          files: null,
        },
      });
    }
  };

  // 채팅종료
  const onSubmitEndText = () => {
    chattingPostMutate({
      url: `/chatting/${detatilId}`,
      data: {
        content: '상담이 종료되었습니다.',
        files: null,
      },
    });
    // setIsDetail(false);
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
    imgRef?.current?.click();
  };
  //파일 온클릭
  const fileHandler = () => {
    fileRef?.current?.click();
  };

  const handleBackBtn = () => {
    setIsDetail(false);
    setIsRefetch(true);
  };

  // 윈도우 팝업
  const getProfile = (memberIdx: string) => {
    const popupX = document.body.offsetWidth / 2;
    const popupY = window.screen.height;

    const style = `left: ${popupX - 200},top: ${popupY - 250},`;

    window.open(
      `/admin/getUserProfile?${userType}=${memberIdx}`,
      '_blank',
      `width=500, height=600, scrollbars=yes`,
    );
  };

  useEffect(() => {
    window.open(
      `/admin/getUserProfile?${userType}=${memberIdx}`,
      '_blank',
      `width=500, height=600, scrollbars=yes`,
    );
  }, []);

  useEffect(() => {
    if (loading) {
      loadingRef.current?.focus();
    }
  }, [loading]);

  useEffect(() => {
    if (detatilId) {
      OOQDetailRefetch();
    }
  }, [detatilId]);

  /* 호출되는 데이터는 최신순 정렬. 제일 오래된 데이터가 맨 위로 가도록 정렬 후, 같은 날자끼리 묶는 함수*/
  useEffect(() => {
    if (!OOQDetailIsLoading && OOQDetailData?.isSuccess === true) {
      const sortArr = Array.from(
        OOQDetailData?.data?.chattingLogs?.chattingLogs!,
      );
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
      //   // console.log('temp', temp);
      setData(temp);

      const inner = logs.current?.querySelector('.OOQ-inner');

      if (loading) {
        setLoading(false);
        // console.log('img');
        setTimeout(() => {
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
        }, 300);
      } else {
        setTimeout(() => {
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
  }, [detatilId, OOQDetailData]); //의존성 배열, 호출할때만으로 정해야 함.

  useEffect(() => {
    if (
      OOQDetailData?.data?.chattingLogs?.chattingLogs[0]?.content ===
      '상담이 종료되었습니다.'
    ) {
      setEndChat(true);
    } else {
      setEndChat(false);
    }
  }, [detatilId, OOQDetailData]);

  const now = window.document.documentElement.scrollHeight;

  useEffect(() => {
    if (setNowHeight && detatilId) {
      setNowHeight(now);
    }
  }, [detatilId]);

  return (
    <Body ref={logs} now={now}>
      {isModal && <Modal click={() => setIsModal(false)} text={errorMessage} />}

      <AdminHeader
        type="detail"
        title="소통하기"
        subTitle="1대1 문의"
        backBtn={handleBackBtn}
        exelHide={true}
        excelData={chattingExcel}
      />

      <Wrapper className="OOQ-innerWrap">
        <TopBox className="OOQ-innerTop">
          <P>{OOQDetailData?.data?.chattingLogs?.member?.id}</P>
          <QuitBtn
            onClick={() => {
              if (endChat === false) {
                onSubmitEndText();
              }
            }}
            endChat={endChat}
          >
            <span>상담 종료</span>
          </QuitBtn>
        </TopBox>
        <Inner className="OOQ-inner">
          <div className="wrap">
            {data.map((d, idx) => {
              return (
                <DateChatting
                  key={idx}
                  className={`${idx === data.length - 1 ? 'target-p' : ''}`}
                >
                  <Date>{d.date}</Date>
                  <List>
                    {d?.logs?.map((item, idx) => {
                      if (item.messageType === 'SYSTEM') {
                        return;
                      } else {
                        return (
                          <Wrap>
                            <ChatBox
                              userChatting={item?.fromMemberType}
                              className={`${
                                item.fromMemberType === 'ADMIN'
                                  ? 'admin'
                                  : 'user'
                              } chattingLog`}
                            >
                              <ImageWrap
                                className={
                                  item.fromMemberType === 'ADMIN'
                                    ? 'admin'
                                    : 'user'
                                }
                                userChatting={item?.fromMemberType}
                                style={{
                                  cursor: 'pointer',
                                }}
                                onClick={() => {
                                  getProfile(memberIdx!);
                                }}
                              >
                                {item?.fromMemberType !== 'ADMIN' ? (
                                  <img
                                    src={
                                      OOQDetailData?.data?.chattingLogs?.member
                                        ?.profileImageUrl
                                    }
                                  />
                                ) : (
                                  <Image src={defaultImg} layout="fill" />
                                )}
                              </ImageWrap>
                              {item.content && (
                                <Chat
                                  userChatting={item?.fromMemberType}
                                  className={`${
                                    item.fromMemberType === 'ADMIN'
                                      ? 'admin'
                                      : 'user'
                                  }`}
                                  //tabIndex={1}
                                >
                                  {item.content}
                                </Chat>
                              )}
                              {item.messageType === 'FILE' && (
                                <File>
                                  <FileDownload
                                    href={item?.fileUrl!}
                                    download={item?.fileOriginalName!}
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
                                    href={item?.fileUrl!}
                                    download={item?.fileOriginalName!}
                                    type={'blob'}
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
                              <WrapDate userChatting={item?.fromMemberType}>
                                <IsRead
                                  className={`${
                                    item.fromMemberType === 'ADMIN'
                                      ? 'admin-p'
                                      : 'user-p'
                                  } ${
                                    idx === d.logs.length - 1 ? 'p-target' : ''
                                  }`}
                                  userChatting={item?.fromMemberType}
                                >
                                  {item.wasRead ? '읽음' : ''}
                                </IsRead>
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
        {fileModal && (
          <WebFileModal
            setFileModal={setFileModal}
            imgClick={imgHandler}
            fileClick={fileHandler}
          />
        )}
        <WebBottomBox className="OOQ-bottom">
          <FlexBox2 onSubmit={onSubmitText}>
            <InputWrap>
              <FileIconWrap onClick={() => setFileModal(!fileModal)}>
                <Image src={fileBtn} layout="fill" />
              </FileIconWrap>
              <TextInput
                placeholder="메세지를 입력하세요"
                value={text}
                onChange={onChangeText}
                ref={webInputRef}
              />
            </InputWrap>
            <button className="typing">
              {text.length > 0 ? (
                <Image src={sendBlue} layout="fill" />
              ) : (
                <Image src={send} layout="fill" />
              )}
            </button>
          </FlexBox2>
        </WebBottomBox>
      </Wrapper>
      <input
        style={{ display: 'none' }}
        ref={imgRef}
        type="file"
        accept="image/*"
        onChange={saveFileImage}
      />
      <input
        style={{ display: 'none' }}
        ref={fileRef}
        type="file"
        accept=".xlsx,.pdf,.pptx,.ppt,.ppt,.xls,.doc,.docm,.docx,.txt,.hwp"
        onChange={saveFile}
      />
    </Body>
  );
};

export default OOQDetail;

const Body = styled.div<{ now?: number }>`
  position: absolute;
  width: 100%;
  /* height: 100vh; */
  height: ${({ now }) => (now ? `${now}px` : `100%`)};
  padding: 0 18pt;
  background: white;
  top: 0;
  left: 0;
`;

const Wrapper = styled.div`
  position: relative;
  margin-top: 4px;
  border: 2px solid #e2e5ed;
  border-radius: 8px;
  overflow: hidden;
`;
const QuitBtn = styled.button<{ endChat?: boolean }>`
  position: absolute;
  top: 20%;
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ endChat }) => (endChat === true ? '#464646' : '#5221CB')};
  border-radius: 3px;

  > span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    color: #ffffff;
    padding: 2px 8px;
  }
`;

const Inner = styled.div`
  position: relative;
  margin-top: 105pt;
  height: 330pt;
  overflow-y: scroll;
  padding: 0;
`;

const TopBox = styled.div`
  top: 0;
  width: 100%;
  position: absolute;
  border-bottom: 1px solid #e2e5ed;
`;

const P = styled.p<{ userChatting?: string }>`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #000000;
  padding: 9pt 0;
`;

const IsRead = styled.p<{ userChatting?: string }>`
  font-style: normal;
  font-weight: 400;
  font-size: 8pt;
  line-height: 150%;
  text-align: center;
  /* color: #000000; */
  color: #caccd1;
  display: none;

  &.user-p {
    &.p-target {
      display: ${({ userChatting }) => (userChatting ? 'none' : 'block')};
    }
  }
  &.admin-p {
    &.p-target {
      display: ${({ userChatting }) => (userChatting ? 'block' : 'none')};
    }
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
  cursor: pointer;
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
const FocusBox = styled.div`
  width: 100%;
  height: 10pt;
  position: relative;
  &:focus {
    outline: none;
  }

  @media (max-width: 899.25pt) {
    height: 5pt;
  }
`;
const WebBottomBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 3pt 0pt 16.5pt;
  background: white;
  button.typing {
    width: 18.75pt;
    height: 20.6pt;
    position: relative;
    background: none;
    cursor: pointer;
  }
`;

const Wrap = styled.div`
  padding-bottom: 70pt;
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

const ChatBox = styled.div<{ userChatting: string }>`
  display: flex;
  align-items: center;
  margin-bottom: 12pt;
  gap: 6pt;
  align-items: flex-end;

  &.admin {
    flex-direction: ${({ userChatting }) =>
      userChatting === 'ADMIN' ? 'row-reverse' : 'row'};
  }
  &.user {
    flex-direction: ${({ userChatting }) =>
      userChatting !== 'ADMIN' ? 'row' : 'row-reverse'};
  }
`;
const ImageWrap = styled.div<{ userChatting: string }>`
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
  &.admin {
    display: ${({ userChatting }) =>
      userChatting === 'ADMIN' ? 'none' : 'block'};
  }
  &.user {
    display: ${({ userChatting }) =>
      userChatting !== 'ADMIN' ? 'block' : 'none'};
  }
`;

const Chat = styled.div<{ userChatting: string }>`
  border-radius: 6pt;
  padding: 7.5pt 6pt;
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 16.5pt;
  letter-spacing: -0.02em;

  &.admin {
    color: ${({ userChatting }) =>
      userChatting === 'ADMIN' ? 'white' : '#222222'};
    background: ${({ userChatting }) =>
      userChatting === 'ADMIN' ? '#5221cb' : '#f3f4f7'};
  }
  &.user {
    color: ${({ userChatting }) =>
      userChatting !== 'ADMIN' ? '#222222' : 'white'};
    background: ${({ userChatting }) =>
      userChatting !== 'ADMIN' ? '#f3f4f7' : '#5221cb'};
  }
`;
const FileDownload = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 3pt;
  color: '#E2E5ED';
  cursor: pointer;
`;
const File = styled.button`
  //margin-bottom: 6pt;
  margin-right: 6pt;
  padding: 7.5pt 6pt;
  border: 0.75pt solid '#999999';
  border-radius: 8px;
  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
  }
`;

const MessageDate = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 7.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: #caccd1;
  margin-top: 0 !important;
`;

const IconWrap2 = styled.button`
  position: relative;
  min-width: 18.75pt;
  width: 18.75pt;
  height: 20.7pt;
`;

const WrapDate = styled.div<{ userChatting: string }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ userChatting }) =>
    userChatting === 'ADMIN' ? 'flex-end' : 'flex-start'};
`;

import styled from '@emotion/styled';
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
import {
  QueryObserverResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import {
  isTokenGetApi,
  multerApi,
  isTokenPostApi,
  isTokenPutApi,
  isTokenPatchApi,
  isTokenDeleteApi,
} from 'api';

// type ChattingLogs = {
//   createdAt: string;
//   chattingLogIdx: number;
//   fromMemberIdx: number;
//   fromMemberType: string;
//   content: string | null;
//   messageType: string;
//   fileUrl: string | null;
//   fileSize: null | number;
//   fileOriginalName: null | string;
//   wasRead: boolean;
// };

type ChattingLogs = {
  createdAt: string;
  chattingLogIdx: number;
  content: string | null;
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
  isSuccess: boolean;
  data: {
    chattingLogs: {
      member: {
        memberIdx: number;
        id: string;
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
  setNowHeight:
    | React.Dispatch<React.SetStateAction<number | undefined>>
    | undefined;
};

const OOQDetail = ({ detatilId, setNowHeight }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const routerId = router?.query?.chattingRoomIdx;
  const [data, setData] = useState<ChattingRoom[]>([]);
  const [text, setText] = useState('');
  const [fileModal, setFileModal] = useState<boolean>(false);

  // 채팅 내역 불러오는 api
  const {
    data: OOQDetailData,
    isLoading: OOQDetailIsLoading,
    isError: OOQDetailIsError,
    refetch: OOQDetailRefetch,
  } = useQuery<ChattingResponse>(
    'OOQDetail',
    () => {
      return isTokenGetApi(
        `/admin/chatting/consultations/${detatilId}?page=1&limit=10`,
      );
    },
    {
      enabled: router.isReady,
      // 몇초마다 갱신 해줄 것인가.
      refetchInterval: 3000,
    },
  );

  useEffect(() => {
    if (detatilId) {
      OOQDetailRefetch();
    }
  }, [detatilId]);

  //나가기 모달
  const [moreModal, setMoreModal] = useState<boolean>(false);
  const [quitModal, setQuitModal] = useState<boolean>(false);

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
  } = useMutation(isTokenPostApi, {
    onSuccess: async () => {
      setText('');
      await queryClient.invalidateQueries('chatting-data');
      setTimeout(() => {
        if (mobInputRef.current) mobInputRef.current.focus();
      }, 300);
    },
    onError: (error) => {
      console.log('🔥 채팅방 POST 에러 발생');
      console.log(error);
    },
  });

  // 인풋 텍스트 입력
  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };

  // 채팅 onsubmit
  const onSubmitText = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    chattingPostMutate({
      url: `/chatting/${detatilId}`,
      data: {
        content: text,
        files: null,
      },
    });
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
      // multerFile(formData);
      // setLoading(true);
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
      //  multerImage(formData);
      //  setLoading(true)
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
    //setIsDetail(false);
  };

  useEffect(() => {
    if (loading) {
      loadingRef.current?.focus();
    }
  }, [loading]);

  /* 호출되는 데이터는 최신순 정렬. 제일 오래된 데이터가 맨 위로 가도록 정렬 후, 같은 날자끼리 묶는 함수*/
  useEffect(() => {
    console.log('쿼리아이디, 데이타 변경됨');
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

      if (loading) {
        setLoading(false);
        console.log('img');
        setTimeout(() => {
          focusRef.current?.focus();

          if (webInputRef.current) {
            webInputRef.current.focus();
          }
        }, 300);
      } else {
        console.log('chat');
        setTimeout(() => {
          focusRef.current?.focus();

          if (webInputRef.current) {
            webInputRef.current.focus();
          }
        }, 100);
      }
    }
  }, [detatilId, OOQDetailData]); //의존성 배열, 호출할때만으로 정해야 함.

  const now = window.document.documentElement.scrollHeight;

  useEffect(() => {
    if (setNowHeight && detatilId) {
      setNowHeight(now);
    }
  }, [detatilId]);

  console.log('🎀 지금 뭐나옴??? 🎀', OOQDetailData?.data);

  return (
    <Body ref={logs} now={now}>
      {isModal && <Modal click={() => setIsModal(false)} text={errorMessage} />}

      <AdminHeader
        type="detail"
        title="소통하기"
        subTitle="1대1 문의"
        backBtn={handleBackBtn}
        exelHide={true}
      />

      <Wrapper className="OOQ-innerWrap">
        <TopBox className="OOQ-innerTop">
          <P>{OOQDetailData?.data?.chattingLogs?.member?.id}</P>
          <QuitBtn
            onClick={() => {
              setText('상담이 종료되었습니다.');
            }}
          >
            <span>상담 종료</span>
          </QuitBtn>
        </TopBox>
        <Inner className="OOQ-inner">
          <div className="wrap">
            {loading && (
              <LoadingWrap tabIndex={1} ref={loadingRef}>
                <img src="/images/loading.gif" alt="" className="loading" />
              </LoadingWrap>
            )}
            <FocusBox tabIndex={1} className="target" ref={focusRef} />
          </div>
        </Inner>

        <WebBottomBox className="OOQ-bottom">
          <FlexBox2 onSubmit={onSubmitText}>
            <InputWrap>
              <FileIconWrap onClick={() => setFileModal(true)}>
                <Image src={fileBtn} layout="fill" />
              </FileIconWrap>
              <TextInput
                placeholder="메세지를 입력하세요"
                value={text}
                onChange={onChangeText}
                ref={webInputRef}
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

      {fileModal && (
        <WebFileModal
          setFileModal={setFileModal}
          imgClick={imgHandler}
          fileClick={fileHandler}
        />
      )}
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
const QuitBtn = styled.button`
  position: absolute;
  top: 20%;
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #464646;
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

const P = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #000000;
  padding: 9pt 0;
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
    &.on {
      display: none;
    }
    &.off {
      display: block;
    }
  }
`;

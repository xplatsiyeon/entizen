import styled from "@emotion/styled";
import MypageHeader from 'components/mypage/request/header';
import defaultImg from 'public/images/defaultImg.png';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, {
  MouseEvent,
  useEffect,
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
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { isTokenGetApi, isTokenPatchApi, isTokenPostApi, multerApi } from 'api';
import { MulterResponse } from 'componentsCompany/MyProductList/ProductAddComponent';
import { AxiosError } from 'axios';
import fileImg from 'public/mypage/file-icon.svg';
import Modal from 'components/Modal/Modal';
import chatFileAdd from 'public/images/chatFileAdd.png';
import chatCamera from 'public/images/chatCamera.png';
import chatPhotoAdd from 'public/images/chatPhotoAdd.png';
import WebMoreModal from "components/Chatting/WebMoreModal";
import WebFileModal from "components/Chatting/WebFileModal";


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
  


const OOQDetail = ()=>{

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


  const [loading, setLoading] = useState<boolean>(false);

  const logs = useRef<HTMLDivElement>(null);
  const webInputRef = useRef<HTMLInputElement>(null);
  const mobInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLInputElement>(null);




  // 인풋 텍스트 입력
  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };


  const handleTime = (st: string) => {
    //오전, 오후로 나누기
    const h = dayjs(st).get('h');
    if (Number(h) > 12) {
      const pm = dayjs(st).subtract(12, 'h').format('HH:mm');
      return `오후 ${pm}`;
    } else if (Number(h) === 12) {
      const pm12 = dayjs(st).format('HH:mm')
      return `오후 ${pm12}`
    }
    else {
      const am = dayjs(st).format('HH:mm')
      return `오전 ${am}`;
    }
  };

  // 파일 저장
  const saveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target; 
    if (!(files?.length)) {
      setFileModal(false)
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
    };
  }

  //이미지저장
  const saveFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!(files?.length)) {
      setFileModal(false)
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


  useEffect(() => {
    if (loading) {
      loadingRef.current?.focus();
    }
  }, [loading])


    return (  <Body ref={logs}>
        {isModal && <Modal click={() => setIsModal(false)} text={errorMessage} />}
        <TopBox>
          <MypageHeader
            back={false}
            title={'회원이름'}
          />
        </TopBox>
        <Inner >
          <div className='wrap'>
  
            {loading &&
              <LoadingWrap tabIndex={1} ref={loadingRef}>
                <img src="/images/loading.gif" alt="" className='loading' />
              </LoadingWrap>
            }
  
          <FocusBox tabIndex={1} className='target' ref={focusRef} />
          </div>
  
        </Inner>
  
        <WebBottomBox>
          <FlexBox2>
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
          accept=".xlsx,.pdf,.pptx,.ppt,.ppt,.xls,.doc,.docm,.docx,.txt,.hwp"
          onChange={saveFile}
        />
  
        {fileModal && <WebFileModal setFileModal={setFileModal} imgClick={imgHandler} fileClick={fileHandler} />}
        {/* 더보기 모달 제어 */}

      </Body>
    )
}

export default OOQDetail;

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
  width: 18pt;
  height: 18pt;
  cursor: pointer;
  @media (min-width: 900pt) {
    width: 21pt;
    height: 21pt;
  }
`;
const Inner = styled.div`
  position: relative;
  padding-top: 36pt;
  height: 83vh;
  overflow-y: scroll;
  .wrap{
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

>img{
position: absolute;
width: 50%;
height: 50%;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
}
`
const Wrap = styled.div`
`

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
  &.target-p{
  .user-p{
    &.p-target{
    display: block;
    }
  }
  .company-p{
    &.p-target{
    display: block;
    }
  }
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
  align-items: end;

  &.user {
    flex-direction: ${({ userChatting }) =>
    userChatting ? 'row-reverse' : 'row'};
  }
  &.company {
    flex-direction: ${({ userChatting }) =>
    userChatting ? 'row' : 'row-reverse'};
  }
`;
const ImageWrap = styled.div<{ userChatting: boolean }>`
  width: 36pt;
  height: 36pt;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  border: 0.75pt solid #D3D3D3;
  >img{
    width: 100%;
  }
  &.user{
    display: ${({ userChatting }) => userChatting ? 'none' : 'block'};
  }
  &.company{
    display: ${({ userChatting }) => userChatting ? 'block' : 'none'}
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
  //margin-top: 12pt;
`;

const IconWrap3 = styled(IconWrap2)`
  background: transparent;
`
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
`
const WrapDate = styled.div`
  display: flex;
  flex-direction: column;
` 
const P = styled.p<{userChatting:boolean}>`
  font-style: normal;
  font-weight: 400;
  font-size: 7.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #caccd1;
  display: none;
  `

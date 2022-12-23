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
import AdminHeader from "componentsAdmin/Header";


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



const OOQDetail = () => {

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

    const handleBackBtn = () => {
        //setIsDetail(false);
      };

    useEffect(() => {
        if (loading) {
            loadingRef.current?.focus();
        }
    }, [loading])


    return (
        <Body ref={logs}>
            {isModal && <Modal click={() => setIsModal(false)} text={errorMessage} />}

            <AdminHeader type="detail" title="소통하기" subTitle="1대1 문의" backBtn={handleBackBtn} exelHide={true} />
 
            <Wrapper className="OOQ-innerWrap">
                <TopBox className="OOQ-innerTop">
                    <P>회원이름</P>
                    <QuitBtn><span>상담 종료</span></QuitBtn>
                </TopBox>
                <Inner className="OOQ-inner">
                    <div className='wrap'>

                        {loading &&
                            <LoadingWrap tabIndex={1} ref={loadingRef}>
                                <img src="/images/loading.gif" alt="" className='loading' />
                            </LoadingWrap>
                        }

                        <FocusBox tabIndex={1} className='target' ref={focusRef} />
                    </div>

                </Inner>

                <WebBottomBox className="OOQ-bottom">
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
            </Wrapper>
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

        </Body>
    )
}

export default OOQDetail;

const Body = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  padding: 0 18pt;
  background: white;
  top: 0;
  left: 0;

`;

const Wrapper = styled.div`
    position: relative;
    margin-top: 4px;
    border: 2px solid #E2E5ED;
    border-radius: 8px;
    overflow: hidden;
`
const QuitBtn = styled.button`
    position: absolute;
    top:9px;
    right: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #464646;
    border-radius: 3px;

    >span{  
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    color: #FFFFFF;
    padding: 2px 8px;
    }
`

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

const P= styled.p`
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 150%;
text-align: center;
color: #000000;
padding: 9pt 0;
`

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

>img{
position: absolute;
width: 50%;
height: 50%;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
}
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
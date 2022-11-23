import styled from "@emotion/styled";
import MypageHeader from "components/mypage/request/header";
import defaultImg from 'public/images/default-img.png';
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import send from 'public/images/send.png'

type ChattingLogs = {
    createdAt: string;
    chattingLogIdx: number;
    fromMemberIdx: number;
    fromMemberType: string;
    content: string | null;
    messageType: string;
    fileUrl: string | null;
    wasRead: boolean;
}

export interface ChattingRoom {
    date: string;
    logs: ChattingLogs[];
}

type Props = {
companyId : string
}


const ChattingRoom = ({companyId}:Props) => {

    console.log('room')


    const router = useRouter();
    const [data, setData] = useState<ChattingRoom[]>([]);
    //const [company, setCompany] = useState<string>()

   /* useEffect(() => {
        console.log(company)
        if (typeof (router.query.companyMemberId) === 'string') {
            setCompany(router.query.companyMemberId)
        }
    }, [router.query.companyMemberId]) */

    const arr = {
        "isSuccess": true,
        "data": {
            "chattingLogs": [
                {
                    "createdAt": "2022-11-15T06:22:23.429Z",
                    "chattingLogIdx": 10,
                    "fromMemberIdx": 35,
                    "fromMemberType": "USER",
                    "content": null,
                    "messageType": "FILE",
                    "fileUrl": "https://test.test.com",
                    "wasRead": true
                },
                {
                    "createdAt": "2022-11-17T06:22:22.972Z",
                    "chattingLogIdx": 9,
                    "fromMemberIdx": 35,
                    "fromMemberType": "USER",
                    "content": null,
                    "messageType": "FILE",
                    "fileUrl": "https://test.test.com",
                    "wasRead": true
                },
                {
                    "createdAt": "2022-11-17T06:22:22.559Z",
                    "chattingLogIdx": 8,
                    "fromMemberIdx": 35,
                    "fromMemberType": "USER",
                    "content": null,
                    "messageType": "FILE",
                    "fileUrl": "https://test.test.com",
                    "wasRead": true
                },
                {
                    "createdAt": "2022-11-13T06:22:22.128Z",
                    "chattingLogIdx": 7,
                    "fromMemberIdx": 35,
                    "fromMemberType": "USER",
                    "content": null,
                    "messageType": "FILE",
                    "fileUrl": "https://test.test.com",
                    "wasRead": true
                },
                {
                    "createdAt": "2022-11-16T09:22:21.526Z",
                    "chattingLogIdx": 6,
                    "fromMemberIdx": 35,
                    "fromMemberType": "USER",
                    "content": null,
                    "messageType": "FILE",
                    "fileUrl": "https://test.test.",
                    "wasRead": true
                },
                {
                    "createdAt": "2022-10-22T06:22:20.256Z",
                    "chattingLogIdx": 5,
                    "fromMemberIdx": 35,
                    "fromMemberType": "USER",
                    "content": null,
                    "messageType": "FILE",
                    "fileUrl": "https://test.test.com",
                    "wasRead": true
                },
                {
                    "createdAt": "2022-11-15T06:22:19.189Z",
                    "chattingLogIdx": 4,
                    "fromMemberIdx": 35,
                    "fromMemberType": "USER",
                    "content": null,
                    "messageType": "FILE",
                    "fileUrl": "https://test.test.com",
                    "wasRead": true
                },
                {
                    "createdAt": "2022-11-17T06:14:13.153Z",
                    "chattingLogIdx": 3,
                    "fromMemberIdx": 35,
                    "fromMemberType": "USER",
                    "content": null,
                    "messageType": "FILE",
                    "fileUrl": "https://test.test.com",
                    "wasRead": true
                },
                {
                    "createdAt": "2022-11-13T14:13:59.946Z",
                    "chattingLogIdx": 2,
                    "fromMemberIdx": 35,
                    "fromMemberType": "COMPANY",
                    "content": "hello2",
                    "messageType": "CHATTING",
                    "fileUrl": null,
                    "wasRead": true
                },
                {
                    "createdAt": "2022-11-17T06:13:20.409Z",
                    "chattingLogIdx": 1,
                    "fromMemberIdx": 35,
                    "fromMemberType": "USER",
                    "content": "hello",
                    "messageType": "CHATTING",
                    "fileUrl": null,
                    "wasRead": true
                }
            ]
        }
    }

    /* 호출되는 데이터는 최신순 정렬. 제일 오래된 데이터가 맨 위로 가도록 정렬 후, 같은 날자끼리 묶는 함수*/
    useEffect(() => {
        /*arr.data.chattingLogs.map((d,idx)=>{
            const date = dayjs(d.createdAt).format("YYYY.MM.DD HH:mm:ss");
        })*/
        const sortArr = Array.from(arr.data.chattingLogs);
        sortArr.sort((a, b) => {
            const fomatedA = dayjs(a.createdAt).format("YYYY.MM.DD HH:mm:ss");
            const fomatedB = dayjs(b.createdAt).format("YYYY.MM.DD HH:mm:ss");
            if (fomatedA > fomatedB) {
                return 1
            }
            if (fomatedA < fomatedB) {
                return -1
            }
            return 0
        }
        )
        //console.log(sortArr)  

        /* 날짜 최신순으로 정렬된 배열을 날짜 기준으로 다시 묶기. 
            순서가 보장되었기 때문에 , 모든 요소 하나하나와 비교하지않고, 바로 전의 요소와만 비교해도 된다.
        */
        const temp: ChattingRoom[] = [];
        sortArr.forEach((a, idx) => {
            const date1 = dayjs(a.createdAt).format("YYYY.MM.DD");
            /*맨 처음 배열 요소는 그냥 push*/
            if (idx === 0) {
                temp.push({
                    date: date1, logs: [a]
                })
                /* 배열의 바로 전 요소 날짜값과 현재 요소의 날짜값이 같으면, temp배열의 가장 마지막 인덱스 요소(Logs)에 푸쉬. 
                  배열의 바로 전 요소 날짜값과 현재 요소의 날짜값이 다르면, temp 배열에 새롭게 Push.
                */
            } else {
                if (dayjs(sortArr[(idx - 1)].createdAt).format("YYYY.MM.DD") === date1) {
                    temp[temp.length - 1].logs.push(a)
                } else {
                    temp.push({
                        date: date1, logs: [a]
                    })
                }
            }
        })
        console.log('temp', temp);
        setData(temp)
    }, []) //의존성 배열, 호출할때만으로 정해야 함.

    const handleTime = (st: string) => {
        //오전, 오후로 나누기
        const pm = dayjs(st).subtract(12, 'h').format('HH:mm');
        if (Number(pm.substring(0, 3)) > 12) {
            return `오전 ${pm}`
        } else {
            return `오후 ${pm}`
        }
    }

    return (
        <Body>
            <TopBox>
                <MypageHeader back={true} title={companyId}
                    handle={true} 
                    handleOnClick={()=>router.push({
                        pathname: '/chatting'
                    })}/>
                <IconBox>
                    <IconWrap></IconWrap>
                    <IconWrap></IconWrap>
                </IconBox>
            </TopBox>
            <Inner>
            {data.map((d, idx) => {
                return (
                    <DateChatting key={idx}>
                        <Date>
                            {d.date}
                        </Date>
                        <List>
                            {d.logs.map((item, idx) => {
                                return (
                                    <ChatBox key={item.chattingLogIdx} className={`${(item.fromMemberType) === 'USER' ? "user" : null}`}>
                                        {(item.fromMemberType === 'USER') ? null :
                                            <ImageWrap>
                                                {/* 이미지 파일 src가 없으면 */}
                                                <Image src={defaultImg} layout='fill' />
                                            </ImageWrap>
                                        }
                                        {(item.content) && <Chat >{item.content}</Chat>}
                                        {(item.fileUrl) && <File >{item.fileUrl}</File>}
                                        <MessageDate>{handleTime(item.createdAt)}{'/' + dayjs(item.createdAt).format("HH:mm")}</MessageDate>
                                    </ChatBox>
                                )
                            })}
                        </List>
                    </DateChatting>
                )
            })}
            </Inner>
            <BottomBox>
                <FlexBox>
                    <AddBtn>

                    </AddBtn>
                    <TextInput placeholder="메세지를 입력하세요" />
                    <IconWrap2>
                        <Image src={send} layout="fill" />
                    </IconWrap2>
                </FlexBox>
            </BottomBox>
        </Body>
    )
}

export default ChattingRoom

const Body = styled.div`
position: relative;
`

const BottomBox = styled.div`
    background: #E9EAEE;
    position: fixed;
    bottom: 0;
    padding: 3pt 0pt 36pt;
    width: 100%;
    @media (min-width: 900pt) {
    position: absolute;
  }
`
const FlexBox = styled.div`
    display: flex;
    align-items: center;
    gap:10.5pt;
    padding: 0 15pt;
`
const AddBtn = styled.div`
    width: 20.6pt;
    height: 20.6pt;
    border-radius: 50%;
    background: #A6A9B0;
    &.on{
        transform: rotate(45deg)
    }
`
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
    color: #D3D3D3;
    }
`
const IconWrap2 = styled.div`
    position: relative;
    width: 18.75pt;
    height: 20.7pt;
`

const TopBox = styled.div`
position: fixed;
top: 0;
width: 100%;
z-index: 5;

@media (min-width: 900pt) {
    position: absolute;
  }
`
const IconBox = styled.div`
position: absolute;
right: 15pt;
top: 50%;
transform: translateY(-50%);
border: 1px solid;
display: flex;
`
const IconWrap = styled.div`
    position: relative;
    width: 12pt;
    height: 12pt;
`
const Inner = styled.div`
    position: relative;
    padding-top: 36pt;
    padding-bottom: 66pt;
`
const DateChatting = styled.div`
width: 100%;
font-family: 'Spoqa Han Sans Neo';
text-align: center;
position: relative;

&::before{
display: block;
content: '';
clear: both;
width: 50%;
height: 1px;
background: #E2E5ED;
position: absolute;
top: 15pt;
left: 0;
z-index: -1;
}
&::after{
display: block;
content: '';
clear: both;    
width: 50%;
height: 1px;
background: #E2E5ED;
position: absolute;
top: 15pt;
right: 0;
z-index: -1;
}
`
const Date = styled.span`
display: inline-block;
padding: 9pt;
background: white;
font-style: normal;
font-weight: 400;
font-size: 10.5pt;
line-height: 12pt;
letter-spacing: -0.02em;
color: #A6A9B0;
position: relative;
`

const List = styled.div`
margin: 0 15pt;
`

const ChatBox = styled.div`
display: flex;
align-items: center;
margin-bottom: 9pt;
gap: 6pt;
&.user{
    flex-direction: row-reverse;
}
`
const ImageWrap = styled.div`
width: 36pt;
height: 36pt;
position: relative;
`

const Chat = styled.div`
background: #5221CB;
border-radius: 6pt;
color: white;
padding: 7.5pt 6pt;
font-style: normal;
font-weight: 400;
font-size: 12pt;
line-height: 16.5pt;
letter-spacing: -0.02em;
`
const File = styled.div`
background: #5221CB;
border-radius: 6pt;
color: white;
padding: 7.5pt 6pt;
font-style: normal;
font-weight: 400;
font-size: 12pt;
line-height: 16.5pt;
letter-spacing: -0.02em;
    
`
const MessageDate = styled.p`
font-style: normal;
font-weight: 400;
font-size: 7.5pt;
line-height: 12pt;
letter-spacing: -0.02em;
color: #CACCD1;
margin-top: 12pt;
`;

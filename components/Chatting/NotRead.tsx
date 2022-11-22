import styled from "@emotion/styled";
import dayjs from "dayjs";
import Image from "next/image";
import defaultImg from 'public/images/default-img.png';

const NotRead = ()=>{

    // ? null로 된건 어떻게 할까?? 
    // 데이터 객체에 안읽은 메세지와 즐겨찾기가 구분되지않아서 filter로 걸름.
    const arr = {
        "isSuccess": true,
        "data": {
            "chattingRooms": {
                "entizenChattingRoom": null,
                "userChattingRooms": [
                    {
                        "chattingRoomIdx": 2,
                        "companyMember": { //판매자 회원정보
                            "memberIdx": 52,
                            "companyMemberAdditionalInfo": {
                                "companyName": "paulpaul"
                            }
                        },
                        "userMember": { //구매자 회원정보
                            "memberIdx": 35,
                            "name": "홍길동"
                        },
                        "chattingLogs": null, //채팅방 정보
                        "chattingRoomFavorite": { // 채팅방 즐겨찾기 관련 정보
                            "chattingRoomFavoriteIdx": 3,
                            "isFavorite": true
                        },
                        "chattingRoomNotification": { //채팅방 알림설정
                            "chattingRoomNotificationIdx": 3,
                            "isSetNotification": true
                        }
                    },
                    {
                        "chattingRoomIdx": 1,
                        "companyMember": {
                            "memberIdx": 36,
                            "companyMemberAdditionalInfo": {
                                "companyName": "네이버"
                            }
                        },
                        "userMember": {
                            "memberIdx": 35,
                            "name": "홍길동"
                        },
                        "chattingLogs": {
                            "fromMemberIdx": 35,
                            "fromMemberType": "USER",
                            "wasRead": false,
                            "createdAt": "2022-11-18T06:51:05.018Z",
                            "content": "ㅎㅇㅇ",
                            "fileUrl": null
                        },
                        "chattingRoomFavorite": {
                            "chattingRoomFavoriteIdx": 1,
                            "isFavorite": false
                        },
                        "chattingRoomNotification": {
                            "chattingRoomNotificationIdx": 1,
                            "isSetNotification": true
                        }
                    }
                ]
            }
        }
    }

    const wasRead = arr.data.chattingRooms.userChattingRooms.filter((ele,idx)=>{
        return !(ele.chattingLogs?.wasRead)
    }
    )

        {/*메세지 시간 표현 처리 함수 */ }
        const handleTime = (target: string | undefined) => {
            const now = dayjs();
            const diff = now.diff(target, 'h');
    
            if (diff < 24) {
                const createdAt = dayjs(target).format("HH:mm");
    
                //오전, 오후로 나누기
                const pm = dayjs(target).subtract(9, 'h').format('HH:mm');
                if (Number(pm.substring(0, 3)) > 12) {
                    return `오후 ${pm}`
                } else {
                    return `오전 ${createdAt}`
                }
    
            } else if ((diff > 24) && (diff < 48)) {
                const createdAt = dayjs(target).format("HH:mm");
                const pm = dayjs(target).subtract(9, 'h').format('HH:mm');
    
                if (Number(pm.substring(0, 3)) > 12) {
                    return `어제 ${pm}`
                } else {
                    return `어제 ${createdAt}`
                }
            } else {
                const createdAt = dayjs(target).format("YYYY-MM-DD HH:mm");
                const year = dayjs(target).get('y');
                const month = dayjs(target).get('month');
                const day = dayjs(target).get('day');
    
                if (now.get('y') !== year) {
                    return `${year}년 ${month}월 ${day}일`
                } else {
                    return `${month}월 ${day}일 `
                }
            }
        }
    
    
    return(
        <Body  >
            {wasRead.map((chatting, idx) => {
                return (
                    <Chatting className="chattingRoom" key={idx} >
                        <HiddenBox1>
                            <FavoriteBtn></FavoriteBtn>
                            <AlramBtn></AlramBtn>
                        </HiddenBox1>
                        <ChattingRoom className="content-box" >
                            <ChattingRoomImage>
                                <ImageWrap>
                                    <Image src={defaultImg} layout='fill' />
                                </ImageWrap>
                            </ChattingRoomImage>
                            <ChattingRoomPreview>
                                <FromMember>{chatting.companyMember.companyMemberAdditionalInfo.companyName}</FromMember>
                                <Previw>{chatting.chattingLogs?.content}</Previw>
                            </ChattingRoomPreview>
                            <ChattingRoomInfo>
                                <Created>{handleTime(chatting.chattingLogs?.createdAt)}</Created>
                                <Box>
                                    <UnRead wasRead={chatting.chattingLogs?.wasRead || undefined} />
                                    <Favorite>{chatting.chattingRoomFavorite ? <>true</> : <>false</>}</Favorite>
                                </Box>
                            </ChattingRoomInfo>
                        </ChattingRoom>
                        <HiddenBox2>
                            <QuitBtn></QuitBtn>
                        </HiddenBox2>
                    </Chatting>
                )
            })}
        </Body>
    )
}

export default NotRead;



const Body = styled.div`
font-family: 'Spoqa Han Sans Neo';
overflow: hidden;
`

const Chatting = styled.div`
display: flex;
width: 160%;
transform: translateX(-25%);
transition: 0.3s;
`
const ChattingRoom = styled.div`
display: flex;
padding: 13.5pt 0;
border-bottom: 1px solid #E2E5ED;
width: calc((100% / 8) * 5);

`
const ChattingRoomImage = styled.div`
    margin-left: 15pt;
`
const ChattingRoomPreview = styled.div`
flex: auto ;
margin: 0 12pt;
border: 1px solid;
position: relative;
`
const ChattingRoomInfo = styled.div`
display: flex;
flex-direction: column;
gap: 9pt;
margin-right: 15pt;
`
const ImageWrap = styled.div`
width: 36pt;
height: 36pt;
position: relative;
`
const FromMember = styled.p`
    
font-style: normal;
font-weight: 700;
font-size: 12pt;
line-height: 15pt;
letter-spacing: -0.02em;
color: #222222;
`
const Previw = styled.p`
    
font-style: normal;
font-weight: 400;
font-size: 12pt;
line-height: 18pt;
letter-spacing: -0.02em;
color: #222222;
position: absolute;
width: 120%;
`

const Created = styled.div`
font-style: normal;
font-weight: 400;
font-size: 9pt;
line-height: 12pt;
letter-spacing: -0.02em;
color: #CACCD1;
min-width: 67.5pt;
height: 12pt;
text-align: end;
`

const Box = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 6.75pt;
    align-items: center;
`
const UnRead = styled.div<{ wasRead?: boolean }>`
width: 6pt;
height: 6pt;
border-radius: 50%;
background: ${({ wasRead }) => wasRead ? `none` : `#5221CB`} ;
`
const Favorite = styled.div`
position: relative;
width: 9pt;
height: 9pt;
border: 1px solid red;
`

const HiddenBox1 = styled.div`
display: flex;
width: 25%;
position: relative;
`
const HiddenBox2 = styled.div`
display: flex;
width: 12.5%;
position: relative;
`
const FavoriteBtn = styled.div`
width: 50%;
height: 100%;
    border: 1px solid red;
`

const AlramBtn = styled.div`
width: 50%;
height: 100%;
    border: 1px solid green;
`

const QuitBtn = styled.div`
border: 1px solid plum;
width: 100%;
height: 100%;
`
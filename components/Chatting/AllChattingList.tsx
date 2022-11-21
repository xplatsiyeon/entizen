import styled from "@emotion/styled";
import Image from "next/image";
import defaultImg from 'public/images/default-img.png';

const AllChattingList = () => {

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

    return (
        <Body>
            {arr.data.chattingRooms.userChattingRooms.map((chatting, idx) => {
                return (
                    <ChattingRoom key={idx}>
                        <ChattingRoomImage>
                            <ImageWrap>
                                <Image src={defaultImg} layout='fill'/>
                            </ImageWrap>
                        </ChattingRoomImage>
                        <ChattingRoomPreview>
                            <FromMember>{chatting.companyMember.companyMemberAdditionalInfo.companyName}</FromMember>
                            <Previw>{chatting.chattingLogs?.content}</Previw>
                        </ChattingRoomPreview>
                        <ChattingRoomInfo>
                            <Created>{chatting.chattingLogs?.createdAt}</Created>
                            <Box>
                                <UnRead wasRead={chatting.chattingLogs?.wasRead || undefined} />
                                <Favorite>{chatting.chattingRoomFavorite?<>true</>:<>false</>}</Favorite>
                            </Box>
                        </ChattingRoomInfo>
                    </ChattingRoom>
                )
            })}
        </Body>
    )
}

export default AllChattingList;

const Body = styled.div`
font-family: 'Spoqa Han Sans Neo';
`
const ChattingRoom = styled.div`
margin: 0 15pt;
display: flex;
padding: 13.5pt 0;
border-bottom: 1px solid #E2E5ED;
`
const ChattingRoomImage = styled.div`
    
`
const ChattingRoomPreview = styled.div`
flex: auto ;
margin: 0 12pt;
border: 1px solid;
`
const ChattingRoomInfo = styled.div`
display: flex;
flex-direction: column;
    gap: 9pt;
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
`

const Created = styled.div`
font-style: normal;
font-weight: 400;
font-size: 9pt;
line-height: 12pt;
letter-spacing: -0.02em;
color: #CACCD1;
width: 37.5pt;
height: 12pt;
`

const Box = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 6.75pt;
    align-items: center;
`
const UnRead = styled.div<{wasRead?:boolean}>`
width: 6pt;
height: 6pt;
border-radius: 50%;
background: ${({wasRead})=> wasRead? `none` : `#5221CB`} ;
`
const Favorite = styled.div`
position: relative;
width: 9pt;
height: 9pt;
border: 1px solid red;
`
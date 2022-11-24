import styled from "@emotion/styled";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import defaultImg from 'public/images/default-img.png';
import { TouchEvent, useEffect, useRef, useState } from "react";

type Props = {
    type: number
}

type UserChattingLogs = {
        chattingRoomIdx: number,
        companyMember: { //판매자 회원정보
            memberIdx: number,
            companyMemberAdditionalInfo: {
                companyName: string
            }
        },
        userMember: { //구매자 회원정보
            memberIdx: number,
            name: string,
        },
        chattingLogs: {
            fromMemberIdx: number,
            fromMemberType: string,
            wasRead: boolean,
            createdAt: string,
            content: string,
            fileUrl: string | null
        }| null, //채팅방 정보
        chattingRoomFavorite: { // 채팅방 즐겨찾기 관련 정보
            chattingRoomFavoriteIdx: number,
            isFavorite: boolean
        },
        chattingRoomNotification: { //채팅방 알림설정
            chattingRoomNotificationIdx: number,
            isSetNotification: boolean
        }
    }

const ChattingList = ({ type }: Props) => {
    
    console.log('list', type)

    //const [chattingType] = useState<number>(type);
    const [dataArr, setDataArr] = useState<UserChattingLogs[]>([]);


    useEffect(() => {
        console.log('useEffect',type)
        //여기서 데이터 get();
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
        if (type === 0) {
            setDataArr(arr.data.chattingRooms.userChattingRooms)
        }

        if (type === 1) {
            const wasRead = arr.data.chattingRooms.userChattingRooms.filter((ele, idx) => {
                return !(ele.chattingLogs?.wasRead)
            }
            )
            setDataArr(wasRead);
        }

        if(type === 2){
            const favoriteArr = arr.data.chattingRooms.userChattingRooms.filter((f,idx)=>{
                return f.chattingRoomFavorite.isFavorite === true
            }) 
            setDataArr(favoriteArr)
        }
    }, [type] 
    /*부모 컴포넌트가 렌더링되거나 내부 요인으로 렌더링 되어도 전달되는 type이 바뀌지않으면 api 호출하지않음 */)

    {/*메세지 시간 표현 처리 함수 */ }
    const handleTime = (target: string | undefined) => {
        const now = dayjs();
        const diff = now.diff(target, 'h');

        if (diff < 24) {
            const createdAt = dayjs(target).format("HH:mm");

            //오전, 오후로 나누기
            const pm = dayjs(target).subtract(12, 'h').format('HH:mm');
            if (Number(pm.substring(0, 3)) > 12) {
                return `오후 ${pm}`
            } else {
                return `오전 ${pm}`
            }

        } else if ((diff > 24) && (diff < 48)) {
            const createdAt = dayjs(target).format("HH:mm");
            const pm = dayjs(target).subtract(12, 'h').format('HH:mm');

            if (Number(pm.substring(0, 3)) > 12) {
                return `어제 ${pm}`
            } else {
                return `어제 ${pm}`
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


    {/* 드래그 조절 함수 */ }
    const chattingList = useRef<HTMLDivElement>(null)
    let pressed = false;
    let prev: number;
    const touchStart = (e: TouchEvent<HTMLElement>) => {
        if (pressed) {
            return;
        } else {
            pressed = true;
            prev = e.changedTouches[0].clientX;
            if (!e.currentTarget.style.transform) {

                //transform: translate 말고 margin으로도 위치 조절할 수 있다.
                e.currentTarget.style.transform = `translateX(-25%)`
            } else {
                console.log(e.currentTarget.style.transform.slice(-5).slice(0,3))
            }

        }
    }
    const touchMove = (e: TouchEvent<HTMLElement>, idx: number) => {
        if (!pressed) {
            return;
        } else {
            const now = e.changedTouches[0].clientX;

            //현재 스타일의 transform 객체의 값에서 숫자만 남기기.
            const nowNum = e.currentTarget.style.transform.slice(-5).slice(0,3); 
            console.log(nowNum)
            const n = ((prev - now) > 0 ? -1 : 1);

            if ((prev - now) > 0) {
                let newNum = Number(nowNum) + n;
               const num = ( (newNum < -37.5) ? -37 : newNum);
               console.log('??', num)
               e.currentTarget.style.transform = `translateX(${num}%)`;
            } else if ((prev - now) < 0) { //오른쪽으로
                let newNum = Number(nowNum) + n;
                const num = ( (newNum > -25) ? newNum : -25);
                console.log('??', num)
                e.currentTarget.style.transform = `translateX(${num}%)`;
            }
        }
    }

    const touchEnd = (e: TouchEvent<HTMLElement>) => {
        pressed = false;
        const now = e.changedTouches[0].clientX;
        if(prev - now > 0){
        e.currentTarget.style.transform = `translateX(-37.5%)`
        }else if(prev - now < 0){
            e.currentTarget.style.transform = `translateX(0%)`
        }
    }

    {/* 디테일 페이지 이동 */ }
    const router = useRouter();

   const handleRoute = (idx: number, comIdx: number) => {
    console.log('route')
        router.push({
            pathname: `/chatting`,
            query: {
                memberId: idx,
                companyMemberId: comIdx,
            },
        })
    } 


    return (
        <Body ref={chattingList} >
            {dataArr.map((chatting, idx) => {
                return (
                    <Chatting className="chattingRoom" key={idx} onTouchStart={(e) => touchStart(e)}
                        onTouchMove={(e) => touchMove(e, idx)} onTouchEnd={touchEnd} onClick={() => handleRoute(chatting.userMember.memberIdx, chatting.companyMember.memberIdx)}>
                        <HiddenBox1>
                            <FavoriteBtn></FavoriteBtn>
                            <AlramBtn></AlramBtn>
                        </HiddenBox1>
                        <ChattingRoom className="content-box" >
                            <ChattingRoomImage>
                                {/* 이미지 파일 src가 없으면 */}
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
                                    <Favorite>{chatting.chattingRoomFavorite.isFavorite ? <>t</> : <>f</>}</Favorite>
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

export default ChattingList;

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
    margin-left: 21pt;

@media (max-width: 899pt) {
    margin-left: 15pt;
}
`
const ChattingRoomPreview = styled.div`
flex: auto ;
margin: 0 12pt;

position: relative;
`
const ChattingRoomInfo = styled.div`
display: flex;
flex-direction: column;
gap: 9pt;
margin-right: 21pt;

@media (max-width: 899pt) {
    margin-right: 15pt;
}
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
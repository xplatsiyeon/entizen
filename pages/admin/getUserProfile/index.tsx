import styled from "@emotion/styled";
import { isTokenAdminGetApi } from "api";
import { UserRespnse } from "componentsAdmin/Member/CommonDetail";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";


const UserProfile = ()=>{

  const router = useRouter();  
  const userId = router.query.USER;
  console.log(router.query)
  
  const {
    data: userData,
    refetch: userDataRefetch
  } = useQuery<UserRespnse>(
    'user-detail',
    () => isTokenAdminGetApi(`/admin/members/users/${userId}`),
    { onSuccess:()=>{

      },
      onError:(e)=>{
          console.log(e);
      },
      enabled: false,
      staleTime:30000,
      cacheTime:30000
      /*  enabled: router.isReady,
      // 몇초마다 갱신 해줄 것인가.
      refetchInterval: 3000, */
    },
  );

  useEffect(()=>{
    //유저 아이디가 읽힌 후에 useQuer호출(refetch()로).
    if(userId){
      userDataRefetch();
    }
  },[userId])

    return (
        <>{userId?
          <>
          <InfoBox>
            {userData?.data?.member?.profileImageUrl!?
            <Avatar>
                <Image
                  src={userData?.data?.member?.profileImageUrl!}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                />
            </Avatar>
           : 
            <NoAvatar />
          }
        </InfoBox>
        <TextAreaContainer>
          <label>관리자 전용 특이사항</label>
            <textarea
              rows={10}
              cols={30}
              readOnly={true}
              // value={
              //   specialNote !== undefined
              //     ? specialNote
              //     : userData?.data?.member?.etc
              // }
            >
              {userData?.data?.member?.etc}
            </textarea>
        </TextAreaContainer>
        </> : <></>
        }
        </>
    )
}

export default UserProfile;

const InfoBox = styled.div`
  width: 100%;
  margin-top: 12px;
  display: flex;
  gap: 25px;
`;
const Avatar = styled.span`
  position: relative;
  width: 120px;
  height: 120px;
  background-color: #a6a9b0;
  .exitImgBox {
    position: absolute;
    top: 4px;
    right: 4px;
    border: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const NoAvatar = styled.span`
  position: relative;
  width: 120px;
  height: 120px;
  background-color: #a6a9b0;
`;

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 936px;
  margin-top: 40px;

  label {
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: #000000;
  }
  textarea {
    resize: none;
    background: #ffffff;
    border: 2px solid #e7e7e7;
    border-radius: 4px;
  }
`;
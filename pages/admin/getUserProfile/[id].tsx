import styled from "@emotion/styled";
import { isTokenAdminGetApi } from "api";
import { UserRespnse } from "componentsAdmin/Member/CommonDetail";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "react-query";


const UserProfile = ()=>{

  const router = useRouter();  
  console.log(router)
  
  const {
    data: userData,
    isError: userError
  } = useQuery<UserRespnse>(
    'user-detail',
    () => isTokenAdminGetApi(`/admin/members/users/${router.query}`),
    {
    onError:(e)=>{
        console.log(e);
        alert('존재하지않는 회원입니다.')
    },
      // enabled: false,
      enabled: false,
    },
  );

    return (
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
              // value={
              //   specialNote !== undefined
              //     ? specialNote
              //     : userData?.data?.member?.etc
              // }
            >
              {userData?.data?.member?.etc}
            </textarea>
        </TextAreaContainer>
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
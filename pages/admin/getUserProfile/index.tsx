import styled from '@emotion/styled';
import { isTokenAdminGetApi } from 'api';
import {
  CompanyResposne,
  UserRespnse,
} from 'componentsAdmin/Member/CommonDetail';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { adminDateFomat, hyphenFn } from 'utils/calculatePackage';
import FileImg from 'public/adminImages/File.png';

const UserProfile = () => {
  const router = useRouter();
  const userId = router.query['USER'];
  const comUserId = router.query['COMPANY'];
  // console.log(router.query);
  // console.log(comUserId);

  const { data: userData, refetch: userRefetch } = useQuery<UserRespnse>(
    'user-detail',
    () => isTokenAdminGetApi(`/admin/members/users/${userId}`),
    {
      onSuccess: () => {},
      onError: (e) => {
        // console.log(e);
      },
      enabled: false,
      staleTime: 30000,
      cacheTime: 30000,
      /*  enabled: router.isReady,
      // 몇초마다 갱신 해줄 것인가.
      refetchInterval: 3000, */
    },
  );

  // 기업 상세보기 refetch
  const {
    data: companyData,
    isLoading: companyLoading,
    refetch: companyRefetch,
  } = useQuery<CompanyResposne>(
    'company-detail',
    () => isTokenAdminGetApi(`/admin/members/companies/${comUserId}`),
    {
      enabled: false,
    },
  );
  useEffect(() => {
    //유저 아이디가 읽힌 후에 useQuer호출(refetch()로).
    if (userId) {
      userRefetch();
    }
    //기업 아이디가 읽힌 후에 useQuer호출(refetch()로).
    if (comUserId) {
      companyRefetch();
    }
  }, [router.query]);

  console.log('🔥 userData : ', userData);

  return (
    <div style={{ padding: '0 20px' }}>
      {userId && (
        <>
          <ProfileWrapper>
            <InfoBox>
              {userData?.data?.member?.profileImageUrl! ? (
                <Avatar>
                  <Image
                    src={userData?.data?.member?.profileImageUrl!}
                    alt="avatar"
                    layout="fill"
                    priority={true}
                    unoptimized={true}
                    objectFit="cover"
                  />
                </Avatar>
              ) : (
                <NoAvatar />
              )}
            </InfoBox>
            <Contents>
              <li>
                <label className="label">아이디</label>
                <span>{userData?.data?.member?.id}</span>
              </li>
              <li>
                <label className="label">이름</label>
                <span>{userData?.data?.member?.name}</span>
              </li>
              <li>
                <label className="label">전화번호</label>
                <span>{hyphenFn(userData?.data?.member?.phone!)}</span>
              </li>
              <li>
                <label className="label">가입날짜</label>
                <span>
                  {adminDateFomat(userData?.data?.member?.createdAt!)}
                </span>
              </li>
            </Contents>
          </ProfileWrapper>
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
        </>
      )}
      {comUserId && (
        <>
          <ProfileWrapper>
            <InfoBox>
              {companyData?.data?.member?.companyMemberAdditionalInfo
                ?.companyLogoImageUrl ? (
                <Avatar>
                  <Image
                    src={
                      companyData?.data?.member?.companyMemberAdditionalInfo
                        ?.companyLogoImageUrl!
                    }
                    alt="avatar"
                    layout="fill"
                    priority={true}
                    unoptimized={true}
                    objectFit="cover"
                  />
                </Avatar>
              ) : (
                <NoAvatar />
              )}
            </InfoBox>
            <Contents>
              <li>
                <label className="label">기업명</label>
                <span>
                  {
                    companyData?.data?.member?.companyMemberAdditionalInfo
                      ?.companyName
                  }
                </span>
              </li>
              <li>
                <label className="label">아이디</label>
                <span>{companyData?.data?.member?.id}</span>
              </li>
              <li>
                <label className="label">담당자</label>
                <span>{companyData?.data?.member?.name}</span>
              </li>
              <li>
                <label className="label">이메일</label>
                <span>
                  {
                    companyData?.data?.member?.companyMemberAdditionalInfo
                      ?.managerEmail
                  }
                </span>
              </li>
              <li>
                <label className="label">전화번호</label>
                <span>{hyphenFn(companyData?.data?.member?.phone!)}</span>
              </li>
              <li>
                <label className="label">주소</label>
                {/* <InputBox
              type="text"
              readOnly
              value={
                CompanyData?.data?.member?.companyMemberAdditionalInfo
                  ?.companyDetailAddress
              }
              className="address"
              /> */}
                <span>
                  {`${companyData?.data?.member?.companyMemberAdditionalInfo?.companyAddress} ${companyData?.data?.member?.companyMemberAdditionalInfo?.companyDetailAddress}`}
                </span>
              </li>
              <li>
                <label className="comapny label">사업자 등록증</label>
                <div className="business">
                  {companyData?.data?.member?.businessRegistrationFiles?.map(
                    (item, index) => (
                      <span className="businessName" key={index}>
                        <Atag href={item?.url} download={item?.originalName}>
                          <Image
                            src={FileImg}
                            alt="file-img"
                            width={16}
                            height={16}
                          />

                          <BusinessName>{item.originalName}</BusinessName>
                        </Atag>
                        {/* <button
                      className="businessBtn"
                      onClick={() => {
                        setFileIdx(item?.businessRegistrationFileIdx);
                        modalDeleteFileBtnControll();
                      }}
                    >
                      삭제
                    </button> */}
                      </span>
                    ),
                  )}
                </div>
              </li>
            </Contents>
          </ProfileWrapper>
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
        </>
      )}
      {userId !== undefined && comUserId !== undefined && (
        <span>존재하지 않는 회원입니다.</span>
      )}
    </div>
  );
};

export default UserProfile;

const InfoBox = styled.div`
  width: 100%;
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
  min-width: 510px;
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

const Contents = styled.ul`
  min-width: 400px;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #000000;
  list-style: none;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  li {
    display: flex;
    gap: 34px;
    :not(:last-child) {
      margin-bottom: 14px;
    }
  }
  .label {
    width: 59px;
  }
  .comapny {
    width: 92px;
  }
  .businessName {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    /* identical to box height, or 24px */
    color: #747780;
    border: 1px solid #a6a9b0;
    border-radius: 2px;
    padding: 4px 10px 4px 10px;
    gap: 8px;
  }
`;

const ProfileWrapper = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
`;

const BusinessName = styled.p`
  width: 200px;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Atag = styled.a`
  display: flex;
  align-items: center;
  color: #222222;
  gap: 10px;
  cursor: pointer;
  :hover {
    color: #5a2dc9;
  }
`;

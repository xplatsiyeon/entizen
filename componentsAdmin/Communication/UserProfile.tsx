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

const UserProfile = (memberIdx: { memberIdx: number }) => {
  const router = useRouter();

  // 대문자로 읽으면 안읽어짐 그래서 하단처럼 사용하면 됨
  const userId = router.query['USER'];
  const comUserId = router.query['COMPANY'];
  // console.log(router.query);
  // console.log('dasdasd', router.asPath);

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

  return (
    <>
      <InfoBox>
        {userData?.data?.member?.profileImageUrl! ? (
          <Contents>
            <Avatar>
              <Image
                src={userData?.data?.member?.profileImageUrl!}
                alt="avatar"
                layout="fill"
                objectFit="cover"
              />
            </Avatar>
            <>
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
                <span>{hyphenFn(userData?.data?.member?.phone)}</span>
              </li>
              <li>
                <label className="label">가입날짜</label>
                <span>{adminDateFomat(userData?.data?.member?.createdAt)}</span>
              </li>
            </>
          </Contents>
        ) : (
          <NoAvatar />
        )}
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
  );
};

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

const Contents = styled.ul`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #000000;
  list-style: none;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  border: 1px solid red;
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
`;

import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import Logos from 'public/images/entizenLogo.png';
import Ring from 'public/images/guide-bell.svg';
import OnRing from 'public/images/bell-outline.svg';
import Hamburger from 'public/images/list-bar.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import { TroubleshootOutlined } from '@mui/icons-material';

type Props = {};

type GetUnread = {
  isSuccess: boolean;
  data: {
    wasReadQuotation: boolean;
    wasReadAfterSalesService: boolean;
    wasReadProject: boolean;
    wasReadChatting: boolean;
    wasReadAlert: boolean;
  };
};

const Header = (props: Props) => {
  const router = useRouter();
  const userID = sessionStorage.getItem('USER_ID');

  // 알람 조회
  // alerts/histories/unread
  const {
    data: historyUnread,
    isLoading: historyIsLoading,
    isError: historyIIsError,
    refetch: historyIsRefetch,
  } = useQuery<GetUnread>(
    'historyUnread',
    () => isTokenGetApi(`/alerts/histories/unread`),
    {
      enabled: userID !== null ? true : false,
    },
  );

  const allAlert = historyUnread?.data;

  return (
    <HeadWrapper>
      <LogoBox>
        <Image
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          layout="intrinsic"
          src={Logos}
          alt="logo"
        />
      </LogoBox>
      <IconWrapper>
        <IconBox>
          {allAlert?.wasReadAlert === true ? (
            <Image src={Ring} alt="alarmOff" />
          ) : (
            <Image src={OnRing} alt="alarmOn" />
          )}
        </IconBox>
        <IconBox>
          <Image src={Hamburger} alt="listIcon" />
        </IconBox>
      </IconWrapper>
    </HeadWrapper>
    //  onClick={() => router.push("/")}
  );
};

const HeadWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const LogoBox = styled.div`
  margin-top: 12pt;
  margin-bottom: 12.015pt;
  display: flex;
  align-items: center;
`;
const IconBox = styled.div`
  margin-top: 9pt;
  margin-bottom: 9pt;
  :first-of-type {
    margin-right: 9pt;
  }
`;
const IconWrapper = styled.div`
  display: flex;
`;

export default Header;

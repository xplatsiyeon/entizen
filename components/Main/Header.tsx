import styled from '@emotion/styled';
import React from 'react';
import Logos from 'public/images/entizenLogo.png';
import Ring from 'public/images/guide-bell.svg';
import OnRing from 'public/images/bell-outline.svg';
import Hamburger from 'public/images/list-bar.svg';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import { Alerts, AlertsResponse } from 'types/alerts';
import { AxiosError } from 'axios';

type Props = {};

const Header = (props: Props) => {
  const userID = sessionStorage.getItem('USER_ID');

  // 알람 조회
  // v1/alerts/unread-points
  const {
    data: historyUnread,
    isLoading: historyIsLoading,
    isError: historyIIsError,
    refetch: historyIsRefetch,
  } = useQuery<AlertsResponse, AxiosError, Alerts>(
    'historyUnread',
    () => isTokenGetApi(`/v1/alerts/unread-points`),
    {
      enabled: userID !== null ? true : false,
      select(res) {
        return res.data;
      },
    },
  );

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
          {historyUnread?.wasReadAlertBell === false ? (
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

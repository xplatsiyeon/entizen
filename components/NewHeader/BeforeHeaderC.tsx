import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import colors from 'styles/colors';
import Logos from 'public/images/EntizenHeaderLogoSvg.svg';
import LogosLS from 'public/images/EntizenHeaderLogoSvgLS.svg';
import Chat from 'public/images/chat.png';
//알람 꺼짐
import BellOff from 'public/images/bell.png';
// 알람 켜짐
import BellOn from 'public/images/Bell_outline.png';
import Frame from 'public/images/Frame.png';
import SubMenuBar from 'components/SubMenuBar';
import ProfileUp from 'public/images/profile-up.png';
import ProfileDown from 'public/images/profile-down.png';
import { useRouter } from 'next/router';
import { handleLogoutOnClickModalClick } from 'api/logout';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import { useDispatch } from 'react-redux';
import { alarmNumberSliceAction } from 'store/alarmNumberSlice';
import { selectAction } from 'store/loginTypeSlice';
import userAddressHooks from 'hooks/userAddressHooks';
import { Alerts, AlertsResponse } from 'types/alerts';
import { AxiosError } from 'axios';
import { quotationAction } from 'store/quotationSlice';

type Props = {
  num?: number;
  now?: string;
  sub?: string;
};

const WebHeader = ({ num, now, sub }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userID = sessionStorage.getItem('USER_ID');
  const [linklist, setLinklist] = useState<boolean>(Boolean(sub));
  const [isHovering, setIsHovered] = useState(false);
  const [keyword, setKeyword, results] = userAddressHooks();

  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  // 알람 조회
  // v1/alerts/unread-points
  const {
    data: historyUnread,
    isLoading: historyIsLoading,
    isError: historyIIsError,
    refetch: historyIsRefetch,
  } = useQuery<AlertsResponse, AxiosError, Alerts>(
    'v1/alerts',
    () => isTokenGetApi(`/v1/alerts/unread-points`),
    {
      enabled: userID !== null ? true : false,
      select(res) {
        return res.data;
      },
    },
  );

  const logout = () => {
    handleLogoutOnClickModalClick()
      .then((res) => router.push('/'))
      .catch((error) => alert(error));
  };
  const handleLink = (st: string) => {
    if (userID) {
      router.push(`${st}`);
    } else {
      router.push('/signin');
    }
  };
  const routeSignUp = () => {
    dispatch(selectAction.reset());
    router.push('/signUp/Terms');
  };

  const allAlert = (type: string) => {
    if (historyUnread) {
      const {
        wasReadUserQuotation,
        wasReadUserProject,
        wasReadUserAfterSalesService,
        wasReadUserChargingStation,
        wasReadChatting,
      } = historyUnread;

      const mypageAlert = [
        wasReadUserQuotation,
        wasReadUserProject,
        wasReadUserAfterSalesService,
        wasReadUserChargingStation,
      ].every((alert) => alert === true);
      console.log('🔥 mypageAlert : ', mypageAlert);

      switch (type) {
        case 'mypage':
          return mypageAlert;
        case 'chatting':
          return wasReadChatting;
      }
    } else {
      return true;
    }
  };

  useEffect(() => {}, [linklist]);

  // console.log('🔥 historyUnread : ', historyUnread);

  return (
    <>
      <Wrapper>
        <MainLink>
          <Inner>
            <Box1>
              <LogoBox>
                <div>
                  <Image
                    src={LogosLS}
                    alt="logo"
                    layout="intrinsic"
                    onClick={() => {
                      router.push('/new/applyAd');
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </LogoBox>
            </Box1>
          </Inner>
        </MainLink>
        {/*========================== 서브 메뉴 ==================================== */}
        {linklist ? (
          <SubMenuBar type={String(sub)} num={num} now={now} />
        ) : null}
      </Wrapper>
    </>
  );
};

export default WebHeader;

const Wrapper = styled.div`
  position: fixed;
  z-index: 999;
  width: 100%;
  border-bottom: 0.75pt solid #e9eaee;
  background: #ffff;
  box-sizing: border-box;
`;
const MainLink = styled.div`
  width: 100%;
  border-bottom: 1px solid #e9eaee;
  box-sizing: border-box;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 900pt;
  height: 100%;
`;

const Box1 = styled.div`
  display: flex;
  height: 70pt;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 54pt;

  @media (max-width: 899.25pt) {
    margin-left: 20px;
  }
`;

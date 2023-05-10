import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import colors from 'styles/colors';
import Logos from 'public/images/EntizenHeaderLogoSvg.svg';
import Chat from 'public/images/chat.png';
// 알림 꺼짐
import BellOff from 'public/images/bell.png';
// 알림 켜짐
import BellOn from 'public/images/Bell_outline.png';
import CompanySubMenuBar from 'componentsWeb/CompanySubMenuBar';
import Frame from 'public/images/Frame.png';
import ProfileUp from 'public/images/profile-up.png';
import ProfileDown from 'public/images/profile-down.png';
import { useRouter } from 'next/router';
import { handleLogoutOnClickModalClick } from 'api/logout';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import { useDispatch } from 'react-redux';
import { alarmNumberSliceAction } from 'store/alarmNumberSlice';
import { Alerts, AlertsResponse } from 'types/alerts';
import { AxiosError } from 'axios';
import { headerAction } from 'storeCompany/headerSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

type Props = {
  num?: number;
  now?: string;
  setTabNumber?: React.Dispatch<React.SetStateAction<number>>;
  tabNumber?: number;
  componentId?: number;
  openSubLink?: boolean;
  getComponentId?: number;
  setOpenSubLink: React.Dispatch<React.SetStateAction<boolean>>;
  height?: boolean;
};

type Menu = {
  id: number;
  type: string;
  menu: string;
  linkUrl: string;
  alert?: boolean;
};

const WebBuyerHeader = ({
  setTabNumber,
  num,
  now,
  openSubLink,
  setOpenSubLink,
  height,
}: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isUser = sessionStorage.getItem('USER_ID');
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  const { tab, type } = useSelector((state: RootState) => state.headerSlice);
  console.log('🔥 tab : ', tab);
  console.log('🔥 type : ', type);

  // 알람 조회
  // /v1/alerts/unread-points
  const {
    data: historyUnread,
    isLoading: historyIsLoading,
    isError: historyIIsError,
    refetch: historyIsRefetch,
  } = useQuery<AlertsResponse, AxiosError, Alerts>(
    'historyUnread',
    () => isTokenGetApi(`/v1/alerts/unread-points`),
    {
      enabled: isUser !== null ? true : false,
      select(res) {
        return res.data;
      },
    },
  );

  // 로그 아웃
  const logout = () => {
    handleLogoutOnClickModalClick()
      .then((res) => router.push('/'))
      .catch((error) => alert(error));
  };

  // 메뉴 클릭
  const onClickMenu = ({ type, id, linkUrl }: Menu) => {
    router.push(linkUrl);
    dispatch(headerAction.setTabIdx(0));
    dispatch(headerAction.setTab(id));
    dispatch(headerAction.setType(type));

    setOpenSubLink(true);
  };

  // false : on / true : off
  const allAlert = (type: string) => {
    if (historyUnread) {
      const {
        wasReadCompanyReceivedQuotation,
        wasReadCompanySentQuotation,
        wasReadCompanyQuotationHistory,
        wasReadCompanyInProgressProject,
        wasReadCompanyCompletedProject,
        wasReadCompanyNewAfterSalesService,
        wasReadCompanyAfterSalesServiceHistory,
        wasReadChatting,
      } = historyUnread;

      const quotationAlert = [
        wasReadCompanyReceivedQuotation,
        wasReadCompanySentQuotation,
        wasReadCompanyQuotationHistory,
      ].every((alert) => alert === true);

      const projectAlert = [
        wasReadCompanyInProgressProject,
        wasReadCompanyCompletedProject,
      ].every((alert) => alert === true);

      const asAlert = [
        wasReadCompanyNewAfterSalesService,
        wasReadCompanyAfterSalesServiceHistory,
      ].every((alert) => alert === true);

      switch (type) {
        case 'quotation':
          return quotationAlert;
        case 'project':
          return projectAlert;
        case 'chatting':
          return wasReadChatting;
        case 'asAlert':
          return asAlert;
      }
    } else {
      return true;
    }
  };
  const HeaderMenu: Menu[] = [
    {
      id: 0,
      type: 'estimate',
      menu: '내 견적',
      linkUrl: '/company/quotation',
      alert: allAlert('quotation'),
    },
    {
      id: 1,
      type: 'communication',
      menu: '소통하기',
      linkUrl: '/company/chatting',
      alert: allAlert('chatting'),
    },
    {
      id: 2,
      type: 'as',
      menu: 'A/S',
      linkUrl: '/company/as',
      alert: allAlert('asAlert'),
    },
    {
      id: 3,
      type: 'myProject',
      menu: '내 프로젝트',
      linkUrl: '/company/mypage',
      alert: allAlert('projectAlert'),
    },
  ];

  useEffect(() => {
    if (router.pathname === '/company/faq') {
      dispatch(headerAction.setTab(5));
    }
  }, []);

  return (
    <>
      <Wrapper height={height}>
        <MainLink>
          <Inner>
            <Box1>
              <LogoBox>
                <div>
                  <Image
                    src={Logos}
                    alt="logo"
                    layout="intrinsic"
                    onClick={() => {
                      router.push('/');
                      dispatch(headerAction.reset());
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </LogoBox>
              {/* 기업 헤더 메뉴 */}
              {HeaderMenu.map((el, idx) => {
                return (
                  <DivBox
                    key={idx}
                    tab={tab!}
                    index={idx}
                    onClick={() => {
                      onClickMenu(el);
                    }}
                  >
                    {el.menu}
                    {isUser && el.alert === false && <BellOnText />}
                  </DivBox>
                );
              })}
            </Box1>
            <Box2>
              {isUser ? (
                <>
                  <DivBox2>
                    <IconBox>
                      <Image
                        src={Chat}
                        alt="question"
                        onClick={() => router.push('/company/faq')}
                      />
                    </IconBox>
                    <IconBox>
                      {historyUnread?.wasReadAlertBell === true ? (
                        <Image
                          src={BellOff}
                          alt="alarmIcon"
                          onClick={() => {
                            router.push('/alarm');
                            dispatch(
                              alarmNumberSliceAction.setalarmNumberSlice(0),
                            );
                          }}
                        />
                      ) : (
                        <Image
                          src={BellOn}
                          alt="alarmIcon"
                          onClick={() => {
                            router.push('/alarm');
                            dispatch(
                              alarmNumberSliceAction.setalarmNumberSlice(0),
                            );
                          }}
                        />
                      )}
                    </IconBox>
                    <ProfileBox
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                    >
                      <IconBox>
                        <Image src={Frame} alt="frame" />
                      </IconBox>
                      {isHovering ? (
                        <UpDown>
                          <ProfileMenu>
                            <li onClick={() => router.push('/company/profile')}>
                              프로필 변경
                            </li>
                            <li onClick={() => router.push('/setting')}>
                              설정
                            </li>
                            <li onClick={logout}>로그아웃</li>
                          </ProfileMenu>
                          <Image src={ProfileUp} alt="up" layout="fill" />
                        </UpDown>
                      ) : (
                        <UpDown>
                          <Image src={ProfileDown} alt="down" layout="fill" />
                        </UpDown>
                      )}
                    </ProfileBox>
                  </DivBox2>
                </>
              ) : (
                <>
                  <DivBox2>
                    <IconBox>
                      <Image
                        src={Chat}
                        alt="question"
                        onClick={() =>
                          router.push({
                            pathname: '/faq',
                            query: { direct: true },
                          })
                        }
                      />
                    </IconBox>
                    <IconBox>
                      <Image
                        src={BellOn}
                        alt="alarmIcon"
                        onClick={() => router.push('/signin')}
                      />
                    </IconBox>
                  </DivBox2>
                  <DivBox2>
                    <Link href="/signin">
                      <a>로그인</a>
                    </Link>
                  </DivBox2>
                  <DivBox2>
                    <Link href="/signUp/Terms">
                      <a>회원가입</a>
                    </Link>
                  </DivBox2>
                </>
              )}
            </Box2>
          </Inner>
        </MainLink>
        {/* ================== 서브 메뉴 바 ===================== */}
        {type !== 'communication' && setTabNumber ? (
          <CompanySubMenuBar
            type={type}
            num={num!}
            now={now!}
            openSubLink={Boolean(openSubLink)}
          />
        ) : null}
      </Wrapper>
    </>
  );
};

export default WebBuyerHeader;

const Wrapper = styled.div<{ height?: boolean }>`
  position: relative;
  width: 100%;
  height: ${({ height }) => (height ? '70.5pt' : 'auto')};
  //margin-bottom: 45.75pt;
  border-bottom: 1px solid #e9eaee;
  background: #ffff;
  box-sizing: border-box;
  @media (max-width: 899.25pt) {
    display: none;
  }
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
  //max-height: 81pt;
`;

const Box1 = styled.div`
  display: flex;
  height: 70pt;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 54pt;
`;

const IconBox = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  margin-left: 15pt;
  width: 21pt;
  height: 21pt;
  cursor: pointer;

  &:nth-last-of-type(1) {
    margin-right: 0;
  }
`;
const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 100%;
`;
const UpDown = styled.div`
  position: relative;
  width: 9pt;
  height: 9pt;
`;
const ProfileMenu = styled.ul`
  position: absolute;
  top: 20pt;
  right: -30pt;
  z-index: 10;
  width: 86.25pt;
  background: ${colors.lightWhite};
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  padding: 15pt 0;
  text-align: center;
  & > li {
    :not(:nth-of-type(1)) {
      margin-top: 18pt;
    }
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
`;

const DivBox = styled.div<{ tab: number; index: number }>`
  margin-right: 30pt;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 13.5pt;
  line-height: 13.5pt;
  font-family: 'Spoqa Han Sans Neo';
  color: ${({ tab, index }) => (tab === index ? colors.main : colors.main2)};
  text-decoration: none;
  a {
    font-weight: bold;
    font-size: 13.5pt;
    line-height: 13.5pt;
    font-family: 'Spoqa Han Sans Neo';
    color: ${colors.main2};
    text-decoration: none;
  }
`;

const Box2 = styled.div`
  display: flex;
  height: 70pt;
`;
const DivBox2 = styled.div`
  margin-right: 18pt;
  display: flex;
  align-items: center;
  a {
    font-weight: normal;
    font-size: 10.5pt;
    line-height: 12pt;
    font-family: 'Spoqa Han Sans Neo';
    color: ${colors.main2};
    text-decoration: none;
  }
`;

const BellOnText = styled.div`
  background-color: #5221cb;
  width: 4.5pt;
  height: 4.5pt;
  border-radius: 50%;
  margin-bottom: 19pt;
  margin-left: 4.5pt;
`;

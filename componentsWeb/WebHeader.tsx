import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import colors from 'styles/colors';
// import Logos from 'public/images/webLogo.png';
import Logos from 'public/images/EntizenHeaderLogoSvg.svg';
import Chat from 'public/images/chat.png';
//알람 꺼짐
import Bell from 'public/images/bell.png';
// 알람 켜짐
import BellOutline from 'public/images/Bell_outline.png';
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

type Props = {
  num?: number;
  now?: string;
  sub?: string;
};

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

const WebHeader = ({ num, now, sub }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isUser = sessionStorage.getItem('USER_ID');
  const [linklist, setLinklist] = useState<boolean>(Boolean(sub));
  const [type, setType] = useState<string>('');
  const [isHovering, setIsHovered] = useState(false);
  const [keyword, setKeyword, results] = userAddressHooks();

  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
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
      enabled: isUser !== null ? true : false,
    },
  );

  const allAlert = historyUnread?.data;

  const logout = () => {
    handleLogoutOnClickModalClick()
      .then((res) => router.push('/'))
      .catch((error) => alert(error));
  };
  const handleLink = (st: string) => {
    if (isUser) {
      router.push(`${st}`);
    } else {
      router.push('/signin');
    }
  };
  const routeSignUp = () => {
    dispatch(selectAction.reset());
    router.push('/signUp/Terms');
  };

  useEffect(() => {}, [linklist]);

  return (
    <>
      <Wrapper>
        <MainLink>
          <Inner>
            <Box1>
              <LogoBox>
                <div>
                  <Image
                    src={Logos}
                    alt="logo"
                    layout="intrinsic"
                    onClick={async () => {
                      await router.push('/');
                      setKeyword('');
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </LogoBox>
              <DivBox onClick={() => handleLink('/quotation/request')}>
                간편견적
              </DivBox>
              <DivBox
                onClick={() => {
                  handleLink('/guide');
                  setLinklist(true);
                }}
              >
                가이드
              </DivBox>
              <DivBox onClick={() => handleLink('/chatting')}>
                소통하기
                {isUser && allAlert?.wasReadChatting === false && (
                  <BellOnText />
                )}
              </DivBox>
              <DivBox
                className="mypage"
                now={now}
                onClick={() => {
                  setLinklist(true);
                  setType('mypage');
                }}
              >
                마이페이지
                {isUser && allAlert?.wasReadProject === false && <BellOnText />}
              </DivBox>
            </Box1>
            <Box2>
              {/* <DivBox2><input type="text" placeholder="서비스를 검색해보세요" /> </DivBox2> */}

              {isUser ? (
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
                      {allAlert?.wasReadAlert === true ? (
                        <Image
                          src={Bell}
                          alt="bell off"
                          // onClick={() => router.push('/alarm?id=0')}
                          onClick={() => {
                            router.push('/alarm');
                            dispatch(
                              alarmNumberSliceAction.setalarmNumberSlice(0),
                            );
                          }}
                        />
                      ) : (
                        <Image
                          src={BellOutline}
                          alt="bell on"
                          // onClick={() => router.push('/alarm?id=0')}
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
                            <li onClick={() => router.push('/profile/editing')}>
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
                        src={Bell}
                        alt="alram"
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
                    <span onClick={routeSignUp}>
                      <a>회원가입</a>
                    </span>
                  </DivBox2>
                </>
              )}
            </Box2>
          </Inner>
        </MainLink>
        {/*========================== 서브 메뉴 ==================================== */}
        {linklist ? (
          <SubMenuBar type={type ? type : String(sub)} num={num} now={now} />
        ) : null}
      </Wrapper>
    </>
  );
};

export default WebHeader;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  //margin-bottom: 45.75pt;
  border-bottom: 0.75pt solid #e9eaee;
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

const DivBox = styled.div<{ now?: string }>`
  margin-right: 30pt;
  display: flex;
  align-items: center;
  cursor: pointer;

  font-weight: bold;
  font-size: 13.5pt;
  line-height: 13.5pt;
  font-family: 'Spoqa Han Sans Neo';
  color: ${colors.main2};
  text-decoration: none;
  a {
    font-weight: bold;
    font-size: 13.5pt;
    line-height: 13.5pt;
    font-family: 'Spoqa Han Sans Neo';
    color: ${colors.main2};
    text-decoration: none;
  }
  &.mypage {
    color: ${({ now }) => (now === 'mypage' ? colors.main1 : colors.main2)};
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
  span {
    cursor: pointer;
  }

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

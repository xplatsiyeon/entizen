import { Fragment, useState } from 'react';
import myEstimateHeaderStyles from './header.module.scss';
import { useMediaQuery } from 'react-responsive';
import { Drawer } from '@mui/material';
import HamburgerBar from './HamburgerBar';
import styled from '@emotion/styled';
import Image from 'next/image';
import colors from 'styles/colors';
import Logos from 'public/images/EntizenHeaderLogoSvg.svg';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { useRouter } from 'next/router';

const menuItems = [
  {
    title: '내 견적서',
    link: '/new/myEstimate',
  },
  {
    title: '한전불입금/충전요금',
    link: '/new/checkRate',
  },
  {
    title: '가격차이',
    link: '/new/funcSystemComparison',
  },
  {
    title: '업체 신뢰도',
    link: '/new/reliability',
  },
];

export const MyEstimateHeader = ({ useHeaderLogo = true }) => {
  const router = useRouter();
  const mobile = useMediaQuery({ query: '(max-width:767px)' });
  const [state, setState] = useState({ right: false });
  const userID = sessionStorage.getItem('USER_ID');

  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };
  const handleLink = (st: string) => {
    if (userID) {
      router.push(`${st}`);
    } else {
      router.push('/signin');
    }
  };

  return (
    <div className={myEstimateHeaderStyles.headerWrap}>
      {mobile ? (
        <>
          {useHeaderLogo ? (
            <div
              className={myEstimateHeaderStyles.icon}
              onClick={() => router.push('/new/applyAd')}
            >
              <img
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                src="/images/myEstimate/CaretLeft.svg"
                alt="left"
              />
            </div>
          ) : (
            <div>
              <ArrowBackIosIcon
                style={{ width: '24px', height: '24px' }}
                onClick={() => {
                  window.history.back();
                }}
              />
            </div>
          )}
          <div className={myEstimateHeaderStyles.iconWrap}>
            {(['right'] as const).map((anchor) => (
              <Fragment key={anchor}>
                <div
                  className={myEstimateHeaderStyles.faqBox}
                  onClick={() => {
                    router.push('/new/faq');
                  }}
                >
                  <div>
                    <div>자주 묻는 질문</div>
                  </div>
                </div>
                <div onClick={toggleDrawer(anchor, true)}>
                  <div className={myEstimateHeaderStyles.iconBox}>
                    <img src="/images/list-bar.svg" alt="listIcon"></img>
                  </div>
                </div>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  // PaperProps={{ style: { borderRadius: '20pt 20pt 0 0' } }}
                >
                  <HamburgerBar
                    menu={menuItems}
                    anchor={anchor}
                    toggleDrawer={toggleDrawer}
                    setState={setState}
                    state={state}
                  />
                </Drawer>
              </Fragment>
            ))}
          </div>
        </>
      ) : (
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
                      await router.push('/new/applyAd');
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </LogoBox>
              {userID && (
                <>
                  <Box2>
                    {menuItems.map((item) => (
                      <DivBox
                        clicked={router.pathname.includes(item.link)}
                        onClick={() => {
                          handleLink(item.link);
                        }}
                      >
                        {item.title}
                      </DivBox>
                    ))}
                  </Box2>
                  <DivBox2
                    onClick={() => {
                      handleLink('/new/faq');
                    }}
                  >
                    자주 묻는 질문
                  </DivBox2>
                </>
              )}
            </Box1>
          </Inner>
        </MainLink>
      )}
    </div>
  );
};

const MainLink = styled.div`
  width: 100%;
  // border-bottom: 1px solid #e9eaee;
  box-sizing: border-box;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 3%;
`;

const Box1 = styled.div`
  display: flex;
  height: 70pt;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  width: -webkit-fill-available;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
`;

const DivBox = styled.div<{ now?: string; clicked: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 13.5pt;
  line-height: 13.5pt;
  font-family: 'Spoqa Han Sans Neo';
  color: ${colors.main2};
  text-decoration: none;
  color: ${({ clicked }) => (clicked ? colors.main1 : colors.main2)};
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
  width: 50%;
  display: flex;
  height: 70pt;
  justify-content: space-between;

  @media screen and (max-width: 1024px) {
    width: 60%;
  }
`;
const DivBox2 = styled.div`
  display: flex;
  height: 70pt;
  align-items: center;

  width: 7.75rem;
  height: 2.25rem;
  // padding: 0.75rem 1rem;
  justify-content: center;

  border-radius: 1.8125rem;
  border: 1px solid #e2e5ed;
  background: var(--Sub3, #fff);

  /* shadow */
  box-shadow: 0px 0px 10px 0px rgba(137, 163, 201, 0.2);

  color: #4e5055;
  font-family: Spoqa Han Sans Neo;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1rem; /* 100% */
  letter-spacing: -0.02rem;
`;

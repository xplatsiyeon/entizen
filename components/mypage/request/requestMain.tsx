import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useState } from 'react';
import Nut from 'public/images/Nut.svg';
import colors from 'styles/colors';
import { useRouter } from 'next/router';
import BottomNavigation from 'components/BottomNavigation';
import { useRef } from 'react';
import AsIndex from '../as';
import Estimate from './estimate';
import MyProjects from '../projects/MyProjects';
import Charging from '../place/Charging';
import { UserInfo } from 'pages/mypage';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';
import { useMediaQuery } from 'react-responsive';

interface Components {
  [key: number]: JSX.Element;
}

type props = {
  page?: number | undefined;
};

const RequestMain = (props: props) => {
  const { page } = props;
  const route = useRouter();

  {
    /* 탭중 현재 탭*/
  }
  const [tabNumber, setTabNumber] = useState<number>(page!);
  const [on, setOn] = useState<boolean>(true);

  const TabType: string[] = ['내 견적서', '내 프로젝트', 'A/S', '내 충전소'];

  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  const myPageIndex = useRef<HTMLDivElement>(null);
  const components: Components = {
    0: <Estimate listUp={true} />,
    //  1: <MyProjects listUp={true} />,
    //  2: <AsIndex listUp={true} />,
    //  3: <Charging listUp={true} />,
  };

  // 유저 정보 API
  const {
    data: userData,
    isError: userError,
    isLoading: userLoading,
  } = useQuery<UserInfo>('user-info', () => isTokenGetApi('/members/info'), {
    // enabled: false
  });

  if (userLoading) {
    return <Loader />;
  }
  if (userError) {
    // console.log('유저 정보 에러');
  }

  const handleList = (n: number) => {
    if (n === 0) {
      const target = myPageIndex.current?.querySelector('.list') as HTMLElement;
      if (target) target.classList.remove('on');
      setTimeout(() => {
        route.push({
          pathname: '/mypage',
          query: { id: n },
        });
      }, 100);
    } else {
      setTabNumber(n);
      route.push({
        pathname: '/mypage',
        query: { id: n },
      });
    }
  };

  return (
    <Wrapper
      ref={myPageIndex}
      onClick={() => {
        // if(myPageIndex.current)myPageIndex.current.style.height='auto'}}>
        if (myPageIndex.current && !on)
          myPageIndex.current.style.height = 'auto';
      }}
    >
      <Header>
        <span>
          <h1>{`${userData?.name}님,`}</h1>
          <h2>안녕하세요!</h2>
        </span>
        <div className="img" onClick={() => route.push('/setting')}>
          <Image src={Nut} alt="nut-icon" />
        </div>
      </Header>
      <Body>
        <span
          className="profile-icon"
          onClick={() => route.push('profile/editing')}
        >
          프로필 변경
        </span>
        <Line />
        <TabContainer>
          {TabType.map((tab, index) => (
            <React.Fragment key={index}>
              <Tab>
                <Wrap>
                  <TabItem
                    key={index}
                    tab={tabNumber?.toString()}
                    index={index.toString()}
                    onClick={() => {
                      handleList(index);
                    }}
                  >
                    {tab}
                  </TabItem>
                  <Dot tab={tabNumber?.toString()} index={index.toString()} />
                </Wrap>
                {tabNumber === 0 ? (
                  <List className={`list ${tabNumber === index && 'on'}`}>
                    {components[tabNumber]}
                  </List>
                ) : null}
              </Tab>
            </React.Fragment>
          ))}
        </TabContainer>
        {/* 탭 */}
      </Body>
      {mobile && <BottomNavigation />}
    </Wrapper>
  );
};

export default RequestMain;

const Wrapper = styled.div`
  position: relative;
  width: 255pt;
  height: 424.5pt;
  overflow-y: scroll;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 42pt 28.5pt 0 28.5pt;
  & h1 {
    font-weight: 700;
    font-size: 21pt;
    line-height: 27pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  & h2 {
    font-weight: 500;
    font-size: 21pt;
    line-height: 27pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .img {
    /* 이미지 주변 클릭 범위 5px정도 늘려줌 */
    width: 22.5pt;
    height: 22.5pt;
    text-align: end;
    cursor: pointer;
  }
`;
const Body = styled.div`
  padding-top: 21pt;
  .profile-icon {
    margin-left: 28pt;
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main};
    border: 0.75pt solid ${colors.main};
    border-radius: 12pt;
    padding: 6pt 9pt;
    cursor: pointer;
  }
`;
const Line = styled.div`
  width: calc(100% - 27pt);
  margin: 25.5pt auto 45pt;
  border-bottom: 3pt solid ${colors.gray3};
`;
const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 27pt;
  margin: 20pt 0;
`;

const Tab = styled.div``;

const Wrap = styled.div`
  display: flex;
  margin-bottom: 18pt;
  flex-direction: row;
  align-items: center;
  height: 15pt;
`;
const TabItem = styled.span<{ tab: string; index: string }>`
  //padding-top: 21pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${({ tab, index }) =>
    tab === index ? colors.main : colors.lightGray};
  cursor: pointer;
`;
const Dot = styled.div<{ tab: string; index: string }>`
  width: 3pt;
  height: 3pt;
  border-radius: 50%;
  margin: 0 9pt;
  background-color: ${({ tab, index }) => tab === index && `${colors.main}`};
`;
const List = styled.div`
  height: 0;
  overflow: hidden;
  &.on {
    height: auto;
  }
`;

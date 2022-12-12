import styled from '@emotion/styled';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Nut from 'public/images/Nut.svg';
import colors from 'styles/colors';
import Estimate from 'components/mypage/request/estimate';
import { useRouter } from 'next/router';
import AsIndex from 'components/mypage/as';
import BottomNavigation from 'components/BottomNavigation';
import { isTokenGetApi } from 'api';
import { useQuery } from 'react-query';
import MyProjects from 'components/mypage/projects/MyProjects';
import Loader from 'components/Loader';
import Charging from 'components/mypage/place/Charging';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import UserRightMenu from 'components/UserRightMenu';

export interface UserInfo {
  isSuccess: boolean;
  id: string;
  name: string;
  phone: string;
}
interface Components {
  [key: number]: JSX.Element;
}
const TAG = 'page/mypage/index.tsx';
const Request = () => {
  const route = useRouter();

  const [tabNumber, setTabNumber] = useState<number>();

  useEffect(() => {
    if (route.query.id !== undefined) {
      setTabNumber(Number(route.query.id));
    } else if (!route.query.id && route.pathname === '/mypage') {
      setTabNumber(0);
    }
  }, [route.query.id]);

  const TabType: string[] = ['내 견적서', '내 프로젝트', 'A/S', '내 충전소'];
  const components: Components = {
    0: <Estimate />,
    1: <MyProjects />,
    2: <AsIndex />,
    3: <Charging />,
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
    console.log('유저 정보 에러');
  }

  return (
    <WebBody>
      {/* 피그마 마이페이지/A/S/4. 마이페이지 링크바 A/S 부분을 표시하기 위해서 num={2}를 넘긴다. (내 견적서는 0).
          const components: Components = {
          0: <WebEstimate/>,  
          2: <AsIndex />,
          }; num, page는 이 부분의 인덱스 넘버.ß
        */}
      <WebHeader num={tabNumber} now={'mypage'} sub={true}/>
      <UserRightMenu />
      <Wrapper>
        <FlexBox>
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
              {typeof tabNumber === 'number' &&
                TabType.map((tab, index) => {
                  if (index === 0) {
                    return (
                      <TabItem
                        key={index}
                        tab={tabNumber.toString()}
                        index={index.toString()}
                        onClick={() => route.push('/mypage')}
                      >
                        <span>{tab}</span>
                        <Dot
                          tab={tabNumber.toString()}
                          index={index.toString()}
                        />
                      </TabItem>
                    );
                  } else {
                    return (
                      <TabItem
                        key={index}
                        tab={tabNumber.toString()}
                        index={index.toString()}
                        onClick={() =>
                          route.push({
                            pathname: '/mypage',
                            query: { id: index },
                          })
                        }
                      >
                        <span>{tab}</span>
                        <Dot
                          tab={tabNumber.toString()}
                          index={index.toString()}
                        />
                      </TabItem>
                    );
                  }
                })}
            </TabContainer>
          </Body>
        </FlexBox>
        <Wrap className="right-content">
          {typeof tabNumber === 'number' && components[tabNumber]}
        </Wrap>
        <BottomNavigation />
      </Wrapper>
      <WebFooter />
    </WebBody>
  );
};

export default Request;
const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #ffffff;

  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 900pt;
  margin: 60pt auto;
  display: flex;
  gap: 60pt;
  flex-direction: row;

  @media (max-width: 899.25pt) {
    padding-bottom: 60pt;
    flex-direction: column;
    width: 100%;
    gap: 0;
    margin: 0;
  }
`;

const FlexBox = styled.div`
  border: 1px solid #e2e5ed;
  border-radius: 12pt;
  max-height: 423pt;
  width: 216pt;
  padding: 42pt 19.5pt;

  @media (max-width: 899.25pt) {
    border: none;
    width: auto;
    padding: 0;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 21pt 15pt 0 15pt;
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
  padding-top: 15pt;
  .profile-icon {
    margin-left: 15pt;
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
  margin-top: 21pt;
  width: 100%;
  border-bottom: 3pt solid ${colors.gray3};
  margin-bottom: 24pt;
`;
const TabContainer = styled.div`
  display: flex;
  gap: 15pt;
  padding-left: 15pt;
  flex-direction: column;
  cursor: pointer;
  @media (max-width: 899.25pt) {
    flex-direction: row;
    display: flex;
  }
`;

const Wrap = styled.div`
  flex: 1;

  @media (min-width: 900pt) {
    width: 580.5pt;
  }
`;

const TabItem = styled.span<{ tab: string; index: string }>`
  padding-top: 21pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${({ tab, index }) =>
    tab === index ? colors.main : colors.lightGray};
  display: flex;
  align-items: center;

  @media (max-width: 899.25pt) {
    flex-direction: column;
  }
`;
const Dot = styled.div<{ tab: string; index: string }>`
  width: 3pt;
  height: 3pt;
  border-radius: 50%;
  margin: 0 9pt 0;
  background-color: ${({ tab, index }) => tab === index && `${colors.main}`};
`;

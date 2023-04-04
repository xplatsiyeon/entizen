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
import { useQuery, useQueryClient } from 'react-query';
import MyProjects from 'components/mypage/projects/MyProjects';
import Loader from 'components/Loader';
import Charging from 'components/mypage/place/Charging';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import UserRightMenu from 'components/UserRightMenu';
import { useDispatch } from 'react-redux';
import { redirectAction } from 'store/redirectUrlSlice';

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
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [tabNumber, setTabNumber] = useState<number>();

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
    enabled: accessToken ? true : false,
  });

  useEffect(() => {
    if (router.query.id !== undefined) {
      setTabNumber(Number(router.query.id));
    } else if (!router.query.id && router.pathname === '/mypage') {
      setTabNumber(0);
    }
  }, [router.query.id]);

  if (userLoading) {
    return <Loader />;
  }
  if (userError) {
    // console.log('유저 정보 에러');
  }

  if (!accessToken && memberType !== 'USER') {
    dispatch(redirectAction.addUrl(router.asPath));
    router.push('/signin');

    useEffect(() => {
      if (accessToken) {
        queryClient.removeQueries('mypage-request-id');
      }
    }, [router.isReady]);
  } else {
    return (
      <WebBody>
        {/* 피그마 마이페이지/A/S/4. 마이페이지 링크바 A/S 부분을 표시하기 위해서 num={2}를 넘긴다. (내 견적서는 0).
          const components: Components = {
          0: <WebEstimate/>,  
          2: <AsIndex />,
          }; num, page는 이 부분의 인덱스 넘버.ß
        */}
        <WebHeader num={tabNumber} now={'mypage'} sub={'mypage'} />
        <UserRightMenu />
        <Wrapper>
          <FlexBox>
            <Header>
              <span>
                <h1>{`${userData?.name}님,`}</h1>
                <h2>안녕하세요!</h2>
              </span>
              <div className="img" onClick={() => router.push('/setting')}>
                <Image src={Nut} alt="nut-icon" />
              </div>
            </Header>
            <Body>
              <span
                className="profile-icon"
                onClick={() => router.push('profile/editing')}
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
                          onClick={() => router.push('/mypage')}
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
                            router.push({
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
  }
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
  height: 424pt;
  width: 255pt;
  padding: 42pt 13.5pt;
  margin-right: 60pt;

  @media (max-width: 899.25pt) {
    border: none;
    width: auto;
    height: auto;
    padding: 0;
    margin-right: 0;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 15pt 0;
  @media (max-width: 899.25pt) {
    padding: 21pt 11.5pt 0 9pt;
  }
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
  margin-top: 25pt;
  width: 100%;
  border-bottom: 3pt solid ${colors.gray3};
  margin-bottom: 27pt;
`;
const TabContainer = styled.div`
  display: flex;
  padding-left: 15pt;
  flex-direction: column;
  cursor: pointer;
  @media (max-width: 899.25pt) {
    flex-direction: row;
    display: flex;
  }
`;

const Wrap = styled.div``;

const TabItem = styled.span<{ tab: string; index: string }>`
  padding-top: 18pt;
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
    margin-right: 15pt;
  }
`;
const Dot = styled.div<{ tab: string; index: string }>`
  width: 3pt;
  height: 3pt;
  border-radius: 50%;
  margin: 0pt 9pt 0;
  background-color: ${({ tab, index }) => tab === index && `${colors.main}`};
`;

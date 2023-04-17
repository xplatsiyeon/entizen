import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Box } from '@mui/system';
import Image from 'next/image';
import colors from 'styles/colors';
// import Platform from 'public/guide/platform_guide.png';
// import Platform from 'public/guide/GuideBannerMobilePng.png';
// import Platform from 'public/guide/GuideBannerMobileSvg.svg';
import { useEffect, useState } from 'react';
import Info from 'components/guide/infomation';
import Compare from 'components/guide/compare';
import Monitoring from 'components/guide/monitoring';
import ManageMent from 'components/guide/management';
import GuideHeader from 'components/guide/header';
import { useRouter } from 'next/router';
// import Guide from 'public/guide/guide1.png';
// import Guide from 'public/guide/GuideBannerSvgPng.png';
import Guide from 'public/guide/guide_banner_web.png';
import GuideApp from 'public/guide/guide_banner_app.png';
// import Guide from 'public/guide/GuideBannerSvg.svg';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import UserRightMenu from 'components/UserRightMenu';
import { isTokenGetApi } from 'api';
import { useQuery } from 'react-query';

interface Components {
  [key: number]: JSX.Element;
}

export type GuideList = {
  isSuccess: true;
  data: {
    guides: {
      createdAt: string;
      updatedAt: string;
      deletedAt: string;
      guideIdx: number;
      guideKind: string;
      title: string;
      content: string;
    }[];
  };
};

const Guide1_1 = () => {
  // 플랫폼 가이드 리스트 조회
  const {
    data: guideList,
    isLoading: guideIsLoading,
    isError: guideIsError,
    refetch: guideRefetch,
  } = useQuery<GuideList>('guide-list', () =>
    isTokenGetApi('/guide?guideKind=PLATFORM'),
  );

  const router = useRouter();
  const [tabNumber, setTabNumber] = useState<number>(0);
  const TabType = ['정보확인', '비교/선택', '설치 모니터링', '운영/관리'];
  const components: Components = {
    0: (
      <Info
        data={
          guideList?.data?.guides?.filter((item) => item?.title === '정보확인')!
        }
      />
    ),
    1: (
      <Compare
        data={
          guideList?.data?.guides?.filter(
            (item) => item?.title === '비교/선택',
          )!
        }
      />
    ),
    2: (
      <Monitoring
        data={
          guideList?.data?.guides?.filter(
            (item) => item?.title === '설치 모니터링',
          )!
        }
      />
    ),
    3: (
      <ManageMent
        data={
          guideList?.data?.guides?.filter(
            (item) => item?.title === '운영/관리',
          )!
        }
      />
    ),
  };

  const tabHandler = (index: number) => setTabNumber(index);

  useEffect(() => {
    guideRefetch();
  }, []);

  return (
    <>
      <WebHeader num={0} now={'guide'} sub={'guide'} />
      <Wrapper>
        {/* 링크 리스트 */}
        <UserRightMenu />
        <GuideHeader
          title={'플랫폼 가이드'}
          leftOnClick={() => router.back()}
          rightOnClick={() => router.push('/')}
        />
        <PlatformImgBox>
          <Image
            src={GuideApp}
            alt="platform"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <MobileBannerText>
            <span className="title">
              내일의 충전생활,
              <br />그 일상을 오늘로
            </span>
            <span className="smallText">
              엔티즌은 EV 충전기 구매자와
              <br />
              CaaS 사업자를 연결해주고, 충전사업 가이드를
              <br />
              지원하는 CaaS 중개 플랫폼 입니다.
              <br />
              <br />
              이제 엔티즌에서 제품과 서비스들을 하나로 묶은
              <br />
              구독상품으로 전기차 세상을 쉽고 간편하게 누리세요!
            </span>
            <span className="annotationText">
              * CaaS: Charging as a Service, 구독 운영 / 파트너
            </span>
          </MobileBannerText>
        </PlatformImgBox>
        <GuideImgBox>
          <BannerTextBox>
            <span className="title">
              내일의 충전생활,
              <br />그 일상을 오늘로
            </span>
            <span className="smallText">
              엔티즌은 EV 충전기 구매자와 CaaS 사업자를 연결해주고, 충전사업
              가이드를 지원하는 CaaS 중개 플랫폼 입니다.
              <br />
              이제 엔티즌에서 제품과 서비스들을 하나로 묶은 구독상품으로 전기차
              세상을 쉽고 간편하게 누리세요!
            </span>
            <span className="annotationText">
              * CaaS: Charging as a Service, 구독 운영 / 파트너
            </span>
          </BannerTextBox>
          <Image
            src={Guide}
            alt="guide"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </GuideImgBox>
        <ModalBox>
          <TabBox>
            {TabType.map((tab, index) => (
              <Item
                idx={index.toString()}
                num={tabNumber.toString()}
                key={tab}
                onClick={() => tabHandler(index)}
              >
                {tab}
                <div className="line" />
              </Item>
            ))}
          </TabBox>
        </ModalBox>
        {components[tabNumber]}
      </Wrapper>
      <WebFooter />
    </>
  );
};

export default Guide1_1;

const align = css`
  position: absolute;
  left: 50;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding-bottom: 48pt;

  @media (max-width: 899.25pt) {
    padding-bottom: 20pt;
  }
`;
const PlatformImgBox = styled(Box)`
  display: none;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 249pt;
  & > span {
    border-radius: 6pt;
  }
  @media (max-width: 899.25pt) {
    margin: 12pt 15pt 0 15pt;
    display: flex;
  }
`;
const GuideImgBox = styled(Box)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 330pt;
  width: 100%;

  & > span {
    position: relative;
    height: 100%;
    width: 100%;
  }
  @media (max-width: 899.25pt) {
    margin: 12pt 15pt 0 15pt;
    display: none;
  }
`;
const ModalBox = styled(Box)`
  padding-top: 60pt;
  overflow-x: scroll;
`;
const TabBox = styled.div`
  display: flex;
  justify-content: center;
  width: 105%;
  padding-bottom: 12pt;
  border-bottom: 0.75pt solid #f3f4f7;
  font-family: 'Spoqa Han Sans Neo';

  @media (max-width: 899.25pt) {
    padding-left: 15pt;
    justify-content: start;
  }
`;
const Item = styled.div<{ idx: string; num: string }>`
  font-weight: ${({ idx, num }) => (idx === num ? '700' : '500')};
  font-size: 12pt;
  line-height: 15pt;
  text-align: center;
  letter-spacing: -0.02em;
  padding: 0 30pt;
  color: ${({ idx, num }) => (idx === num ? colors.main : '#caccd1')};
  position: relative;
  cursor: pointer;

  .line {
    position: absolute;
    left: 0;
    bottom: -12pt;
    width: 100%;
    border-bottom: ${({ idx, num }) =>
      idx === num && `  3pt solid ${colors.main};`};
    border-radius: 10pt;
  }

  @media (max-width: 899.25pt) {
    padding: 0 11.25pt;
    font-size: 12pt;
    font-weight: 500;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: center;
    white-space: pre;
  }
`;

const BannerTextBox = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  ${align}
  .title {
    padding-top: 69.75pt;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 30pt;
    font-weight: 700;
    line-height: 45pt;
    letter-spacing: -0.02em;
    text-align: center;
    color: white;
    white-space: nowrap;
  }

  .smallText {
    padding-top: 21pt;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 400;
    line-height: 22.5pt;
    letter-spacing: -0.02em;
    text-align: center;
    white-space: nowrap;
    color: white;
  }

  .annotationText {
    padding-top: 45pt;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
    color: white;
  }
`;

const MobileBannerText = styled.div`
  ${align}
  .title {
    padding-top: 28.5pt;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 13.5pt;
    font-weight: 700;
    line-height: 21pt;
    letter-spacing: -0.02em;
    text-align: center;
    color: white;
    white-space: nowrap;
  }

  .smallText {
    padding-top: 9pt;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 400;
    line-height: 16.5pt;
    letter-spacing: -0.02em;
    text-align: center;
    white-space: nowrap;
    color: white;
  }

  .annotationText {
    padding-top: 30pt;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 9pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
    white-space: nowrap;
    color: white;
  }
`;

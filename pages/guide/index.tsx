import styled from '@emotion/styled';
import { Box } from '@mui/system';
import Image from 'next/image';
import colors from 'styles/colors';
import bell from 'public/images/guide-bell.svg';
import list from 'public/images/list-bar.svg';
import banner from 'public/guide/guide-main-banner.png';
import banner2 from 'public/guide/guide0.png';
import arrow from 'public/images/right-arrow.svg';
import fee_icon from 'public/guide/fee-icon.svg';
import subsidy_icon from 'public/guide/subsidy-icon.svg';
import charger_icon from 'public/guide/charger_icon.png';
import subscribe_icon from 'public/guide/subscribe_icon.png';
import arrow_small from 'public/images/arrow.svg';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import BottomNavigation from 'components/BottomNavigation';
import WebHeader from 'web-components/WebHeader';
import WebFooter from 'web-components/WebFooter';

const Guide1 = () => {
  const router = useRouter();

  // 필요한 인자 값 받아와서 페이지 이동
  const pageHandler = (page: string) => {
    router.push(`${page}`);
  };

  return (
    <Body>
      <WebHeader />
      <Inner>
        <Wrapper>
          <Header>
            <span className="left">가이드</span>
            <div className="right">
              <Image
                onClick={() => pageHandler('/alarm')}
                src={bell}
                alt="bell"
              />
              <Image
                onClick={() => pageHandler('')}
                src={list}
                alt="hamburger"
              />
            </div>
          </Header>
          <Wrap>
            <Platform onClick={() => pageHandler('/guide/1-1')}>
              <div className="img-box">
                <Image src={banner} alt="platform" layout="fill" />
              </div>
            </Platform>
            <Platform onClick={() => pageHandler('/guide/1-1')}>
              <div className="img-box">
                <Image src={banner2} alt="platform" layout="fill" />
              </div>
            </Platform>
            <SubsidyBox>
              <Subsidy onClick={() => pageHandler('/guide/1-2')}>
                <span className="text">보조금 가이드</span>
                <Image src={subsidy_icon} alt="subsidy_icon" />
              </Subsidy>
              <Fee onClick={() => pageHandler('/guide/1-3')}>
                <span className="text">요금 정보</span>
                <Image src={fee_icon} alt="fee_icon" />
              </Fee>
            </SubsidyBox>
          </Wrap>
          <Wrap>
            <GuideBox onClick={() => pageHandler('/guide/1-4')}>
              <span>
                <div className="name_box">
                  <h2 className="name">구독 가이드</h2>
                  <Image src={arrow} alt="img" />
                </div>
                <p className="text">
                  구독에 대한
                  <br />
                  모든 것을 한 눈에!
                </p>
              </span>
              <div className="img-box">
                <Image src={charger_icon} alt="charger_icon" />
              </div>
            </GuideBox>
            <GuideBox onClick={() => pageHandler('/guide/1-5')}>
              <span>
                <div className="name_box">
                  <h2 className="name">충전기 가이드</h2>
                  <Image src={arrow} alt="img" />
                </div>
                <p className="text">
                  나에게 딱 맞는
                  <br />
                  충전기는?
                </p>
              </span>
              <div className="img-box">
                <Image src={subscribe_icon} alt="subscribe_icon" />
              </div>
            </GuideBox>
          </Wrap>
          <EntizenLibrary onClick={() => pageHandler('')}>
            <Btn>
              &nbsp; 보러가기
              <div className="img">
                <Image src={arrow_small} alt="arrow_small" layout="fill" />
              </div>
            </Btn>
          </EntizenLibrary>
          <BottomNavigation />
        </Wrapper>
      </Inner>
      <WebFooter />
    </Body>
  );
};

export default Guide1;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  //height: 810pt;
  background: #fcfcfc;

  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 0 auto;
  width: 900pt;

  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0%;
    transform: none;
  }
  @media (max-height: 500pt) {
    height: 100%;
  }
`;

const Wrapper = styled.div`
  padding: 0 20pt;
  padding-bottom: 30pt;

  @media (max-width: 899pt) {
    height: 100%;
    background-color: #fafcff;
  }
`;
const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 11.25pt;
  .left {
    font-weight: 700;
    font-size: 21pt;
    line-height: 21pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .right {
    display: flex;
    gap: 9.75pt;
  }
`;

const Wrap = styled.div`
  display: flex;
  position: relative;
  @media (max-width: 899pt) {
    display: block;
  }
`;

const Platform = styled(Button)`
  display: block;
  margin-top: 15.75pt;
  padding: 0;
  height: 210pt;
  .img-box {
    position: relative;
    width: 589.5pt;
    height: 210pt;
    object-fit: cover;
  }
  &:nth-of-type(1) {
    display: none;
  }

  @media (max-width: 899pt) {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    .img-box {
      width: 251.25pt;
      height: 159pt;
    }
    &:nth-of-type(1) {
      display: block;
    }
    &:nth-of-type(2) {
      display: none;
    }
  }
`;
const SubsidyBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14.625pt;
  padding-top: 15pt;
  width: calc(100% - 600pt);
  .text {
    font-weight: 700;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  @media (max-width: 899pt) {
    width: auto;
  }
`;
const Subsidy = styled(Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding-left: 15pt;
  padding-right: 10.125pt;
  background: #e8e3f8;
  border-radius: 8px;
  width: 100%;
  @media (max-width: 899pt) {
    height: 36pt;
  }
`;
const Fee = styled(Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding-right: 15pt;
  padding-left: 10.125pt;
  background: #fff1d5;
  border-radius: 8px;
  width: 100%;
  @media (max-width: 899pt) {
    height: 36pt;
  }
`;
const GuideBox = styled(Button)`
  display: flex;
  //height:이미지 높이 만큼 줘야함.
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  position: relative;
  width: 100%;
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  margin-top: 15pt;
  padding: 14.25pt 15pt;
  &:nth-of-type(1) {
    margin-right: 22.5pt;
  }
  .name_box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .name {
    font-weight: 700;
    font-size: 15pt;
    line-height: 21pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .text {
    font-weight: 400;
    font-size: 12pt;
    line-height: 16.5pt;
    letter-spacing: -0.02em;
    padding-top: 7.5pt;
    color: ${colors.lightGray2};
    text-align: start;
  }
  .img-box {
    position: absolute;
    bottom: 16.5pt;
    right: 15.75pt;
    width: 45pt;
    height: 45pt;
  }
`;
const EntizenLibrary = styled.div`
  display: flex;
  justify-content: center;
`;
const Btn = styled(Button)`
  border: 0.75pt solid ${colors.gray};
  border-radius: 29px;
  margin-top: 30pt;
  padding: 6pt 9pt;
  font-weight: 500;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  display: flex;
  justify-content: center;
  gap: 3pt;
  color: ${colors.main2};
  .img {
    position: relative;
    width: 9pt;
    height: 9pt;
  }
  ::before {
    content: '앤티즌 도서관';
    color: ${colors.main};
  }
`;

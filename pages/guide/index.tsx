import styled from '@emotion/styled';
import { Box } from '@mui/system';
import Image from 'next/image';
import colors from 'styles/colors';
import bell from 'public/images/guide-bell.svg';
import list from 'public/images/list-bar.svg';
import banner from 'public/images/platform-banner.png';
import arrow from 'public/images/right-arrow.svg';
import fee_icon from 'public/guide/fee-icon.svg';
import subsidy_icon from 'public/guide/subsidy-icon.svg';
import charger_icon from 'public/guide/charger-icon.svg';
import subscribe_icon from 'public/guide/subscribe-icon.svg';
import arrow_small from 'public/images/arrow.svg';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
const Guide1 = () => {
  const router = useRouter();

  // 필요한 인자 값 받아와서 페이지 이동
  const pageHandler = (page: string) => {
    router.push(`/${page}`);
  };

  return (
    <Wrapper>
      <Header>
        <span className="left">가이드</span>
        <div className="right">
          <Image onClick={() => pageHandler('')} src={bell} alt="bell" />
          <Image onClick={() => pageHandler('')} src={list} alt="hamburger" />
        </div>
      </Header>
      <Platform onClick={() => pageHandler('')}>
        <Image src={banner} alt="platform" />
      </Platform>
      <SubsidyBox>
        <Subsidy onClick={() => pageHandler('')}>
          <span className="text">보조금 가이드</span>
          <Image src={subsidy_icon} alt="subsidy_icon" />
        </Subsidy>
        <Fee onClick={() => pageHandler('')}>
          <span className="text">요금 정보</span>
          <Image src={fee_icon} alt="fee_icon" />
        </Fee>
      </SubsidyBox>
      <GuideBox onClick={() => pageHandler('')}>
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
      <GuideBox onClick={() => pageHandler('')}>
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
      <EntizenLibrary onClick={() => pageHandler('')}>
        <Btn>
          &nbsp; 보러가기
          <div className="img">
            <Image src={arrow_small} alt="arrow_small" layout="fill" />
          </div>
        </Btn>
      </EntizenLibrary>
    </Wrapper>
  );
};

export default Guide1;

const Wrapper = styled.div`
  padding: 0 20pt;
  padding-bottom: 30pt;
  background-color: #fafcff;
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
const Platform = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15.75pt;
`;
const SubsidyBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14.625pt;
  padding-top: 15pt;
  .text {
    font-weight: 700;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
`;
const Subsidy = styled(Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36pt;
  padding-left: 15pt;
  padding-right: 10.125pt;
  background: #e8e3f8;
  border-radius: 8px;
  width: 100%;
`;
const Fee = styled(Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36pt;
  padding-right: 15pt;
  padding-left: 10.125pt;
  background: #fff1d5;
  border-radius: 8px;
  width: 100%;
`;
const GuideBox = styled(Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  position: relative;
  width: 100%;
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  margin-top: 15pt;
  padding: 14.25pt 15pt;
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
    /* border: 1px solid red; */
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

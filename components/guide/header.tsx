import styled from '@emotion/styled';
import { Box } from '@mui/system';
import Image from 'next/image';
import BackImg from 'public/images/back-btn.svg';
import Home from 'public/images/home.svg';
import colors from 'styles/colors';

const GuideHeader = () => {
  return (
    <Header>
      <div className="back-img">
        <Image
          style={{
            cursor: 'pointer',
            width: '18pt',
            height: '18pt',
          }}
          src={BackImg}
          alt="btn"
        />
      </div>
      <span className="text">요금정보</span>
      <div className="setting-img">
        <Image
          style={{
            cursor: 'pointer',
            width: '18pt',
            height: '18pt',
          }}
          src={Home}
          alt="home"
        />
      </div>
    </Header>
  );
};

export default GuideHeader;

const Header = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36pt;
  padding: 9pt 0;
  padding: 0 15pt;
  .back-img {
    position: absolute;
    left: 7pt;
    padding: 5px;
  }
  .text {
    font-weight: 700;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .setting-img {
    position: absolute;
    right: 7pt;
    padding: 5px;
  }
`;

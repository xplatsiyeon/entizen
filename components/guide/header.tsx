import styled from '@emotion/styled';
import { Box } from '@mui/system';
import Image from 'next/image';
import BackImg from 'public/images/back-btn.svg';
import Home from 'public/images/home.svg';
import colors from 'styles/colors';

interface Props {
  title: string;
}

const GuideHeader = ({ title }: Props) => {
  return (
    <Header>
      <div className="back-img">
        <Image src={BackImg} alt="btn" />
      </div>
      <span className="text">{title}</span>
      <div className="setting-img">
        <Image src={Home} alt="home" />
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
  padding: 9pt 15pt;
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

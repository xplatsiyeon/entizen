import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import BackImg from 'public/images/back-btn.svg';
import Home from 'public/images/home.svg';
import colors from 'styles/colors';

interface Props {
  title: string;
  leftOnClick?: () => void;
  rightOnClick?: () => void;
}

const GuideHeader = ({ title, leftOnClick, rightOnClick }: Props) => {
  return (
    <Header>
      <div className="back-img" onClick={leftOnClick}>
        <Image src={BackImg} alt="btn" />
      </div>
      <span className="text">{title}</span>
      <div className="setting-img" onClick={rightOnClick}>
        <Image src={Home} alt="home" />
      </div>
    </Header>
  );
};

export default GuideHeader;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36pt;
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

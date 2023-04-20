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
    <>
      <Wrap>
        <Header>
          <div className="back-img" onClick={leftOnClick}>
            <Image src={BackImg} alt="btn" />
          </div>
          <span className="text">{title}</span>
          <div className="setting-img" onClick={rightOnClick}>
            <Image src={Home} alt="home" />
          </div>
        </Header>
      </Wrap>
      {/* 포지션 fixed로 빈 구역 늘려주기 */}
      <MarginBottom />
    </>
  );
};

export default GuideHeader;

const Wrap = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  background: white;
  z-index: 9999;
`;
const MarginBottom = styled.div`
  margin-bottom: 36pt;
`;

const Header = styled.div`
  display: none;
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
  @media (max-width: 899.25pt) {
    display: flex;
  }
`;

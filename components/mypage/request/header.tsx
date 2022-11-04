import styled from '@emotion/styled';
import Image from 'next/image';
import { Router, useRouter } from 'next/router';
import BackImg from 'public/images/back-btn.svg';
import ExitImg from 'public/images/X.svg';
import colors from 'styles/colors';
import Home from 'public/images/home.svg';

interface Props {
  title?: string;
  back?: boolean;
  cancel?: string;
  exitBtn?: boolean;
  homeBtn?: boolean;
  handleOnClick?: () => void;
  handleHomeClick?: () => void;
}

const MypageHeader = ({
  title,
  back = false,
  cancel,
  exitBtn = false,
  homeBtn = false,
  handleOnClick,
  handleHomeClick,
}: Props) => {
  const route = useRouter();



  return (
    <Header>
      {/* 뒤로가기 버튼 */}
      {back && (
        <div className="back-img" onClick={() => route.back()}>
          <Image src={BackImg} alt="btn-icon" />
        </div>
      )}
      {/* 제목 */}
      <span className="text">{title ? title : <br />}</span>
      {/* 취소 버튼 */}
      <div className="cancel" onClick={handleOnClick}>
        {cancel}
      </div>
      {/* 닫기 이미지 */}
      {exitBtn && (
        <div className="exit" onClick={handleOnClick}>
          <Image src={ExitImg} alt="exit-icon" />
        </div>
      )}
      {homeBtn && (
        <div className="home" onClick={handleHomeClick}>
          <Image src={Home} alt="home-icon" />
        </div>
      )}
    </Header>
  );
};

export default MypageHeader;

const Header = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  position: relative;
  //background-color: ${colors.lightWhite};
  padding: 9pt 15pt;
  .back-img {
    position: absolute;
    cursor: pointer;
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
  .cancel {
    position: absolute;
    font-weight: 500;
    font-size: 12pt;
    right: 15pt;
    line-height: 18pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  .exit {
    position: absolute;
    right: 15pt;
  }

  .home {
    position: absolute;
    right: 15pt;
  }
  @media (max-width: 899pt) {
    display: flex;
  }
`;

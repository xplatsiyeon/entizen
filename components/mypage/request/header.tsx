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
  handleBackClick?: () => void;
  handleOnClick?: () => void;
  handleHomeClick?: () => void;
  handle?: boolean;
}

const MypageHeader = ({
  title,
  back = false,
  cancel,
  exitBtn = false,
  homeBtn = false,
  handleBackClick,
  handleOnClick,
  handleHomeClick,
  handle,
}: Props) => {
  const route = useRouter();

  return (
    <>
      <Wrap>
        <Header handle={handle}>
          {/* 뒤로가기 버튼 */}
          {back && (
            <div
              className="back-img"
              // onClick={!handle ? () => route.back() : handleOnClick}
              onClick={!handle ? () => route.back() : handleBackClick}
            >
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
      </Wrap>
      {/* 포지션 fixed로 빈 구역 늘려주기 */}
      <MarginBottom />
    </>
  );
};

export default MypageHeader;

const Wrap = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  background: white;
  z-index: 9999;
`;
const MarginBottom = styled.div`
  @media (max-width: 899.25pt) {
    margin-bottom: 36pt;
  }
`;

const Header = styled.div<{ handle: boolean | undefined }>`
  display: ${({ handle }) => (handle ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: relative;
  background: white;

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
    cursor: pointer;
  }

  .home {
    position: absolute;
    right: 15pt;
  }
  @media (max-width: 899.25pt) {
    display: flex;
    align-content: center;
  }
  @media (min-width: 900pt) {
    display: none;
  }
`;

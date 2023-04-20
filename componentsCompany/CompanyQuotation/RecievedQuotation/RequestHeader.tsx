import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import BackImg from 'public/images/back-btn.svg';
import colors from 'styles/colors';
import Home from 'public/images/home.svg';
import { css } from '@emotion/react';
import ExitImg from 'public/images/X.svg';
import { useMediaQuery } from 'react-responsive';

interface Props {
  title?: string;
  back?: boolean;
  cancel?: string;
  exitBtn?: boolean;
  homeBtn?: boolean;
  handleOnClick?: () => void;
  handleHomeClick?: () => void;
  handleBackClick?: () => void;
  handleExitClick?: () => void;
  web?: boolean;
}

const RequestHeader = ({
  title,
  back = false,
  cancel,
  exitBtn = false,
  homeBtn = false,
  handleOnClick,
  handleHomeClick,
  handleBackClick,
  handleExitClick,
  web,
}: Props) => {
  const route = useRouter();
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  return (
    <>
      <Wrap>
        <Header web={web} mobile={mobile}>
          {/* 뒤로가기 버튼 */}
          {back && (
            <div className="back-img" onClick={handleBackClick}>
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
            <div className="exit" onClick={handleExitClick}>
              <Image src={ExitImg} alt="home-icon" />
            </div>
          )}
          {mobile && homeBtn && (
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

export default RequestHeader;

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

const Header = styled.div<{ web?: boolean; mobile: boolean }>`
  display: flex;
  justify-content: ${({ mobile }) => (mobile ? 'space-between' : 'center')};
  align-items: center;
  position: relative;
  background-color: ${colors.lightWhite};
  padding: 9pt 15pt;
  height: 36pt;
  .back-img {
    position: absolute;
    left: 7pt;
    padding: 5px;
    cursor: pointer;
  }
  .text {
    font-weight: 700;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    ${({ web }) =>
      web === true &&
      css`
        font-family: 'Spoqa Han Sans Neo';
        font-size: 18pt;
        font-weight: 700;
        line-height: 21pt;
        letter-spacing: -0.02em;
        text-align: center;
      `}
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
    cursor: pointer;
  }
  .exit {
    display: none;
    position: absolute;
    right: 15pt;
    cursor: pointer;
    @media (max-width: 899.25pt) {
      display: block;
    }
  }
`;

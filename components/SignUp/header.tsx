import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import BackImg from 'public/images/back-btn.svg';
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
  handleBackClick?: () => void;
}

const SignUpHeader = ({
  title,
  back = false,
  cancel,
  exitBtn = false,
  homeBtn = false,
  handleOnClick,
  handleHomeClick,
  handleBackClick,
}: Props) => {
  const route = useRouter();

  return (
    <Header>
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
        <div className="exit" onClick={handleHomeClick}>
          <Image src={Home} alt="home-icon" />
        </div>
      )}
    </Header>
  );
};

export default SignUpHeader;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${colors.lightWhite};
  padding: 9pt 15pt;
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

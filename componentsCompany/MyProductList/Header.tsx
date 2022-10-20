import Image from 'next/image';
import React from 'react';
import BackImg from 'public/images/back-btn.svg';
import colors from 'styles/colors';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

type Props = {
  title?: string;
  back?: boolean;
  check?: boolean;
  handleOnClick?: () => void;
  handleCheckClick?: () => void;
};

const CompanyHeader = ({ title, back, check, handleCheckClick }: Props) => {
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
      {check && (
        <div className="check" onClick={handleCheckClick}>
          완료
        </div>
      )}
      {/* 닫기 이미지 */}
    </Header>
  );
};

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
  .check {
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

export default CompanyHeader;

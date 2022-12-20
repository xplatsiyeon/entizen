import styled from '@emotion/styled';
import React from 'react';
import colors from 'styles/colors';
import Back from 'public/adminImages/Back.png';
import Image from 'next/image';

type Props = {
  type: 'main' | 'detail';
  title: string;
  subTitle?: string;
  backBtn?: () => void;
};

const AdminHeader = ({ type, title, subTitle, backBtn }: Props) => {
  return (
    <>
      {type === 'main' && (
        <Wrapper>
          <h1>{title}</h1>
          <p>{subTitle}</p>
        </Wrapper>
      )}
      {type === 'detail' && (
        <DetailWrapper>
          <button className="backBtn" onClick={backBtn}>
            <div className="imgBox">
              <Image src={Back} alt={'back'} layout="fill" />
            </div>
            이전 페이지
          </button>

          <div className="sencondLine">
            <span className="title">
              <h1>{title}</h1>
              <p>{subTitle}</p>
            </span>
            <button className="excelBtn">엑셀 다운로드</button>
          </div>
        </DetailWrapper>
      )}
    </>
  );
};

export default AdminHeader;

const Wrapper = styled.div`
  margin-top: 60pt;
  /* margin-left: 18pt; */
  margin-bottom: 12pt;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 6pt;
  h1 {
    font-weight: 500;
    font-size: 18pt;
    line-height: 150%;
    color: ${colors.dark2};
  }
  p {
    font-weight: 500;
    font-size: 12pt;
    line-height: 150%;
    color: ${colors.dark2};
  }
`;

const DetailWrapper = styled.div`
  margin-top: 60pt;
  /* margin-left: 18pt; */
  margin-bottom: 12pt;

  width: 100%;
  .backBtn {
    display: flex;
    align-items: center;
    gap: 3px;
    margin-bottom: 25px;
    padding: 4px 6px;
    color: ${colors.lightWhite};
    background-color: #464646;
    border-radius: 4px;
    font-weight: 500;
    font-size: 14px;
    height: 29px;
    cursor: pointer;
  }
  .sencondLine {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  h1 {
    font-weight: 500;
    font-size: 18pt;
    line-height: 150%;
    color: ${colors.dark2};
  }
  p {
    font-weight: 500;
    font-size: 12pt;
    line-height: 150%;
    color: ${colors.dark2};
  }
  .excelBtn {
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: ${colors.gray2};
    padding: 3px 6px;
  }
  .title {
    display: flex;
    gap: 6pt;
    align-items: center;
  }
  .imgBox {
    position: relative;
    top: -2px;
    display: flex;
    width: 12px;
    height: 12px;
  }
`;

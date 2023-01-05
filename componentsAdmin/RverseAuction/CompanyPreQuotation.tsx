import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import colors from 'styles/colors';
import ReverseAuctionTable from './ReverseAuctionTable';

type Props = {
  detatilId: string;
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailId: React.Dispatch<React.SetStateAction<string>>;
};

const CompanyPreQuotation = ({
  detatilId,
  setIsDetail,
  setDetailId,
}: Props) => {
  const handleCommon = () => {};
  return (
    <StyledBody>
      <QuotationTitle>기업회원 견적서 항목</QuotationTitle>
      <ReverseAuctionTable
        detatilId={detatilId}
        setDetailId={setDetailId}
        setIsDetail={setIsDetail}
        tableType={'companyPreQuotation'}
        commonBtn={'엑셀 다운로드'}
        handleCommon={handleCommon}
        hide={true}
        pagenationHide={true}
      />
    </StyledBody>
  );
};

export default CompanyPreQuotation;

const Background = styled.div`
  width: 964px;
  background-color: ${colors.lightWhite};
`;

const StyledBody = styled.div`
  margin-top: 32px 0 0;
  min-width: 964px;

  .hidden {
    visibility: hidden;
  }

  .button {
    &:first-child {
      margin-right: 10px;
    }
    font-family: 'Spoqa Han Sans Neo';
    color: #747780;
    line-height: 150%;
    font-size: 14px;
    font-style: normal;
    text-align: center;
    border: 1px solid #747780;
    background-color: #e2e5ed;
    border-radius: 4px;
    width: 64px;
    height: 26px;
    padding-top: 2px;
    cursor: pointer;
  }
  table {
    width: 100%;
    text-align: center;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-size: 16px;
    line-height: 150%;
    color: #000000;

    thead {
      font-weight: 500;
      background: #e2e5ed;
      .gridjs-th-content {
        padding: 8px 0;
      }
    }
    tbody {
      font-weight: 400;
      td {
        padding: 8px 0;
      }
      .wide {
      }
    }
  }
`;

const QuotationTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.dark2};
  text-align: left;
  margin-top: 35px;
`;

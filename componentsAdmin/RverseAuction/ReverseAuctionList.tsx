import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import Table from 'componentsAdmin/table';
import React, { useState } from 'react';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { DateRangePicker } from 'rsuite';
import colors from 'styles/colors';
import DetailQuotation from 'componentsAdmin/RverseAuction/DetailQuotation';

const ReverseAuctionList = () => {
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');

  // 달력 날짜 변경 함수
  const handleDateChange = (
    value: DateRange | null,
    event: React.SyntheticEvent<Element, Event>,
  ) => {
    console.log(value);
    console.log(event);
  };

  return (
    <Wrapper>
      {isDetail && (
        <DetailQuotation
          detatilId={detatilId}
          setDetailId={setDetailId}
          setIsDetail={setIsDetail}
        />
      )}
      <AdminHeader title="역경매 관리" type="main" />
      <Manager>
        <li className="search">
          <label>기간검색</label>
          {/* 달력 컴포넌트 */}
          <DateRangePicker
            placeholder={'년-월-일 ~ 년-월-일'}
            size={'sm'}
            onChange={handleDateChange}
          />
        </li>
        <Btn>조회</Btn>
      </Manager>
      <Table
        setDetailId={setDetailId}
        setIsDetail={setIsDetail}
        tableType={'quetationListData'}
      />
    </Wrapper>
  );
};

export default ReverseAuctionList;

const Wrapper = styled.div`
  /* width: 100%; */
  background-color: ${colors.lightWhite};
  width: 100%;
  padding: 0 18pt;
  position: absolute;
  left: 154.5pt;
  z-index: 999;
`;

const Manager = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  label {
    padding-right: 39.75pt;
  }
  li {
    gap: 7.5pt;
    display: flex;
    align-items: center;
    background: #ffffff;
    border: 1px solid ${colors.lightWhite3};
    height: 30pt;
    padding: 4pt 0 4pt 12pt;
    width: 100%;
  }
  .searchInput {
    border: 1px solid ${colors.lightWhite3};
    height: 100%;
    width: 274.5pt;
  }
  .search {
    width: 946px;
  }
`;
const Btn = styled.button`
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  outline: none;
  text-align: center;
  border-radius: 3pt;
  padding: 5px 17px;
  height: 19.5pt;
  color: ${colors.lightWhite};
  background: #464646;
  margin-top: 15px;
`;

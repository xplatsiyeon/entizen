import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import Table from 'componentsAdmin/table';
import React, { useState } from 'react';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import colors from 'styles/colors';
import CommonDetail from './CommonDetail';

type Props = {};

const CompanyManagement = (props: Props) => {
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
    <>
      {isDetail && (
        <CommonDetail
          setIsDetail={setIsDetail}
          type={'COMPANY'}
          memberIdx={detatilId}
        />
      )}

      <Wrapper>
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
        {/* 테이블 컴포넌트 */}
        <Table setIsDetail={setIsDetail} setDetailId={setDetailId} tableType={'comUserData'}/>
      </Wrapper>
    </>
  );
};

export default CompanyManagement;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 18pt;
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

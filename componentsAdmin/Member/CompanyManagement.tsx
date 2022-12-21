import styled from '@emotion/styled';
import ComTable from 'componentsAdmin/comTable';
import CalendarsDateRangePicker from 'componentsAdmin/DatePicker';
import AdminHeader from 'componentsAdmin/Header';
import React, { useState } from 'react';
import colors from 'styles/colors';
import CommonDetail from './CommonDetail';

type Props = {};

const CompanyManagement = (props: Props) => {
  const [isDetail, setIsDetail] = useState(false);
  return (
    <>
      {isDetail && (
        <CommonDetail
          setIsDetail={setIsDetail}
          type={'COMPANY'}
          memberIdx={113}
        />
      )}

      <Wrapper>
        <AdminHeader title="역경매 관리" type="main" />

        <Manager>
          <li>
            <label>기간검색</label>
            {/* 달력 컴포넌트 */}
            <CalendarsDateRangePicker />
          </li>
          <Btn>조회</Btn>
        </Manager>
        {/* 테이블 컴포넌트 */}
        <ComTable setIsDetail={setIsDetail} />
      </Wrapper>
    </>
  );
};

export default CompanyManagement;

const Wrapper = styled.div`
  /* width: 100%; */
  margin: 0 18pt;
`;
const Manager = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 946px;
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

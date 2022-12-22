import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import Table from 'componentsAdmin/table';
import React, { useRef, useState } from 'react';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { DateRangePicker } from 'rsuite';
import colors from 'styles/colors';
import DetailQuotation from './DetailQuotation';
import { AdminBtn } from 'componentsAdmin/Layout';

const ReverseAuctionList = () => {
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');

  const [pickedDate, setPickedDate] = useState<string[]>();
  const dateRef = useRef<HTMLLIElement>(null);

  // 달력 날짜 변경 함수
  const handleDateChange = (
    value: DateRange | null,
    event: React.SyntheticEvent<Element, Event>,
  ) => {
    const inputValue = dateRef.current
      ?.querySelector('.datePicker-input')
      ?.querySelector('input')?.value;
    console.log('input?', inputValue);
    dateRef.current?.querySelector('.date-btn')?.classList.add('on');
    setTimeout(()=>{
    dateRef.current?.querySelector('.date-btn')?.classList.remove('on');
    }, 600)
  };

  const handleDate = () => {
    const inputValue = dateRef.current
      ?.querySelector('.datePicker-input')
      ?.querySelector('input')?.value;
    console.log('날짜조회 클릭', inputValue);

    if (inputValue) {
      console.log(inputValue);
      const newDate = inputValue.split('~');
      setPickedDate(newDate);
    } else {
      setPickedDate(undefined);
     }
  }

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
          <li className="search" ref={dateRef}>
          <label>기간검색</label>
          {/* 달력 컴포넌트 */}
          <DateRangePicker 
            className="datePicker-input"
            placeholder={'년-월-일 ~ 년-월-일'}
            size={'sm'}
            onChange={handleDateChange}
          />
          <AdminBtn onClick={handleDate}>조회</AdminBtn>
        </li>
      </Manager>
      <Table
        setDetailId={setDetailId}
        setIsDetail={setIsDetail}
        tableType={'quetationListData'}
        pickedDate={pickedDate}
      />
    </Wrapper>
  );
};

export default ReverseAuctionList;

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

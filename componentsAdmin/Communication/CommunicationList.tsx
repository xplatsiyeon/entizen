import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import AdminHeader from 'componentsAdmin/Header';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { DateRangePicker } from 'rsuite';
import { AdminBtn } from 'componentsAdmin/Layout';
import Table from 'componentsAdmin/table';

const CommunicationList = () => {
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
    setTimeout(() => {
      dateRef.current?.querySelector('.date-btn')?.classList.remove('on');
    }, 600);
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
  };
  return (
    <Wrapper>
      <TitleWrapper>
        <AdminHeader title="소통하기" type="main" />
        <SubText>소통하기 리스트</SubText>
      </TitleWrapper>
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
        tableType={''}
        pickedDate={pickedDate}
      />
    </Wrapper>
  );
};

export default CommunicationList;

const Wrapper = styled.div`
  width: 100%;
  padding: 0 18pt;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;
const SubText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 16px;
  color: #000000;
  margin-top: 60pt;
  margin-bottom: 12pt;
  font-weight: 500;
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

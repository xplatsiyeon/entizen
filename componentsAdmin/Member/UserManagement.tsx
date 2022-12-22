import styled from '@emotion/styled';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import AdminHeader from 'componentsAdmin/Header';
import React, { useEffect, useRef, useState } from 'react';
import colors from 'styles/colors';
import CommonDetail from './CommonDetail';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import Table from 'componentsAdmin/table';
import useDebounce from 'hooks/useDebounce';
import { originDateFomat } from 'utils/calculatePackage';

type Props = {};

const selectOption = ['이름 검색', '아이디 검색'];
const UserManagement = (props: Props) => {
  const [selectValue, setSelectValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  // const [keyword, setKeyword] = useState('');
  const keyword = useDebounce(inputValue, 2000);
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');
  const [pickedDate, setPickedDate] = useState<string[]>();

  const dateRef = useRef<HTMLLIElement>(null)

  // 셀렉트 박스 변경함수
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setSelectValue(event.target.value as string);
  };

  // 달력 날짜 변경 함수
  const handleDateChange = (
    value: DateRange | null,
    event: React.SyntheticEvent<Element, Event>,
  ) => {
    const inputValue = dateRef.current?.querySelector('.datePicker-input')?.querySelector('input')?.value;
    console.log('input?', inputValue);
    //dateRef.current?.querySelector('.date-btn')?.classList.add('on');
  };

  const handleDate =()=>{
    const inputValue = dateRef.current?.querySelector('.datePicker-input')?.querySelector('input')?.value;
    console.log('날짜조회 클릭', inputValue)
 
     if(inputValue){
       console.log(inputValue);
       const newDate = inputValue.split('~');
       setPickedDate(newDate);
     }else{
      setPickedDate(undefined);
     }
    /*dateRef.current?.querySelector('.date-btn')?.classList.remove('on'); */
  }

  // console.log('selectedFilter 아이디 나오냐???', selectedFilter);
  // console.log('keyword', keyword);

  return (
    <>
      {isDetail && (
        <CommonDetail
          setIsDetail={setIsDetail}
          type="USER"
          memberIdx={detatilId}
        />
      )}
      <Wrapper>
        <AdminHeader title="회원관리" subTitle="일반회원" type="main" />
        <Manager>
          <li className="search">
            <label>회원 검색</label>
            <SelectBox value={selectValue} onChange={handleChange}>
              {selectOption.map((el, idx) => (
                <MenuItem
                  key={idx}
                  value={selectOption[idx]}
                  onClick={() => {
                    setSelectedFilter(idx);
                  }}
                >
                  {selectOption[idx]}
                </MenuItem>
              ))}
            </SelectBox>
            {/* <input type="text" value={keyword} className="searchInput" /> */}
            <input
              type="text"
              placeholder="검색"
              className="searchInput"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <Btn>검색</Btn>
          </li>
          <li className="search" ref={dateRef}>
            <label>기간검색</label>
            {/* 레인지 달력 */}
            <DateRangePicker className='datePicker-input'
              placeholder={'년-월-일 ~ 년-월-일'}
              size={'sm'}
              onChange={handleDateChange}
            />
            <Btn onClick={handleDate} className='date-btn'>조회</Btn>
          </li>
        </Manager>
        <Table
          keyword={keyword}
          selectedFilter={selectedFilter}
          setIsDetail={setIsDetail}
          setDetailId={setDetailId}
          tableType={'userData'}
          pickedDate={pickedDate}
        />
      </Wrapper>
    </>
  );
};

export default UserManagement;

const Wrapper = styled.div`
  /* border: 1px solid red; */
  width: 100%;

  margin: 0 18pt;
`;
const Manager = styled.ul`
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
const SelectBox = styled(Select)`
  width: 87pt;
  height: 100%;
`;
const Btn = styled.button`
 cursor: default;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  /* identical to box height, or 21px */
  outline: none;
  text-align: center;
  border-radius: 3pt;
  padding: 1.5pt 14.25pt;
  height: 19.5pt;
  color: #747780;
  /* background-color: red; */
  &.on{
    background: #464646;
    cursor: pointer;
  }
`;

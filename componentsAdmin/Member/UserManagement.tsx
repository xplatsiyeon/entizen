import styled from '@emotion/styled';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import AdminHeader from 'componentsAdmin/Header';
import React, { useEffect, useRef, useState } from 'react';
import colors from 'styles/colors';
import CommonDetail from './CommonDetail';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { AdminBtn } from 'componentsAdmin/Layout';
import { Range } from 'react-date-range';
import { adminDateFomat } from 'utils/calculatePackage';
import UserManagementTable from './UserManagementTable';
import AdminDateRange from 'componentsAdmin/AdminDateRange';

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const selectOption = ['이메일 검색', '연락처 검색', '이름 검색'];
const selectOptionEn = ['id', 'phone', 'name'];
const UserManagement = ({ setNowHeight }: Props) => {
  const [selectValue, setSelectValue] = useState('이메일 검색');

  //이름검색인지 연락처 검색인지 판별
  const [selectedFilter, setSelectedFilter] = useState<number>(0);

  //검색창에 입력되는 값
  const [inputValue, setInputValue] = useState<string>('');

  // onClick 할때 값이 바뀌도록
  const [userSearch, setUserSearch] = useState<string>('');

  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');
  const [pickedDate, setPickedDate] = useState<string[]>();
  const today = new Date();

  const [isDate, setIsDate] = useState(false);
  const [dateState, setDateState] = useState<Range[]>([
    {
      startDate: new Date('2022-09-05'),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const excelUrl = `/admin/members/users/excel?page=1&limit=10&startDate=${adminDateFomat(
    dateState[0].startDate!,
  )}&endDate=${adminDateFomat(
    dateState[0].endDate!,
  )}&searchType=id&searchKeyword=`;

  const dateRef = useRef<HTMLLIElement>(null);

  // 셀렉트 박스 변경함수
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setSelectValue(event.target.value as string);
  };

  // 달력 날짜 변경 함수
  const handleDateChange = (
    value: DateRange | null,
    event: React.SyntheticEvent<Element, Event>,
  ) => {
    const inputValue = dateRef.current
      ?.querySelector('.datePicker-input')
      ?.querySelector('input')?.value;
    // console.log('input?', inputValue);
    dateRef.current?.querySelector('.date-btn')?.classList.add('on');
    setTimeout(() => {
      dateRef.current?.querySelector('.date-btn')?.classList.remove('on');
    }, 600);
  };

  const handleDate = () => {
    setPickedDate([
      adminDateFomat(dateState[0].startDate!),
      adminDateFomat(dateState[0].endDate!),
    ]);
  };

  // 엑셀 다운로드
  const handleCommon = () => {
    alert('개발중입니다.');
  };

  useEffect(() => {
    if (setNowHeight) {
      setNowHeight(window.document.documentElement.scrollHeight);
    }
  }, []);

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
              placeholder={
                selectValue === '연락처 검색'
                  ? '연락처 검색시 숫자만 입력해주세요.'
                  : '검색'
              }
              className="searchInput"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setUserSearch(inputValue);
                }
              }}
            />
            <AdminBtn
              onClick={() => {
                setUserSearch(inputValue);
              }}
            >
              검색
            </AdminBtn>
          </li>
          <li className="search" ref={dateRef}>
            <label>기간검색</label>
            {/* 레인지 달력 */}
            {/* <DateRangePicker
              defaultValue={[new Date('2022-09-05'), new Date()]}
              className="datePicker-input"
              placeholder={'년-월-일 ~ 년-월-일'}
              size={'sm'}
              onChange={handleDateChange}
            /> */}
            <AdminDateRange
              dateState={dateState}
              setDateState={setDateState}
              isDate={isDate}
              setIsDate={setIsDate}
              setPickedDate={setPickedDate}
            />
            <AdminBtn onClick={handleDate} className="date-btn">
              조회
            </AdminBtn>
          </li>
        </Manager>
        <UserManagementTable
          setIsDetail={setIsDetail}
          setDetailId={setDetailId}
          tableType={'userData'}
          pickedDate={pickedDate}
          userSearch={userSearch}
          commonBtn={'엑셀 다운로드'}
          excelUrl={excelUrl}
          searchType={selectOptionEn[selectedFilter]}
        />
      </Wrapper>
    </>
  );
};

export default UserManagement;

const Wrapper = styled.div`
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
    padding-left: 10px;
  }
  .search {
    width: 946px;
  }
`;
const SelectBox = styled(Select)`
  width: 100pt;
  height: 100%;
`;

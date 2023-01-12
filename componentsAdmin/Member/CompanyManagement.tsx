import styled from '@emotion/styled';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useQuery, useQueryClient } from 'react-query';
import AdminHeader from 'componentsAdmin/Header';
import { AdminBtn } from 'componentsAdmin/Layout';
import React, { useEffect, useRef, useState } from 'react';
import { isTokenAdminGetApi } from 'api';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import colors from 'styles/colors';
import CommonDetail from './CommonDetail';
import UserManagementTable from './UserManagementTable';
import { ComUserData, UserData } from 'types/tableDataType';

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const selectOption = ['이름 검색', '아이디 검색'];
const CompanyManagement = ({ setNowHeight }: Props) => {
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');
  const [selectValue, setSelectValue] = useState('이름 검색');
  //이름검색인지 아이디검색인지 판별
  const [selectedFilter, setSelectedFilter] = useState<number>(0);

  //검색창에 입력되는 값
  const [inputValue, setInputValue] = useState<string>('');

  // onClick 할때 값이 바뀌도록
  const [companySearch, setCompanySearch] = useState<string>('');

  const [pickedDate, setPickedDate] = useState<string[]>();
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
          type={'COMPANY'}
          memberIdx={detatilId}
        />
      )}

      <Wrapper>
        <AdminHeader title="회원관리" subTitle="기업회원" type="main" />
        <Manager>
          <li className="search">
            <label>회원 검색</label>
            <SelectBox value={selectValue} onChange={handleChange} displayEmpty>
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setCompanySearch(inputValue);
                }
              }}
            />
            <AdminBtn
              onClick={() => {
                setCompanySearch(inputValue);
              }}
            >
              검색
            </AdminBtn>
          </li>
          <li className="search" ref={dateRef}>
            <label>기간검색</label>
            {/* 레인지 달력 */}
            <DateRangePicker
              defaultValue={[new Date('2022-09-05'), new Date()]}
              className="datePicker-input"
              placeholder={'년-월-일 ~ 년-월-일'}
              size={'sm'}
              onChange={handleDateChange}
            />
            <AdminBtn onClick={handleDate}>조회</AdminBtn>
          </li>
        </Manager>
        {/* 테이블 컴포넌트 */}
        <UserManagementTable
          selectedFilter={selectedFilter}
          setIsDetail={setIsDetail}
          setDetailId={setDetailId}
          tableType={'comUserData'}
          pickedDate={pickedDate}
          userSearch={companySearch}
          commonBtn={'엑셀 다운로드'}
          handleCommon={handleCommon}
        />
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
    padding-left: 10px;
  }
  .search {
    width: 946px;
  }
`;
const SelectBox = styled(Select)`
  width: 87pt;
  height: 100%;
`;

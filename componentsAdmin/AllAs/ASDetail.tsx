import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import AdminHeader from 'componentsAdmin/Header';
import ASDetailView from './ASDetailView';
import ASListTable from './ASListTable';
import AdminDateRange from 'componentsAdmin/AdminDateRange';
import { Range } from 'react-date-range';
import { adminDateFomat } from 'utils/calculatePackage';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const selectOption = ['제목', '주소'];
export type selectOption = '제목' | '주소';

const ASDetail = ({ setNowHeight }: Props) => {
  const [isDetail, setIsDetail] = useState(false);
  const [pickedDate, setPickedDate] = useState<string[]>();
  const [searchType, setSearchType] = useState<selectOption>('제목');
  const [isDate, setIsDate] = useState(false);
  const [onClickButton, setOnClickButton] = useState(false);
  const [dateState, setDateState] = useState<Range[]>([
    {
      startDate: new Date('2022-09-05'),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const excelUrl = `/admin/after-sales-services/excel?page=1&limit=10&startDate=${adminDateFomat(
    dateState[0].startDate!,
  )}&endDate=${adminDateFomat(dateState[0].endDate!)}&searchKeyword=`;

  //검색창에 입력되는 값
  const [inputValue, setInputValue] = useState<string>('');
  // onClick 할때 값이 바뀌도록
  const [userSearch, setUserSearch] = useState<string>('');

  // id 값 넘겨 오셈
  const [afterSalesServiceIdx, setAfterSalesServiceIdx] = useState<number>(0);
  const dateRef = useRef<HTMLLIElement>(null);

  // 기간 검색 조회 버튼
  const handleDate = () => {
    setPickedDate([
      adminDateFomat(dateState[0].startDate!),
      adminDateFomat(dateState[0].endDate!),
    ]);
  };

  // 검색 조회 버튼
  const onClickSearchBtn = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserSearch(inputValue);
    setOnClickButton((prev) => !prev);
  };

  // 셀렉트 박스 변경함수
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setSearchType(event.target.value as selectOption);
  };

  useEffect(() => {
    if (setNowHeight) {
      setNowHeight(window.document.documentElement.scrollHeight);
    }
  }, []);

  return (
    <Wrapper>
      {isDetail && (
        <ASDetailView
          setIsDetail={setIsDetail}
          afterSalesServiceIdx={afterSalesServiceIdx}
          setNowHeight={setNowHeight}
        />
      )}
      <AdminHeader title="A/S" type="main" />
      <Search>
        {/*================= 제목,주소 검색 ================= */}
        <li className="search">
          <label>검색</label>
          <SelectBox value={searchType} onChange={handleChange}>
            {selectOption.map((el, idx) => (
              <MenuItem
                key={idx}
                value={selectOption[idx]}
                onClick={() => {
                  setSearchType(selectOption[idx] as selectOption);
                }}
              >
                {selectOption[idx]}
              </MenuItem>
            ))}
          </SelectBox>
          <form className="searchForm" onSubmit={onClickSearchBtn}>
            <SearchBox
              type="text"
              placeholder="검색"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setUserSearch(inputValue);
                }
              }}
            />
            <Btn type={'submit'}>
              <Text>조회</Text>
            </Btn>
          </form>
        </li>
        {/*================== 달력 검색 =================== */}
        <li className="search" ref={dateRef}>
          <label>기간검색</label>
          {/* 달력 컴포넌트 */}
          <AdminDateRange
            dateState={dateState}
            setDateState={setDateState}
            isDate={isDate}
            setIsDate={setIsDate}
            setPickedDate={setPickedDate}
          />
          <Btn onClick={handleDate}>
            <Text>조회</Text>
          </Btn>
        </li>
      </Search>
      {/* ================== AS 리스트 테이블 ====================== */}
      <ASListTable
        onClickButton={onClickButton}
        setIsDetail={setIsDetail}
        tableType={'asData'}
        pickedDate={pickedDate}
        setAfterSalesServiceIdx={setAfterSalesServiceIdx}
        commonBtn={'엑셀 다운로드'}
        excelUrl={excelUrl}
        userSearch={userSearch}
        searchType={searchType}
      />
    </Wrapper>
  );
};

export default ASDetail;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 18pt;
`;

const Search = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  label {
    min-width: 50px;
    margin-right: 39.75pt;
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
  .search {
    width: 946px;
  }
  .searchForm {
    display: flex;
    align-items: flex-start;
    width: 100%;
    height: 100%;
  }
`;
const Btn = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 3pt;
  padding: 5px 17px;
  height: 19.5pt;
  background: #e2e5ed;
  border: 1px solid #747780;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  outline: none;
  text-align: center;
`;

const Text = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #747780;
  text-align: center;
`;

const SearchBox = styled.input`
  border: 1px solid ${colors.lightWhite3};
  height: 100%;
  width: 274.5pt;
  border-radius: 4px;
  margin-right: 15px;
  padding-left: 10px;
`;
const SelectBox = styled(Select)`
  width: 100pt;
  height: 100%;
`;

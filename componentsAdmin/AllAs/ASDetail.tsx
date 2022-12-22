import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
} from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import colors from 'styles/colors';
import Table from 'componentsAdmin/table';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { DateRangePicker } from 'rsuite';
import AdminHeader from 'componentsAdmin/Header';
import ASDetailView from './ASDetailView';

type Props = {};

const ASDetail = () => {
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');
  const [pickedDate, setPickedDate] = useState<string[]>();

  //검색창에 입력되는 값
  const [inputValue, setInputValue] = useState<string>('');
  // onClick 할때 값이 바뀌도록
  const [userSearch, setUserSearch] = useState<string>('');

  // id 값 넘겨 오셈
  const [afterSalesServiceIdx, setAfterSalesServiceIdx] = useState<number>(0);

  const dateRef = useRef<DateRange>();

  const handleDate = () => {
    const date = dateRef.current;
    console.log(date);
  };

  // 달력 날짜 변경 함수
  const handleDateChange = (
    value: DateRange | null,
    event: React.SyntheticEvent<Element, Event>,
  ) => {
    console.log('ref', dateRef.current);
  };
  return (
    <Wrapper>
      {isDetail && (
        <ASDetailView
          setIsDetail={setIsDetail}
          afterSalesServiceIdx={afterSalesServiceIdx}
        />
      )}
      <AdminHeader title="A/S" type="main" />
      <Search>
        <li className="search">
          <label>기간검색</label>
          {/* 달력 컴포넌트 */}
          <DateRangePicker
            placeholder={'년-월-일 ~ 년-월-일'}
            size={'sm'}
            onChange={handleDateChange}
          />
          <Btn>
            <Text onClick={handleDate}>조회</Text>
          </Btn>
        </li>
        <li className="search">
          <label>검색</label>
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
          <Btn>
            <Text
              onClick={() => {
                setUserSearch(inputValue);
              }}
            >
              조회
            </Text>
          </Btn>
        </li>
      </Search>
      <Table
        setDetailId={setDetailId}
        setIsDetail={setIsDetail}
        tableType={'asData'}
        pickedDate={pickedDate}
        setAfterSalesServiceIdx={setAfterSalesServiceIdx}
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
    width: 50px;
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
  ::placeholder {
    padding-left: 10px;
  }
`;

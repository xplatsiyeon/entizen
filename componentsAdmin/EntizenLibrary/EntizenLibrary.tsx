import React, { useEffect, useRef, useState } from 'react';
import { AdminBtn } from 'componentsAdmin/Layout';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import AdminHeader from 'componentsAdmin/Header';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { DateRangePicker, Modal } from 'rsuite';
import EntizenLibraryTable from './EntizenLibraryTable';
import { isTokenPatchApi, isTokenGetApi } from 'api';
import { useQuery, useQueryClient } from 'react-query';
import ModalLibrary, { LibraryResponse } from './ModalLibrary';
import AdminDateRange from 'componentsAdmin/AdminDateRange';
import { Range } from 'react-date-range';
import { adminDateFomat } from 'utils/calculatePackage';

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const EntizenLibrary = ({ setNowHeight }: Props) => {
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');
  const [pickedDate, setPickedDate] = useState<string[]>();
  const [isDate, setIsDate] = useState(false);
  const [dateState, setDateState] = useState<Range[]>([
    {
      startDate: new Date('2022-09-05'),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const dateRef = useRef<HTMLLIElement>(null);

  // 오늘 날짜.
  const today = new Date();

  //검색창에 입력되는 값
  const [inputValue, setInputValue] = useState<string>('');
  // onClick 할때 값이 바뀌도록
  const [userSearch, setUserSearch] = useState<string>('');

  // id 값 넘겨 오셈
  const [afterSalesServiceIdx, setAfterSalesServiceIdx] = useState<string>('');

  const { data, isLoading, isError, refetch, remove } =
    useQuery<LibraryResponse>('entizenLibraryDetail', () =>
      isTokenGetApi(`/admin/libraries/${afterSalesServiceIdx}`),
    );

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

  const handleCommon = () => {
    setIsDetail(true);
    remove();
    setAfterSalesServiceIdx('');
  };

  useEffect(() => {
    if (isDetail === false) {
      remove();
    }
  }, [isDetail]);

  useEffect(() => {
    if (setNowHeight) {
      setNowHeight(window.document.documentElement.scrollHeight);
    }
  }, []);

  return (
    <Wrapper>
      {isDetail && (
        <ModalLibrary
          afterSalesServiceIdx={afterSalesServiceIdx}
          setIsDetail={setIsDetail}
        />
      )}

      <AdminHeader title="엔티즌 도서관" type="main" />
      <Search>
        <li className="search" ref={dateRef}>
          <label>기간검색</label>
          {/* 달력 컴포넌트 */}
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
      <EntizenLibraryTable
        setDetailId={setDetailId}
        setIsDetail={setIsDetail}
        tableType={'entizenLibrary'}
        pickedDate={pickedDate}
        setAfterSalesServiceIdx={setAfterSalesServiceIdx}
        commonBtn={'추가'}
        handleCommon={handleCommon}
      />
    </Wrapper>
  );
};

export default EntizenLibrary;
const Wrapper = styled.div`
  width: 100%;
  padding: 0 18pt;
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

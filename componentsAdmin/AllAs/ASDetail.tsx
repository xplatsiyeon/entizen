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
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { DateRangePicker } from 'rsuite';
import AdminHeader from 'componentsAdmin/Header';
import ASDetailView from './ASDetailView';
import ASListTable from './ASListTable';
import { adminNoPickDateFomat } from 'utils/calculatePackage';
import AdminDateRange from 'componentsAdmin/AdminDateRange';
import { Range } from 'react-date-range';
import { adminDateFomat } from 'utils/calculatePackage';

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const ASDetail = ({ setNowHeight }: Props) => {
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

  // 달력 날짜 변경 함수
  // const handleDateChange = (
  //   value: DateRange | null,
  //   event: React.SyntheticEvent<Element, Event>,
  // ) => {
  //   const inputValue = dateRef.current
  //     ?.querySelector('.datePicker-input')
  //     ?.querySelector('input')?.value;
  //   console.log('input?', inputValue);
  //   dateRef.current?.querySelector('.date-btn')?.classList.add('on');
  //   setTimeout(() => {
  //     dateRef.current?.querySelector('.date-btn')?.classList.remove('on');
  //   }, 600);
  // };

  const handleDate = () => {
    setPickedDate([
      adminDateFomat(dateState[0].startDate!),
      adminDateFomat(dateState[0].endDate!),
    ]);
    // const inputValue = dateRef.current
    // ?.querySelector('.datePicker-input')
    // ?.querySelector('input')?.value;
    // console.log('날짜조회 클릭', inputValue);

    // if (inputValue) {
    // console.log(inputValue);
    // const newDate = inputValue.split('~');
    // } else {
    //   setPickedDate(undefined);
    // }
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
        <li className="search" ref={dateRef}>
          <label>기간검색</label>
          {/* 달력 컴포넌트 */}
          {/* <DateRangePicker
            defaultValue={[new Date('2022-09-05'), new Date()]}
            className="datePicker-input"
            placeholder={'년-월-일 ~ 년-월-일'}
            size={'sm'}
            onChange={handleDateChange}
            style={{ cursor: 'pointer' }}
          /> */}
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
      <ASListTable
        setDetailId={setDetailId}
        setIsDetail={setIsDetail}
        tableType={'asData'}
        pickedDate={pickedDate}
        setAfterSalesServiceIdx={setAfterSalesServiceIdx}
        commonBtn={'엑셀 다운로드'}
        excelUrl={excelUrl}
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

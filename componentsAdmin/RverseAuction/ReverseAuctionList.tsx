import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import React, { useEffect, useRef, useState } from 'react';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { DateRangePicker } from 'rsuite';
import colors from 'styles/colors';
import DetailQuotation from './DetailQuotation';
import { AdminBtn } from 'componentsAdmin/Layout';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import ReverseAuctionTable from './ReverseAuctionTable';
import { adminNoPickDateFomat } from 'utils/calculatePackage';
import AdminDateRange from 'componentsAdmin/AdminDateRange';
import { Range } from 'react-date-range';
import { adminDateFomat } from 'utils/calculatePackage';

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const processStatus = [
  '견적대기',
  '견적마감',
  '견적취소',
  '현장실사 조율 중',
  '현장실사 예약 완료',
  '최종견적 대기 중',
  '낙찰대기 중',
  '낙찰완료',
];
export const processStatusEn = [
  'IN_PROGRESS',
  'CLOSED',
  'CANCEL',
  'DUE_DILIGENCE_COORDINATION',
  'DUE_DILIGENCE_COMPLETED_RESERVATION',
  'AWAITING_FINAL_QUOTATION',
  'AWAITING_BID',
  'COMPLETED_BID',
];

const ReverseAuctionList = ({ setNowHeight }: Props) => {
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');

  //검색창에 입력되는 값
  const [inputValue, setInputValue] = useState<string>('');

  // onClick 할때 값이 바뀌도록
  const [userSearch, setUserSearch] = useState<string>('');

  // 진행상태 체크박스에 값 넣고 빼기
  const [process, setProcess] = useState<Array<string>>([]);
  const checkProcessHandle = (checked: boolean, user: string) => {
    if (checked) {
      setProcess((prev) => [...prev, user]);
    } else {
      setProcess(process.filter((el) => el !== user));
    }
  };

  // 백엔드에 체크박스 선택값 배열에 영문으로 보내줌
  const changeEn = process.map((data) => {
    if (data === '견적대기') {
      return 'IN_PROGRESS';
    } else if (data === '견적마감') {
      return 'CLOSED';
    } else if (data === '견적취소') {
      return 'CANCEL';
    } else if (data === '현장실사 조율 중') {
      return 'DUE_DILIGENCE_COORDINATION';
    } else if (data === '현장실사 예약 완료') {
      return 'DUE_DILIGENCE_COMPLETED_RESERVATION';
    } else if (data === '최종견적 대기 중') {
      return 'AWAITING_FINAL_QUOTATION';
    } else if (data === '낙찰대기 중') {
      return 'AWAITING_BID';
    } else if (data === '낙찰완료') {
      return 'COMPLETED_BID';
    }
  });

  const processQueryString = changeEn
    .map((e) => `&inProgressStatuses[]=${e}`)
    .join('');

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
  const today = new Date();
  const excelUrl = `/admin/quotations/quotation-requests/excel?page=1&limit=1000&startDate=${adminDateFomat(
    dateState[0].startDate!,
  )}&endDate=${adminDateFomat(
    dateState[0].endDate!,
  )}&searchKeyword=&inProgressStatuses[]=`;
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

  const { quotationRequestIdx, isCompanyDetail } = useSelector(
    (state: RootState) => state.adminReverseData,
  );

  useEffect(() => {
    if (setNowHeight) {
      setNowHeight(window.document.documentElement.scrollHeight);
    }
  }, []);

  return (
    <Wrapper>
      {isDetail && (
        <DetailQuotation
          detatilId={detatilId}
          setDetailId={setDetailId}
          setIsDetail={setIsDetail}
          setNowHeight={setNowHeight}
        />
      )}
      <AdminHeader title="역경매 관리" type="main" />
      <Manager>
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
          <AdminBtn onClick={handleDate}>조회</AdminBtn>
        </li>
        <li className="search">
          <label>진행 상태</label>
          <CheckBoxWrapper>
            {processStatus.map((data, idx) => (
              <CheckBoxLabel key={data}>
                <CheckBox
                  type="checkbox"
                  id={data}
                  value={data}
                  onChange={(e) => {
                    checkProcessHandle(e.currentTarget.checked, e.target.id);
                  }}
                />
                <CheckBoxText>{data}</CheckBoxText>
              </CheckBoxLabel>
            ))}
          </CheckBoxWrapper>
        </li>
        <li className="search">
          <label className="idsearch">아이디 검색</label>
          <input
            type="text"
            placeholder="검색"
            className="searchInput"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setUserSearch(inputValue);
              }
            }}
            style={{ paddingLeft: '8px' }}
          />
          <AdminBtn
            onClick={() => {
              setUserSearch(inputValue);
            }}
          >
            검색
          </AdminBtn>
        </li>
      </Manager>
      <ReverseAuctionTable
        setDetailId={setDetailId}
        setIsDetail={setIsDetail}
        tableType={'quotationListData'}
        pickedDate={pickedDate}
        commonBtn={'엑셀 다운로드'}
        excelUrl={excelUrl}
        bidBtn={'입찰 내용'}
        bidExcelUrl={excelUrl} /* jungmin 엑셀 url 수정 필요 */
        pagenationHide={false}
        processQueryString={processQueryString}
        userSearch={userSearch}
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
    padding-right: 20pt;
  }
  .idsearch {
    padding-right: 30pt;
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
    border-radius: 4px;
  }
  .search {
    width: 1150px;
  }
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const CheckBoxLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
`;

const CheckBox = styled.input`
  appearance: none;
  margin-right: 5px;
  width: 16px;
  height: 16px;
  border: 1px solid #464646;
  border-radius: 3px;
  cursor: pointer;
  &:checked {
    border-color: transparent;
    background-image: url(/images/CheckBoxWhiteCheck.svg);
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #464646;
    cursor: pointer;
  }
`;

const CheckBoxText = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: normal;
  font-size: 16px;
  color: #000000;
`;

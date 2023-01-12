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

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const processStatus = ['견적마감', '견적취소'];
export const processStatusEn = ['USER', 'COMPANY'];

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

  const { quotationRequestIdx, isCompanyDetail } = useSelector(
    (state: RootState) => state.adminReverseData,
  );

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
          <DateRangePicker
            defaultValue={[new Date('2022-09-05'), new Date()]}
            className="datePicker-input"
            placeholder={'년-월-일 ~ 년-월-일'}
            size={'sm'}
            onChange={handleDateChange}
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
        tableType={'quetationListData'}
        pickedDate={pickedDate}
        commonBtn={'엑셀 다운로드'}
        handleCommon={handleCommon}
        pagenationHide={false}
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
    width: 946px;
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

import styled from '@emotion/styled';
import DashBoardTable from 'componentsAdmin/MainDashboard/DashBoardTable';
import AdminHeader from 'componentsAdmin/Header';
import React, { useEffect, useRef, useState } from 'react';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import colors from 'styles/colors';
import * as XLSX from 'xlsx';
import AdminDateRange from 'componentsAdmin/AdminDateRange';
import { adminDateFomat } from 'utils/calculatePackage';
import { Range } from 'react-date-range';

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
};
// new: 신규, awaitingBid: 낙찰대기, closed: 견적마감, cancel: 견적취소
const projectStateType = [
  '진행 중',
  '견적 마감',
  '견적 취소',
  '현장실사 조율 중',
  '현장실사 예약 완료',
  '최종견적 대기 중',
  '낙찰대기 중',
  '낙찰완료',
];
const projectStateTypeEn = [
  'IN_PROGRESS',
  'CLOSED',
  'CANCEL',
  'DUE_DILIGENCE_COORDINATION',
  'DUE_DILIGENCE_COMPLETED_RESERVATION',
  'AWAITING_FINAL_QUOTATION',
  'AWAITING_BID',
  'COMPLETED_BID',
];

const ReverseAuctionSituation = ({ setNowHeight }: Props) => {
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
  const excelUrl = `/admin/dashboards/quotation-requests/excel?page=1&limit=1000&startDate=${adminDateFomat(
    dateState[0].startDate!,
  )}&endDate=${adminDateFomat(dateState[0].endDate!)}`;
  //검색창에 입력되는 값
  const dateRef = useRef<HTMLLIElement>(null);

  // const [projectState, setProjectState] = useState(
  //   Array(projectStateType.length).fill(false),
  // );
  const [projectState, setProjectState] = useState<Array<string>>([]);

  const checkStatusHandle = (checked: boolean, status: string) => {
    if (checked) {
      setProjectState((prev) => [...prev, status]);
    } else {
      setProjectState(projectState.filter((el) => el !== status));
    }
  };

  // 백엔드에 체크박스 선택값 배열에 영문으로 보내줌
  const changeEn = projectState.map((data) => {
    if (data === '진행 중') {
      return 'IN_PROGRESS';
    } else if (data === '견적 막감') {
      return 'CLOSED';
    } else if (data === '견적 취소') {
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

  // 백엔드에 보내주는 쿼리
  const reverseAuctionString = changeEn
    .map((e) => `&inProgressStatuses[]=${e}`)
    .join('');

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
  // 프로젝트 체크 박스 변경 함수
  // const onChangeProjectCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
  //   const index = Number(event.target.dataset.index);
  //   const temp = [...projectState];
  //   temp[index] = !temp[index];
  //   setProjectState(temp);
  // };

  useEffect(() => {
    console.log(projectState);
  }, [projectState]);

  useEffect(() => {
    if (setNowHeight) {
      setNowHeight(window.document.documentElement.scrollHeight);
    }
  }, []);

  return (
    <Wrapper>
      <AdminHeader type="main" title="메인대시보드" subTitle="역경매 현황" />
      <Manager>
        {/* project row */}
        <li className="row">
          <label className="label">역경매 상태</label>
          {projectStateType.map((state, index) => (
            <span className="checkBoxContainer" key={state + index}>
              <input
                type={'checkbox'}
                className="checkBox"
                data-index={index}
                id={state}
                onChange={(e) => {
                  checkStatusHandle(e.currentTarget.checked, e.target.id);
                }}
                style={{ cursor: 'pointer' }}
              />
              <span>{state}</span>
            </span>
          ))}
        </li>
        {/* 레인지 달력 */}
        <li className="row" ref={dateRef}>
          <label className="label">기간검색</label>
          <AdminDateRange
            dateState={dateState}
            setDateState={setDateState}
            isDate={isDate}
            setIsDate={setIsDate}
            setPickedDate={setPickedDate}
          />
        </li>
      </Manager>
      <BtnBox onClick={handleDate}>
        <Btn>조회</Btn>
      </BtnBox>
      <DashBoardTable
        setDetailId={setDetailId}
        setIsDetail={setIsDetail}
        tableType={'reverseAuctionSituation'}
        excelUrl={excelUrl}
        quotationRequestStatus={reverseAuctionString}
        commonBtn={'엑셀 다운로드'}
        pickedDate={pickedDate}
      />
    </Wrapper>
  );
};

export default ReverseAuctionSituation;

const Wrapper = styled.div`
  padding-left: 18pt;
`;

const Manager = styled.ul`
  li {
    /* gap: 7.5pt; */
    display: flex;
    align-items: center;
    background: #ffffff;
    border: 1px solid ${colors.lightWhite3};
    height: 30pt;
    padding: 4pt 0 4pt 12pt;
  }
  .searchInput {
    border: 1px solid ${colors.lightWhite3};
    height: 100%;
    width: 274.5pt;
    padding-left: 10px;
  }
  .row {
    width: 100%;
  }
  .label {
    min-width: 94px;
    margin-right: 24px;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: ${colors.main2};
  }
  .checkBoxContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin-right: 16px;
  }
  .checkBox {
    width: 16px;
    height: 16px;
  }
`;

const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Btn = styled.button`
  padding: 2px 17px;
  background: #464646;
  border: none;
  color: ${colors.lightWhite};
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
`;

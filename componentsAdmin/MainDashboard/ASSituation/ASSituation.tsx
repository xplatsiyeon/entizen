import styled from '@emotion/styled';
import DashBoardTable from 'componentsAdmin/MainDashboard/DashBoardTable';
import AdminHeader from 'componentsAdmin/Header';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import colors from 'styles/colors';
import {
  adminDateFomat,
  dateFomat,
  hyphenFn,
  convertKo,
  convertEn,
} from 'utils/calculatePackage';

type Props = {};
// awaitingContract: 계약 대기, completion: 완료, completionAgreement: 완료동의
const projectStateType = ['접수요청', '완료대기', '완료'];
const projectStateTypeEn = ['request', 'awaitingCompletion', 'completion'];

const ASSituation = (props: Props) => {
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');
  //검색창에 입력되는 값
  const dateRef = useRef<HTMLLIElement>(null);

  const [projectState, setProjectState] = useState<string[]>([]);

  // 체크박스 함수
  const checkStatusHandle = (checked: boolean, status: string) => {
    if (checked) {
      setProjectState((prev) => [...prev, status]);
    } else {
      setProjectState(projectState.filter((el) => el !== status));
    }
  };

  // 백엔드에 체크박스 선택값 배열에 영문으로 보내줌
  const changeEn = projectState.map((data) => {
    if (data === '접수요청') {
      return 'request';
    } else if (data === '완료대기') {
      return 'awaitingCompletion';
    } else if (data === '완료') {
      return 'completion';
    }
  });

  // 백엔드에 붙여주는 쿼리
  const asString = changeEn
    .map((e) => `&afterSalesServiceStatus[]=${e}`)
    .join('');

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

  // 엑셀 다운로드 버튼
  const handleCommon = () => {
    alert('2차 작업범위입니다.');
  };

  useEffect(() => {
    console.log(projectState);
  }, [projectState]);

  console.log('🌸 asString 🌸', asString);

  return (
    <Wrapper>
      <AdminHeader type="main" title="메인대시보드" subTitle="A/S 현황" />
      <Manager>
        {/* project row */}
        <li className="row">
          <label className="label">A/S 상태</label>
          {projectStateType.map((state, index) => (
            <span className="checkBoxContainer" key={state + index}>
              <input
                type={'checkbox'}
                className="checkBox"
                data-index={index}
                id={state}
                // onChange={onChangeProjectCheckBox}
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
          <DateRangePicker
            className="datePicker-input"
            placeholder={'년-월-일 ~ 년-월-일'}
            size={'sm'}
            onChange={handleDateChange}
          />
        </li>
      </Manager>
      <BtnBox>
        <Btn>조회</Btn>
      </BtnBox>
      <DashBoardTable
        setDetailId={setDetailId}
        setIsDetail={setIsDetail}
        tableType={'asListSituationList'}
        handleCommon={handleCommon}
        asStatusCheck={asString}
        commonBtn={'엑셀 다운로드'}
      />
    </Wrapper>
  );
};

export default ASSituation;

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
    width: 100%;
  }
  .searchInput {
    border: 1px solid ${colors.lightWhite3};
    height: 100%;
    width: 274.5pt;
    padding-left: 10px;
  }
  .row {
    width: 946px;
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

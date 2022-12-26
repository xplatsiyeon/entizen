import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import colors from 'styles/colors';

type Props = {};

const projectStateType = ['전체', '신규', '낙찰대기', '계약대기', '완료'];
const asStateType = ['접수요청', '완료대기'];

const ProjectSituation = (props: Props) => {
  //검색창에 입력되는 값
  const dateRef = useRef<HTMLLIElement>(null);

  const [projectState, setProjectState] = useState(
    Array(projectStateType.length).fill(false),
  );
  const [asState, setAsState] = useState(Array(asStateType.length).fill(false));

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

  // 프로젝트 체크 박스 변경 함수
  const onChangeProjectCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    const index = Number(event.target.dataset.index);
    const temp = [...projectState];
    temp[index] = !temp[index];
    setProjectState(temp);
  };
  // as 체크 박스 변경 함수
  const onChangeAsCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    const index = Number(event.target.dataset.index);
    const temp = [...asState];
    temp[index] = !temp[index];
    setAsState(temp);
  };

  useEffect(() => {
    console.log(asState);
    console.log(projectState);
  }, [asState, projectState]);

  return (
    <Wrapper>
      <AdminHeader type="main" title="메인대시보드" subTitle="프로젝트 현황" />
      <Manager>
        {/* project row */}
        <li className="row">
          <label className="label">프로젝트 상태</label>
          {projectStateType.map((state, index) => (
            <span className="checkBoxContainer" key={state + index}>
              <input
                type={'checkbox'}
                className="checkBox"
                data-index={index}
                onChange={onChangeProjectCheckBox}
              />
              <span>{state}</span>
            </span>
          ))}
        </li>
        {/* a/s row */}
        <li className="row">
          <label className="label">A/S</label>
          {asStateType.map((state, index) => (
            <span className="checkBoxContainer" key={state + index}>
              <input
                type={'checkbox'}
                className="checkBox"
                data-index={index}
                onChange={onChangeAsCheckBox}
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
    </Wrapper>
  );
};

export default ProjectSituation;

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

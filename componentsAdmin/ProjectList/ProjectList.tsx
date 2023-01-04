import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import React, { useRef, useState } from 'react';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { DateRangePicker } from 'rsuite';
import colors from 'styles/colors';
import ProjectDetail from './ProjectDetail';
import { AdminBtn } from 'componentsAdmin/Layout';
import ProjectListTable from './ProjectListTable';

const ProjectList = () => {
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');
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

  // 엑셀 다운로드
  const handleCommon = () => {
    alert('2차 작업범위입니다.');
  };

  return (
    <Wrapper>
      {isDetail && (
        <ProjectDetail
          setIsDetail={setIsDetail}
          projectIdx={Number(detatilId!)}
        />
      )}
      <AdminHeader title="프로젝트" type="main" />
      <Manager>
        <li className="search" ref={dateRef}>
          <label>기간검색</label>
          {/* 달력 컴포넌트 */}
          <DateRangePicker
            className="datePicker-input"
            placeholder={'년-월-일 ~ 년-월-일'}
            size={'sm'}
            onChange={handleDateChange}
          />
          <AdminBtn onClick={handleDate}>조회</AdminBtn>
        </li>
      </Manager>
      <ProjectListTable
        setDetailId={setDetailId}
        setIsDetail={setIsDetail}
        tableType={'projectListData'}
        pickedDate={pickedDate}
        commonBtn={'엑셀 다운로드'}
        handleCommon={handleCommon}
      />
    </Wrapper>
  );
};

export default ProjectList;

const Wrapper = styled.div`
  width: 100%;
  padding: 0 18pt;
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
  }
  .search {
    width: 946px;
  }
`;

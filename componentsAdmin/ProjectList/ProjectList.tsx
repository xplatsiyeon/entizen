import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import Table from 'componentsAdmin/table';
import React, {useRef, useState } from 'react';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { DateRangePicker } from 'rsuite';
import colors from 'styles/colors';
import ProjectDetail from './ProjectDetail';
import { Dayjs } from 'dayjs';

const ProjectList = () => {

  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');
  const [pickedDate, setPickedDate] = useState<string[]>();

  const dateRef = useRef<DateRange>();

  const handleDate =()=>{
    const date = dateRef.current;
    console.log(date)
  }

  // 달력 날짜 변경 함수
  const handleDateChange = (
    value: DateRange | null,
    event: React.SyntheticEvent<Element, Event>,
  ) => {
    console.log('ref',dateRef.current);
    }


  return (
    <Wrapper>
    {isDetail && <ProjectDetail setIsDetail={setIsDetail} projectIdx={Number(detatilId!)}/>}
      <AdminHeader title="프로젝트" type="main" />
      <Manager>
        <li className="search">
            <label>기간검색</label>
            {/* 달력 컴포넌트 */}
            <DateRangePicker
            placeholder={'년-월-일 ~ 년-월-일'}
            size={'sm'}
            onChange={handleDateChange}
            />
        <Btn onClick={handleDate}>조회</Btn>
        </li>
        </Manager>
        <Table setDetailId={setDetailId} setIsDetail={setIsDetail} tableType={'projectListData'} pickedDate={pickedDate} />
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
const Btn = styled.button`
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  outline: none;
  text-align: center;
  border-radius: 3pt;
  padding: 5px 17px;
  height: 19.5pt;
  color: ${colors.lightWhite};
  background: #464646;
`;

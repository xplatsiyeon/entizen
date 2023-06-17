import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { DateRangePicker } from 'rsuite';
import colors from 'styles/colors';
import ProjectDetail from './ProjectDetail';
import { AdminBtn } from 'componentsAdmin/Layout';
import ProjectListTable from './ProjectListTable';
import { adminNoPickDateFomat } from 'utils/calculatePackage';
import AdminDateRange from 'componentsAdmin/AdminDateRange';
import { adminDateFomat } from 'utils/calculatePackage';
import { Range } from 'react-date-range';

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const projectState = [
  '계약',
  '검수',
  '준비',
  '설치',
  '완료 중',
  '완료 대기',
  '승인 대기',
];

export const searchType = ['프로젝트 번호', '작성자 아이디', '기업회원 아이디'];
export const searchTypeEn = ['projectNumber', 'userId', 'companyId'];

const ProjectList = ({ setNowHeight }: Props) => {
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

  const excelUrl = `/admin/projects/in-progress/excel?page=1&limit=1000&startDate=${adminDateFomat(
    dateState[0].startDate!,
  )}&endDate=${adminDateFomat(
    dateState[0].endDate!,
  )}&searchType=projectNumber&searchKeyword=`;

  // 검색 옵션
  const [selectValue, setSelectValue] = useState('프로젝트 번호');

  //프로젝트 번호, 작성자 아이디, 기업회원 아이디 중 판별
  const [selectedFilter, setSelectedFilter] = useState<number>(0);

  //검색창에 입력되는 값
  const [inputValue, setInputValue] = useState<string>('');

  // onClick 할때 값이 바뀌도록
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // 셀렉트 박스 변경함수
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setSelectValue(event.target.value as string);
  };

  // 진행상태 체크박스에 값 넣고 빼기
  const [project, setProject] = useState<Array<string>>([]);
  const checkProjectHandle = (checked: boolean, value: string) => {
    if (checked) {
      setProject((prev) => [...prev, value]);
    } else {
      setProject(project.filter((el) => el !== value));
    }
  };

  // 백엔드에 체크박스 선택값 배열에 영문으로 보내줌
  const changeEn = project.map((data) => {
    if (data === '계약') {
      return 'contract';
    } else if (data === '검수') {
      return 'exam';
    } else if (data === '준비') {
      return 'ready';
    } else if (data === '설치') {
      return 'installation';
    } else if (data === '완료 중') {
      return 'completing';
    } else if (data === '완료 대기') {
      return 'awaitingCompletion';
    } else if (data === '승인 대기') {
      return 'awaitingApproval';
    }
  });

  // 백엔드에 보내주는 쿼리
  const projectQueryString = changeEn.map((e) => `&steps[]=${e}`).join('');

  const dateRef = useRef<HTMLLIElement>(null);

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

  useEffect(() => {
    if (setNowHeight) {
      setNowHeight(window.document.documentElement.scrollHeight);
    }
  }, []);

  return (
    <Wrapper>
      {isDetail && (
        <ProjectDetail
          setIsDetail={setIsDetail}
          projectIdx={Number(detatilId!)}
          setNowHeight={setNowHeight}
        />
      )}
      <AdminHeader
        title="프로젝트"
        subTitle="진행 프로젝트 리스트"
        type="main"
      />
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
          <label className="searchKeyword">검색</label>
          <SelectBox value={selectValue} onChange={handleChange}>
            {searchType.map((el, idx) => (
              <MenuItem
                key={idx}
                value={searchType[idx]}
                onClick={() => {
                  setSelectedFilter(idx);
                }}
              >
                {searchType[idx]}
              </MenuItem>
            ))}
          </SelectBox>
          {/* <input type="text" value={keyword} className="searchInput" /> */}
          <input
            type="text"
            placeholder="검색"
            className="searchInput"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearchKeyword(inputValue);
              }
            }}
          />
          <AdminBtn
            onClick={() => {
              setSearchKeyword(inputValue);
            }}
          >
            검색
          </AdminBtn>
        </li>
        <li className="search">
          <label>진행 단계</label>
          <CheckBoxWrapper>
            {projectState.map((data, idx) => (
              <CheckBoxLabel key={data}>
                <CheckBox
                  type="checkbox"
                  id={data}
                  value={data}
                  onChange={(e) => {
                    checkProjectHandle(e.currentTarget.checked, e.target.id);
                  }}
                />
                <CheckBoxText>{data}</CheckBoxText>
              </CheckBoxLabel>
            ))}
          </CheckBoxWrapper>
        </li>
      </Manager>
      {/* 리스트 목록 */}
      <ProjectListTable
        searchType={searchTypeEn[selectedFilter]}
        setDetailId={setDetailId}
        setIsDetail={setIsDetail}
        tableType={'projectListData'}
        pickedDate={pickedDate}
        commonBtn={'엑셀 다운로드'}
        searchKeyword={searchKeyword}
        projectQueryString={projectQueryString}
        excelUrl={excelUrl}
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
    ::placeholder {
      padding-left: 10px;
    }
  }
  .search {
    width: 946px;
  }
  .searchKeyword {
    padding-right: 58pt;
  }
`;

const SelectBox = styled(Select)`
  width: 112pt;
  height: 100%;
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

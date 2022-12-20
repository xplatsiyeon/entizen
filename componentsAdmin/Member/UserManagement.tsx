import styled from '@emotion/styled';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { addDays } from 'date-fns';
import SelectComponents from 'components/Select';
import CalendarsDateRangePicker from 'componentsAdmin/DatePicker';
import AdminHeader from 'componentsAdmin/Header';
import React, { Dispatch, SetStateAction, useState } from 'react';
import colors from 'styles/colors';
import CommonDetail from './CommonDetail';
import ComTable from 'componentsAdmin/comTable';

type Props = {};

const selectOption = ['이름 검색', '아이디 검색'];
const UserManagement = (props: Props) => {
  const [selectValue, setSelectValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const [isDetail, setIsDetail] = useState(false);
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    console.log(event);
    setSelectValue(event.target.value as string);
  };

  return (
    <>
      {isDetail && (
        <CommonDetail setIsDetail={setIsDetail} type="USER" memberIdx={1} />
      )}
      <Wrapper>
        <AdminHeader title="회원관리" subTitle="일반회원" type="main" />
        <Manager>
          <li>
            <label>회원 검색</label>
            <SelectBox value={selectValue} onChange={handleChange}>
              {selectOption.map((el, idx) => (
                <MenuItem value={selectOption[idx]}>
                  {selectOption[idx]}
                </MenuItem>
              ))}
            </SelectBox>
            <input type="text" value={keyword} className="searchInput"></input>
            <Btn>검색</Btn>
          </li>
          <li>
            <label>기간검색</label>
            <CalendarsDateRangePicker />
            <Btn>조회</Btn>
          </li>
        </Manager>
        <ComTable setIsDetail={setIsDetail} />
      </Wrapper>
    </>
  );
};

export default UserManagement;

const Wrapper = styled.div`
  /* border: 1px solid red; */
  /* width: 100%; */

  margin: 0 18pt;
`;
const Manager = styled.ul`
  width: 946px;

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
`;
const SelectBox = styled(Select)`
  width: 87pt;
  height: 100%;
`;
const Btn = styled.button`
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  /* identical to box height, or 21px */
  outline: none;
  text-align: center;
  border-radius: 3pt;
  padding: 1.5pt 14.25pt;
  height: 19.5pt;
  color: #747780;
  /* background-color: red; */
`;

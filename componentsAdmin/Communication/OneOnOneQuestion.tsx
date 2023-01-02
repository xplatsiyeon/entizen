import React, { useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import AdminHeader from 'componentsAdmin/Header';
import { AdminBtn } from 'componentsAdmin/Layout';
import Table from 'componentsAdmin/table';
import OOQDetail from './OOQDetail';
import {
  adminDateFomat,
  dateFomat,
  hyphenFn,
  convertKo,
  convertEn,
} from 'utils/calculatePackage';

type CheckBox = {
  id: number;
  title: string;
};

export const communicationState = ['상담종료', '상담진행중'];
export const communicationStateEn = ['done', 'inProgress'];

export const userCheckBox = ['일반회원', '기업회원'];
export const userCheckBoxEn = ['USER', 'COMPANY'];

const OneOnOneQuestion = () => {
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');
  const [pickedDate, setPickedDate] = useState<string[]>();

  //검색창에 입력되는 값
  const [inputValue, setInputValue] = useState<string>('');

  // onClick 할때 값이 바뀌도록
  const [userSearch, setUserSearch] = useState<string>('');

  // 체크박스 선택 여부
  const [isChecked, setIsChecked] = useState(true);

  // user체크박스에 값 넣고 빼기
  const [userCheck, setUserCheck] = useState<Array<string>>([]);
  const checkHandle = (checked: boolean, user: string) => {
    if (checked) {
      setUserCheck((prev) => [...prev, user]);
    } else {
      setUserCheck(userCheck.filter((el) => el !== user));
    }
  };

  // 상담상태 체크박스에 값 넣고 빼기
  const [commuCheck, setCommuCheck] = useState<Array<string>>([]);
  const checkCommuHandle = (checked: boolean, commu: string) => {
    if (checked) {
      setCommuCheck((prev) => [...prev, commu]);
    } else {
      setCommuCheck(commuCheck.filter((el) => el !== commu));
    }
  };

  const handleCommon = () => {};

  console.log('🌸 userCheck 🌸', userCheck);

  return (
    <Wrapper>
      <TitleWrapper>
        <AdminHeader title="소통하기" type="main" />
        <SubText>1대1 문의</SubText>
      </TitleWrapper>
      <Manager>
        <li className="search">
          <label>상담 상태</label>
          <CheckBoxWrapper>
            {communicationState.map((data, idx) => (
              <CheckBoxLabel key={data}>
                <CheckBox
                  type="checkbox"
                  id={data}
                  value={data}
                  onChange={(e) => {
                    checkCommuHandle(e.currentTarget.checked, e.target.id);
                  }}
                />
                <CheckBoxText>{data}</CheckBoxText>
              </CheckBoxLabel>
            ))}
          </CheckBoxWrapper>
        </li>
        <li className="search">
          <label>회원 구분</label>
          <CheckBoxWrapper>
            {userCheckBox.map((data, idx) => (
              <CheckBoxLabel key={data}>
                <CheckBox
                  type="checkbox"
                  id={data}
                  value={data}
                  onChange={(e) => {
                    checkHandle(e.currentTarget.checked, e.target.id);
                  }}
                />
                <CheckBoxText>{data}</CheckBoxText>
              </CheckBoxLabel>
            ))}
          </CheckBoxWrapper>
        </li>
        <li className="search">
          <label>아이디 검색</label>
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
      <Table
        setIsDetail={setIsDetail}
        setDetailId={setDetailId}
        tableType={'userChattingOneOnOne'}
        userSearch={userSearch}
        commonBtn={'엑셀 다운로드'}
        handleCommon={handleCommon}
        hide={true}
        userCheck={convertEn(
          userCheckBox,
          userCheckBoxEn,
          userCheck.toString(),
        )}
        commuCheck={convertEn(
          communicationState,
          communicationStateEn,
          commuCheck.toString(),
        )}
      />

      {isDetail && <OOQDetail detatilId={detatilId} />}
    </Wrapper>
  );
};

export default OneOnOneQuestion;

const Wrapper = styled.div`
  width: 100%;
  padding: 0 18pt;
  position: relative;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;
const SubText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 16px;
  color: #000000;
  margin-top: 60pt;
  margin-bottom: 12pt;
  font-weight: 500;
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

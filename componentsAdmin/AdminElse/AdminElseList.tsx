import React, { useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import AdminHeader from 'componentsAdmin/Header';
import { AdminBtn } from 'componentsAdmin/Layout';
import Table from 'componentsAdmin/table';

type CheckBox = {
  id: number;
  title: string;
};

const AdminElseList = () => {
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');
  const blockState: CheckBox[] = [
    { id: 0, title: '블락사유 1' },
    { id: 1, title: '블락사유 2' },
    { id: 3, title: '블락사유 3' },
  ];

  // 상담상태 체크박스에 값 넣고 빼기
  const [blockCheck, setBlockCheck] = useState<Array<string>>([]);
  const checkBlockHandle = (checked: boolean, commu: string) => {
    if (checked) {
      setBlockCheck((prev) => [...prev, commu]);
    } else {
      setBlockCheck(blockCheck.filter((el) => el !== commu));
    }
  };

  //검색창에 입력되는 값
  const [inputValue, setInputValue] = useState<string>('');

  // onClick 할때 값이 바뀌도록
  const [userSearch, setUserSearch] = useState<string>('');

  // 블락해제
  const handleCommon = () => {};
  return (
    <Wrapper>
      <TitleWrapper>
        <AdminHeader title="기타" type="main" />
        <SubText>블락</SubText>
      </TitleWrapper>
      <Manager>
        <li className="search">
          <label>상담 상태</label>
          <CheckBoxWrapper>
            {blockState.map((data) => (
              <CheckBoxLabel key={data.title}>
                <CheckBox
                  type="checkbox"
                  id={data.title}
                  value={data.title}
                  onChange={(e) => {
                    checkBlockHandle(e.currentTarget.checked, e.target.id);
                  }}
                />
                <CheckBoxText>{data.title}</CheckBoxText>
              </CheckBoxLabel>
            ))}
          </CheckBoxWrapper>
        </li>
        <li className="search">
          <label className="idSearch">아이디 검색</label>
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
        setDetailId={setDetailId}
        setIsDetail={setIsDetail}
        tableType={''}
        handleCommon={handleCommon}
      />
    </Wrapper>
  );
};

export default AdminElseList;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 18pt;
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

  .idSearch {
    padding-right: 32pt;
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

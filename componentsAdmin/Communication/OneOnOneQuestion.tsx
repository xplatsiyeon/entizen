import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import AdminHeader from 'componentsAdmin/Header';
import { AdminBtn } from 'componentsAdmin/Layout';
import OOQDetail from './OOQDetail';
import {
  adminDateFomat,
  dateFomat,
  hyphenFn,
  convertKo,
  convertEn,
} from 'utils/calculatePackage';
import CommunicationTable from './CommunicationTable';

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

type CheckBox = {
  id: number;
  title: string;
};

// export const communicationState = ['상담종료', '상담진행중', '읽지않은 채팅'];
// export const communicationStateEn = ['done', 'inProgress','isUnread'];
export const communicationState = ['상담종료', '상담진행중'];
export const communicationStateEn = ['done', 'inProgress'];

export const userCheckBox = ['일반회원', '기업회원'];
export const userCheckBoxEn = ['USER', 'COMPANY'];

export const unreadCheckBox = ['읽지않은 채팅'];

const OneOnOneQuestion = ({ setNowHeight }: Props) => {
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');
  const [userType, setUserType] = useState<string>('');

  const [isRefetch, setIsRefetch] = useState<boolean>(false);

  // 윈도우 팝업에서 필요한 id 값
  const [memberIdx, setMemberIdx] = useState('');

  //검색창에 입력되는 값
  const [inputValue, setInputValue] = useState<string>('');

  // onClick 할때 값이 바뀌도록
  const [userSearch, setUserSearch] = useState<string>('');

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

  // 읽지 않은 상담
  const [unRead, setUnread] = useState<Array<string>>([]);
  const checkUnreadHandle = (checked: boolean, commu: string) => {
    if (checked) {
      setUnread((prev) => [...prev, commu]);
    } else {
      setUnread(unRead.filter((el) => el !== commu));
    }
  };

  const handleCommon = () => {
    // alert('개발중입니다.');
    setIsDetail(true);
  };

  useEffect(() => {
    if (setNowHeight) {
      setNowHeight(window.document.documentElement.scrollHeight);
    }
  }, []);

  useEffect(() => {
    if (isRefetch) {
      setIsRefetch(false);
    }
  }, [isRefetch]);

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
          <label className="unRead">읽지않은 채팅</label>
          <CheckBoxWrapper>
            {unreadCheckBox.map((data, idx) => (
              <CheckBoxLabel key={data}>
                <CheckBox
                  type="checkbox"
                  id={data}
                  value={data}
                  onChange={(e) => {
                    checkUnreadHandle(e.currentTarget.checked, e.target.id);
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
      {/* 테이블 */}
      <CommunicationTable
        setIsDetail={setIsDetail}
        setDetailId={setDetailId}
        tableType={'userChattingOneOnOne'}
        userSearch={userSearch}
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
        unRead={unRead}
        setUserType={setUserType}
        setMemberIdx={setMemberIdx}
        isRefetch={isRefetch}
      />

      {/* 상세 */}
      {isDetail && (
        <OOQDetail
          detatilId={detatilId}
          setNowHeight={setNowHeight}
          setIsDetail={setIsDetail}
          userType={userType}
          memberIdx={memberIdx}
          setIsRefetch={setIsRefetch}
        />
      )}
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

    &.unRead {
      padding-right: 0;
      width: 78pt;
    }
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

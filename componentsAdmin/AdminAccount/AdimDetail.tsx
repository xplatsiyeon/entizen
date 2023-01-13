import styled from '@emotion/styled';
import { isTokenAdminGetApi } from 'api';
import AdminHeader from 'componentsAdmin/Header';
import AlertModal from 'componentsAdmin/Modal/AlertModal';
import WriteModal from 'componentsAdmin/Modal/WriteModal';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useQuery } from 'react-query';
import colors from 'styles/colors';

type Props = {
  setIsDetail: Dispatch<SetStateAction<boolean>>;
  detatilId: string;
};

const AdimDetail = ({ detatilId, setIsDetail }: Props) => {
  const [alertModal, setAlertModal] = useState(false);
  const [writeModal, setWriteModal] = useState(false);

  // managerIdx
  // const { data, isLoading, isError } = useQuery('adminDetail', () =>
  //   isTokenAdminGetApi(`/admin/managers/${detatilId}`),
  // );

  // console.log('🔥 data ===>');
  // console.log(data);
  // 상세페이지 모달 클릭 이벤트
  const onClickBack = () => {
    setIsDetail((prev) => !prev);
  };
  // 안내 메시지 모달 클릭 이벤트
  const onClickChangeBtn = () => {
    setWriteModal(true);
  };
  // 변경 진행 여부 모달 왼쪽 클릭 이벤트
  const onClickLeftModal = () => {
    setWriteModal(false);
  };
  // 변경 진행 여부 모달 오른쪽 클릭 이벤트
  const onClickRightModal = () => {
    // 변경 api 호출
    alert('개발중입니다.');
    setWriteModal(false);
    // setAlertModal(true);
  };
  return (
    <Background>
      {/* 안내 메세지 모달 */}
      {alertModal && (
        <AlertModal
          size="lg"
          message="관리자 등급 변경이 완료되었습니다."
          setIsModal={setAlertModal}
        />
      )}
      {/* 변경 진행 여부 모달 */}
      {writeModal && (
        <WriteModal
          message="관리자 등급 변경을 진행하시겠습니까?"
          subMessage={`관리자 등급 변경 진행 시 슈퍼관리자 권한은 \n권한을 부여받은 관리자에게 모두 넘어가게 됩니다.\n 계속 진행하시겠습니까?`}
          leftBtn="취소"
          leftBtnHandle={onClickLeftModal}
          rightBtn="등급변경 진행"
          rightBtnHandle={onClickRightModal}
          size={'lg'}
        />
      )}
      <Wrapper>
        {/* 헤더 */}
        <AdminHeader
          title="관리자 관리"
          subTitle="관리자 조회 상세"
          type="admin"
          deleteBtn={true}
          backBtn={onClickBack}
        />
        {/* 본문 */}
        {/* 2023.01.12(ljm) API 없어 가데이터로 view만 완료된 상태 */}
        <Line>
          <label>관리자 등급</label>
          <CheckBoxContainer>
            <div className="raidoBoxWrapper">
              <input
                type={'radio'}
                className="radioBox"
                name="adminClass"
                checked
              />
              <span>일반관리자</span>
            </div>
            <div className="raidoBoxWrapper">
              <input type={'radio'} className="radioBox" name="adminClass" />
              <span>슈퍼관리자</span>
            </div>
            <button className="adminBtn" onClick={onClickChangeBtn}>
              변경
            </button>
          </CheckBoxContainer>
        </Line>
        <Line>
          <label>아이디</label>
          <span>entizen1</span>
        </Line>
        <Line>
          <label>이름</label>
          <span>이무개</span>
        </Line>
        <Line>
          <label>전화번호</label>
          <span>010-1234-1234</span>
        </Line>
        <Line>
          <label>이메일</label>
          <span>test@google.com</span>
        </Line>
      </Wrapper>
    </Background>
  );
};

export default AdimDetail;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${colors.lightWhite};
  padding: 0 18pt;
  position: absolute;
  left: 154.5pt;
  z-index: 999;
`;
const Wrapper = styled.div`
  width: 946px;
`;
const Line = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 14px;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.main2};
  & > label {
    width: 90px;
    font-weight: 500;
  }
`;
const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  .radioBox {
    margin-right: 4px;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  .raidoBoxWrapper {
    display: flex;
    align-items: center;
  }
  .adminBtn {
    margin-left: 32px;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    color: ${colors.gray2};
    padding: 3px 19px;
    background: ${colors.lightWhite3};
    border: 1px solid ${colors.gray2};
    border-radius: 2px;
  }
`;

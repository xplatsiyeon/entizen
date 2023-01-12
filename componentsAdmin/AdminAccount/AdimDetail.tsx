import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import WriteModal from 'componentsAdmin/Modal/WriteModal';
import React, { Dispatch, SetStateAction } from 'react';
import colors from 'styles/colors';

type Props = {
  setIsDetail: Dispatch<SetStateAction<boolean>>;
};

const AdimDetail = ({ setIsDetail }: Props) => {
  const onClickBack = () => {
    setIsDetail((prev) => !prev);
  };
  const onClickLeftModal = () => {};
  const onClickRightModal = () => {};
  return (
    <Background>
      <WriteModal
        message="관리자 등급 변경을 진행하시겠습니까?"
        subMessage={`관리자 등급 변경 진행 시 슈퍼관리자 권한은 \n권한을 부여받은 관리자에게 모두 넘어가게 됩니\n다. 계속 진행하시겠습니까?`}
        leftBtn="취소"
        leftBtnHandle={onClickLeftModal}
        rightBtn="등급변경 진행"
        rightBtnHandle={onClickRightModal}
        size={'lg'}
      />
      <Wrapper>
        <AdminHeader
          title="관리자 관리"
          subTitle="관리자 조회 상세"
          type="detail"
          backBtn={onClickBack}
          exelHide={false}
        />
        <Line>
          <label>관리자 등급</label>
          <CheckBoxContainer>
            <div className="raidoBoxWrapper">
              <input type={'radio'} className="radioBox" name="adminClass" />
              <span>일반관리자</span>
            </div>
            <div className="raidoBoxWrapper">
              <input type={'radio'} className="radioBox" name="adminClass" />
              <span>슈퍼관리자</span>
            </div>
            <button className="adminBtn">변경</button>
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

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import AdminHeader from 'componentsAdmin/Header';
import { AdminBtn } from 'componentsAdmin/Layout';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import WriteModal from 'componentsAdmin/WriteModal';

type Props = { setIsDetail: React.Dispatch<React.SetStateAction<boolean>> };

const AdminTermsEditor = ({ setIsDetail }: Props) => {
  // 제목
  const [title, setTitle] = useState<string>('');

  // 본문
  const [bodyText, setBodyText] = useState<string>('');
  console.log('title', title);

  // 경고 모달창 열고 닫고
  const [isModal, setIsModal] = useState<boolean>(false);

  const WriteModalHandle = () => {
    setIsModal(true);
  };

  const leftBtnHandle = () => {
    setIsModal(false);
    setIsDetail(false);
  };
  const rightBtnHandle = () => {
    setIsModal(false);
  };

  return (
    <Background>
      <Wrapper>
        {isModal && (
          <WriteModal
            message={'작성 내용이 등록되지 않았습니다.'}
            subMessage={'페이지를 나가시겠습니까?'}
            leftBtn={'예'}
            rightBtn={'아니오'}
            leftBtnHandle={leftBtnHandle}
            rightBtnHandle={rightBtnHandle}
          />
        )}
        <AdminHeader
          title=""
          type="text"
          exelHide={false}
          WriteModalHandle={WriteModalHandle}
        />
        <TitleWrapper>
          <MainText>정보 수정</MainText>
          <SubText>약관</SubText>
        </TitleWrapper>
        <SubText>약관 등록</SubText>
        <TitleBox>
          <TitleText>제목</TitleText>
          <TitleArea
            type="text"
            value={title}
            placeholder="제목을 입력해주세요"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </TitleBox>
        <MainTextArea
          placeholder="내용을 입력해주세요"
          value={bodyText}
          onChange={(e) => {
            setBodyText(e.target.value);
          }}
        />
        <BtnBox>
          <AdminBtn>삭제</AdminBtn>
          <AdminBtn>수정</AdminBtn>
        </BtnBox>
      </Wrapper>
    </Background>
  );
};

export default AdminTermsEditor;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${colors.lightWhite};
  padding: 0 18pt;
  position: absolute;
  left: 154.5pt;
  z-index: 10;
  overflow-y: scroll;
  padding-bottom: 75px;
`;

const Wrapper = styled.div`
  width: 964px;
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
  width: 964px;
`;

const MainText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 24px;
  color: #000000;
  font-weight: 500;
  margin-right: 11px;
`;
const SubText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 16px;
  color: #000000;
  font-weight: 500;
  margin-top: 20px;
  height: 32px;
`;
const TitleBox = styled.div`
  width: 964px;
  height: 32px;
  display: flex;
  align-items: center;
  border: 1px solid #e2e5ed;
  border-radius: 3px;
  padding: 0 6px;
  margin-bottom: 8px;
`;

const TitleText = styled.span`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 14px;
  color: #000000;
  font-weight: 500;
  margin-right: 10px;
  padding-right: 8px;
  border-right: 2px solid #e2e5ed;
`;

const TitleArea = styled.input`
  border: none;
  outline: none;
  resize: none;
  background: none;
`;

const MainTextArea = styled.textarea`
  width: 964px;
  height: 416px;
  border: 1px solid #e2e5ed;
  outline: none;
  resize: none;
  background: none;
  padding: 8px;
  border-radius: 3px;
  margin-bottom: 8px;
`;

const BtnBox = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

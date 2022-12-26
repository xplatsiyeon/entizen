import React, { useLayoutEffect, useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import Image from 'next/image';
import { css } from '@emotion/react';
import CloseModal from 'public/adminImages/libraryClose.svg';
import CloseImg from 'public/images/XCircle.svg';
import { AdminBtn } from 'componentsAdmin/Layout';
import { InputAdornment, TextField, Typography } from '@mui/material';
import { isTokenGetApi } from 'api';
import { useQuery } from 'react-query';

type Props = {
  afterSalesServiceIdx: number;
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
};

interface LibraryResponse {
  isSuccess: true;
  data: {
    library: {
      createdAt: string;
      libraryIdx: number;
      imageUrl: string;
      title: string;
      link: string;
    };
  };
}

const ModalLibrary = ({ afterSalesServiceIdx, setIsDetail }: Props) => {
  // 도서관 상세 api

  const { data, isLoading, isError } = useQuery<LibraryResponse>(
    'entizenLibrary',
    () => isTokenGetApi(`/admin/libraries/${afterSalesServiceIdx}`),
  );

  // 이미지 첨부 api
  return (
    <Modal>
      <ModalBox>
        <TitleBox>
          <TitleText>엔티즌 도서관 보기</TitleText>
          <Image
            src={CloseModal}
            layout="intrinsic"
            alt="closeBtn"
            width={16}
            height={16}
            onClick={() => {
              setIsDetail(false);
            }}
            style={{ cursor: 'pointer' }}
          />
        </TitleBox>
        <FlexWrap>
          <ImageSubBox>
            <SubTitle>이미지</SubTitle>
            <ImageDeleteBox>
              <ImageTitleBox>{data?.data?.library?.imageUrl}</ImageTitleBox>
              <DeleteTitle>삭제</DeleteTitle>
            </ImageDeleteBox>
          </ImageSubBox>
          <AdminBtn style={{ width: '85px' }}>사진첨부</AdminBtn>
        </FlexWrap>
        <Preview>
          <img src={data?.data?.library?.imageUrl} />
          <Xbox>
            <Image
              src={CloseImg}
              layout="intrinsic"
              alt="closeBtn"
              width={24}
              height={24}
            />
          </Xbox>
        </Preview>
        <FlexHorizontal>
          <SubTitle>제목</SubTitle>
          <Input value={data?.data?.library?.title} />
        </FlexHorizontal>
        <FlexHorizontal>
          <SubTitle>링크</SubTitle>
          <Input value={data?.data?.library?.link} />
        </FlexHorizontal>
        <FlexWrap>
          <div />
          <BtnBox>
            <AdminBtn
              style={{
                background: '#747780',
                border: '1px solid #464646',
                color: '#ffffff',
              }}
            >
              삭제
            </AdminBtn>
            <AdminBtn
              style={{
                background: '#747780',
                border: '1px solid #464646',
                color: '#ffffff',
              }}
            >
              수정
            </AdminBtn>
          </BtnBox>
        </FlexWrap>
      </ModalBox>
    </Modal>
  );
};

export default ModalLibrary;

const Text = css`
  font-family: 'Spoqa Han Sans Neo';
  color: #222222;
  line-height: 150%;
`;

const Flex = css`
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  padding-top: 17px;
`;

const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0 10pt;
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);
  z-index: 100;
`;

const ModalBox = styled.div`
  background-color: #ffffff;
  top: 10%;
  left: 20%;
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 372px;
  height: 438px;
  border-radius: 8px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e2e5ed;
  padding: 13px 24px;
`;

const TitleText = styled.div`
  ${Text}
  text-align: left;
  font-weight: 500;
  font-size: 16px;
`;

const SubTitle = styled.div`
  ${Text}
  text-align: left;
  font-weight: 400;
  font-size: 16px;
`;

const FlexWrap = styled.div`
  ${Flex}
  align-items: center;
`;

const FlexHorizontal = styled.div`
  ${Flex}
  align-items: initial;
`;

const ImageSubBox = styled.div`
  width: 203px;
  display: flex;
  justify-content: space-between;
`;

const ImageDeleteBox = styled.div`
  width: 126px;
  display: flex;
  justify-content: space-between;
`;

const ImageTitleBox = styled.div`
  border: 1px solid #a6a9b0;
  border-radius: 2px;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 16px;
  color: #a6a9b0;
  line-height: 150%;
  text-align: center;
  padding: 1px 3px;
  width: 92px;
  height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DeleteTitle = styled.div`
  line-height: 150%;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 14px;
  text-align: center;
  color: #747780;
  border-bottom: 1px solid #747780;
  cursor: pointer;
`;

const Xbox = styled.div`
  position: absolute;
  cursor: pointer;
  left: 60px;
  top: 0;
`;

const Preview = styled.div`
  position: relative;
  width: 82px;
  height: 82px;
  border: 1px solid red;
  margin-left: 102px;
  margin-top: 8px;
`;

const TextInput = styled.div`
  width: 246px;
  height: 76px;
  background-color: #fbfcff;
  border: 1px solid #e2e5ed;
  border-radius: 2px;
  padding: 3px;
`;

const InputText = styled.input`
  width: 243px;
  height: 73px;
  overflow-y: scroll;
`;

const TextArea = styled(Typography)`
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 25.5pt;
  font-weight: 700;
  line-height: 37.5pt;
  letter-spacing: -0.02em;
  text-align: center;
  margin: 0 auto 58.5pt;
  & span {
    color: ${colors.main};
    font-weight: 700;
    letter-spacing: -2%;
  }
`;

const Input = styled(TextField)`
  width: 246px;
  height: 76px;
  border-radius: 2px;
  border: 1px solid #e2e5ed;
  background-color: #fbfcff;
  /* display: flex;
  justify-content: center;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box; */
  .MuiInputBase-root {
    padding: 3px 3px;
  }
  & input {
    ${Text}
    color: #222222;
    text-align: left;
    padding: 0;
  }

  ::placeholder {
    color: ${colors.lightGray3};
    font-weight: 400;
  }

  & fieldset {
    border: none;
  }
`;

const BtnBox = styled.div`
  width: 135px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

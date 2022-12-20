import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import colors from 'styles/colors';
import MemberContents from './MemberContents';
import ExitBtn from 'public/adminImages/Group.png';

type Props = {
  setIsDeatil: Dispatch<SetStateAction<boolean>>;
};

const UserDetail = ({ setIsDeatil }: Props) => {
  const [type, setType] = useState<'USER' | 'COMPANY'>('COMPANY');

  const handleBackBtn = () => {
    setIsDeatil(true);
  };
  return (
    <Wrapper>
      <AdminHeader
        title="회원관리"
        subTitle="일반회원"
        type="detail"
        backBtn={handleBackBtn}
      />
      <InfoBox>
        <Avatar>
          <Image src={''} alt="avatar" layout="fill" />
          <span className="exitImgBox">
            <Image src={ExitBtn} alt="exit" layout="fill" />
          </span>
        </Avatar>
        {/* 회원 정보 불러오는 컴포넌트 */}
        <MemberContents type={type} />
      </InfoBox>
      <TextAreaContainer>
        <label>관리자 전용 특이사항</label>
        <textarea rows={10} cols={30}></textarea>
      </TextAreaContainer>
      <ButtonBox>
        <button>회원삭제</button>
        <button>수정</button>
      </ButtonBox>
    </Wrapper>
  );
};

export default UserDetail;

const Wrapper = styled.div`
  /* width: 100%; */
  margin: 0 18pt;
`;
const InfoBox = styled.div`
  width: 100%;
  margin-top: 12px;
  display: flex;
  gap: 25px;
`;
const Avatar = styled.span`
  position: relative;
  width: 120px;
  height: 120px;
  background-color: #a6a9b0;
  .exitImgBox {
    position: absolute;
    top: 4px;
    right: 4px;
    border: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 936px;
  margin-top: 40px;
  label {
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: #000000;
  }
  textarea {
    resize: none;
    background: #ffffff;
    border: 2px solid #e7e7e7;
    border-radius: 4px;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 12px;
  margin-top: 16px;
  button {
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    color: ${colors.gray2};
    width: 64px;
    height: 26px;
    background: #e2e5ed;
    border: 1px solid #747780;
    border-radius: 2px;
    cursor: pointer;
  }
`;

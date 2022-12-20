import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import colors from 'styles/colors';

type Props = {
  setIsDeatil: Dispatch<SetStateAction<boolean>>;
};

const UserDetail = ({ setIsDeatil }: Props) => {
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
            <Image src={''} alt="exit" layout="fill" />
          </span>
        </Avatar>
        <Contents>
          <li>
            <label className="label">아이디</label>
            <input type="text" readOnly value={'subin1'} />
          </li>
          <li>
            <label className="label">이름</label>
            <span>수빈</span>
          </li>
          <li>
            <label className="label">전화번호</label>
            <span>010-4998-8965</span>
          </li>
          <li>
            <label className="label">가입날짜</label>
            <span>2011.11.12</span>
          </li>
          <li>
            <label className="label">이메일</label>
            <input type="text" readOnly value={'subin1'} />
          </li>
          <li>
            <label className="label">전화번호</label>
            <span>수빈</span>
          </li>
          <li>
            <label className="label">주소</label>
            <span>010-4998-8965</span>
          </li>
          <li>
            <label className="label">사업자등록증</label>
            <span>2011.11.12</span>
          </li>
          <li>
            <label className="label">가입날짜</label>
            <span>2011.11.12</span>
          </li>
          <li>
            <label className="label">가입승인</label>
            <span>2011.11.12</span>
          </li>
        </Contents>
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
  width: 100%;
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
  background-color: red;
  .exitImgBox {
    position: absolute;
    top: 4px;
    right: 4px;
    border: 50%;
    width: 24px;
    height: 24px;
    background-color: blue;
  }
`;
const Contents = styled.ul`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #000000;
  list-style: none;
  padding-left: 0px;
  li {
    display: flex;
    gap: 34px;
    :not(:last-child) {
      margin-bottom: 14px;
    }
  }
  .label {
    width: 59px;
  }
`;
const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;

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

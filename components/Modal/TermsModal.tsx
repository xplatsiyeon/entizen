import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Image from 'next/image';
import React, { useRef } from 'react';
import colors from 'styles/colors';
import ExitImg from 'public/images/X.svg';
import { useQuery } from 'react-query';
import { getApi } from 'api';
import { termsType } from 'components/SignUp/TermContent';
import { useMediaQuery } from 'react-responsive';

interface Props {
  setIsTermsModal: React.Dispatch<React.SetStateAction<boolean>>;
  termsModalType: termsType;
  userType: number | undefined; // 0: 유저 , 1: 파트너
}

export default function TermsModal({
  termsModalType,
  setIsTermsModal,
  userType,
}: Props) {
  const outside = useRef();
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  // 유저 약관동의
  const { data: userTerm } = useQuery<any>('user-term', () =>
    getApi(`/terms/service-for-user`),
  );
  // 파트너 약관동의
  const { data: companyTerm } = useQuery<any>('company-term', () =>
    getApi(`/terms/service-for-company`),
  );
  // 개인정보 처리방침
  const { data: personalInfo } = useQuery<any>('personal-info', () =>
    getApi(`/terms/personal-info`),
  );
  const closeModal = () => {
    if (document) {
      document.body.style.overflow = 'unset';
    }
    setIsTermsModal(false);
  };
  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (outside) {
      if (outside.current === e.target) {
        closeModal();
      }
    }
  };
  const onClickBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <ModalWrapper ref={outside} onClick={handleModalClose}>
      <ModalBox onSubmit={onClickBtn}>
        <ModalHeader>
          <span className="exit_icon" onClick={closeModal}>
            <Image src={ExitImg} alt="exit" layout="fill" />
          </span>
          <span>
            {mobile
              ? termsModalType === 'terms'
                ? '이용약관'
                : '개인정보 처리방침'
              : ''}
            {!mobile
              ? termsModalType === 'terms'
                ? '엔티즌 플랫폼 서비스 이용약관'
                : '개인정보 처리방침'
              : ''}
          </span>
          {/* <span className="none"></span> */}
        </ModalHeader>

        <Wrapper>
          {termsModalType === 'terms' ? (
            userType && userType === 1 ? (
              <div dangerouslySetInnerHTML={{ __html: companyTerm }} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: userTerm }} />
            )
          ) : (
            <div dangerouslySetInnerHTML={{ __html: personalInfo }} />
          )}
        </Wrapper>
      </ModalBox>
    </ModalWrapper>
  );
}

const ModalWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 9999;
`;
const ModalBox = styled.form`
  display: flex;
  flex-direction: column;
  /* position: fixed; */
  transform: translate(-50%, -50%);
  align-items: center;
  border-radius: 20pt;
  background-color: ${colors.lightWhite};
  /* top: 200pt;
  left: auto; */
  transform: none;
  border-radius: 20pt;
  overflow-y: scroll;

  padding-left: 47.25pt;
  padding-right: 27pt;
  padding-bottom: 15pt;
  /* width: 345pt;
  height: 498pt; */
  width: 1100px;
  height: 700px;
  @media (max-height: 500pt) {
    height: 100%;
  }
  @media (max-width: 899.25pt) {
    padding-left: 15pt;
    padding-right: 15pt;
    border-radius: 20pt 20pt 0 0;
    top: 75pt;
    height: 100%;
    width: 100%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 15pt;
  line-height: 18pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  background-color: ${colors.lightWhite};
  z-index: 999;
  padding-top: 24pt;
  padding-bottom: 30pt;
  .exit_icon {
    position: relative;
    cursor: pointer;
    width: 18pt;
    height: 18pt;
  }
  @media (max-width: 899.25pt) {
    font-size: 12pt;
    justify-content: center;
    flex-direction: row;
    .exit_icon {
      position: absolute;
      top: 24pt;
      left: 0pt;
    }
  }
`;

const Wrapper = styled.div`
  overflow-x: hidden;
  white-space: pre;
  width: 100%;
  position: relative;
  h1 {
    white-space: pre;
  }
  span {
    white-space: pre;
  }
  div {
    width: 100%;
    white-space: pre;
  }
  img {
    width: 100%;
  }
  ul {
    list-style-position: outside !important;
    li {
      display: flex;
    }
    li::before {
      content: '•';
      border-radius: 50%;
      padding-inline: 5px;
      text-align: center;
    }
  }
  ol {
    list-style-type: decimal !important;
    padding: 10px;
  }
  em {
    font-style: italic;
  }
  p {
    width: 100%;
    position: relative;
    word-break: break-all;
    white-space: pre-line;
    span {
      width: 100%;
      display: inline-block;
      word-break: break-all;
      white-space: pre-line;
    }
  }
  span {
    width: 100%;
    display: inline-block;
  }
`;

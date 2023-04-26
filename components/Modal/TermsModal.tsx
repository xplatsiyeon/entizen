import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Image from 'next/image';
import React, { useRef } from 'react';
import colors from 'styles/colors';
import ExitImg from 'public/images/X.svg';
import { useQuery } from 'react-query';
import { getApi } from 'api';
import { termsType } from 'components/SignUp/TermContent';

interface Props {
  setIsTermsModal: React.Dispatch<React.SetStateAction<boolean>>;
  termsModalType: termsType;
}

export default function TermsModal({ termsModalType, setIsTermsModal }: Props) {
  const outside = useRef();

  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (outside) {
      if (outside.current === e.target) {
        setIsTermsModal(false);
      }
    }
  };

  // 약관동의
  const { data: term } = useQuery<any>('term', () => getApi(`/terms/service`));

  // 개인정보 처리방침
  const { data: personalInfo } = useQuery<any>('personal-info', () =>
    getApi(`/terms/personal-info`),
  );

  const onClickBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTermsModal(false);
  };

  const onClickClose = () => {
    setIsTermsModal(false);
  };

  return (
    <ModalWrapper ref={outside} onClick={handleModalClose}>
      <ModalBox onSubmit={onClickBtn}>
        <ModalHeader>
          <span className="exit_icon" onClick={onClickClose}>
            <Image src={ExitImg} alt="exit" layout="fill" />
          </span>
          <span>
            {termsModalType === 'terms' ? '이용약관' : '개인정보 처리방침'}
          </span>
          <span className="none"></span>
        </ModalHeader>
        <Wrapper>
          {termsModalType === 'terms' ? (
            <div dangerouslySetInnerHTML={{ __html: term }} />
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
  position: fixed;
  width: 100%;
  transform: translate(-50%, -50%);
  align-items: center;
  border-radius: 20pt;
  padding-left: 15pt;
  padding-right: 15pt;
  background-color: ${colors.lightWhite};

  top: 75pt;
  left: auto;
  transform: none;
  height: 100%;
  border-radius: 20pt 20pt 0 0;
  overflow-y: scroll;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 18pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  background-color: ${colors.lightWhite};
  z-index: 999;
  padding-top: 24pt;
  padding-bottom: 30pt;
  .exit_icon {
    position: absolute;
    top: 24pt;
    left: 0pt;
    width: 18pt;
    height: 18pt;
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

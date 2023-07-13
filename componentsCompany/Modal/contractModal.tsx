import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useRef } from 'react';
import contract_pen_icon from 'public/companyContract/contract_pen_icon.svg';
import Image from 'next/image';
import colors from 'styles/colors';
import { contractAction } from 'storeCompany/contract';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { deleteSign } from 'api/deleteSign';

type Props = {
  documentId?: string;
  setIsModal: Dispatch<SetStateAction<boolean>>;
};

export default function ContractModal({ documentId, setIsModal }: Props) {
  const outside = useRef();
  const router = useRouter();
  const dispatch = useDispatch();

  // 계약서 취소 mutate
  // const {
  //   mutate: deleteMutate,
  //   isError: deleteError,
  //   isLoading: deleteLoading,
  // } = useMutation(deleteSign, {
  //   onSuccess(data, variables, context) {
  //     console.log('성공');
  //     // inProgressRefetch();
  //   },
  //   onError(error, variables, context) {
  //     console.log('실패');
  //     // setModalMessage('다시 시도해주세요');
  //     // setIsModal(true);
  //   },
  // });

  // 모달 배경 클릭 시 닫기
  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (outside) {
      if (outside.current === e.target) {
        setIsModal(false);
      }
    }
  };
  // 모달 버튼 클릭
  const onClickButton = () => {
    dispatch(contractAction.setStep(1));
    // 수정
    if (documentId) {
      router.push({
        pathname: '/company/mypage/runningProgress/addContract',
        query: {
          projectIdx: router.query.projectIdx,
          documentId: documentId,
        },
      });
      // 작성
    } else {
      router.push({
        pathname: '/company/mypage/runningProgress/addContract',
        query: {
          projectIdx: router.query.projectIdx,
        },
      });
    }
  };

  return (
    <ModalWrap ref={outside} onClick={(e) => handleModalClose(e)}>
      <Modal>
        <p className="title">엔티즌 전자 계약서</p>
        <p className="contents">
          전자 계약서 작성을 위해 <br />
          상세 내용을 추가로 입력해 주세요
        </p>
        <div className="img">
          <Image
            src={contract_pen_icon}
            alt="contract_pen_icon"
            layout="fill"
          />
        </div>
        <button className="button" onClick={onClickButton}>
          {documentId ? '수정하기' : '시작하기'}
        </button>
      </Modal>
    </ModalWrap>
  );
}

const ModalWrap = styled(Box)`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 99999;
`;

const Modal = styled.div`
  border-radius: 6pt;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 420pt;
  min-height: 300pt;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;
  padding-left: 37.5pt;
  padding-right: 37.5pt;

  .title {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 12pt;
    line-height: 18pt;
    letter-spacing: -0.02em;
    color: ${colors.main1};
  }
  .contents {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 15pt;
    line-height: 22.5pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    margin-top: 9pt;
  }
  .img {
    position: relative;
    width: 48pt;
    height: 48pt;
    margin-top: 27pt;
  }
  .button {
    width: 100%;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.lightWhite};
    background: ${colors.main1};
    border-radius: 6pt;
    padding: 15pt 0;
    margin-top: 48pt;
  }
`;

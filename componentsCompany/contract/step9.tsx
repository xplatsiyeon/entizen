import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import ContractButton from './Button';
import Tab from './Tab';
import { contractAction } from 'storeCompany/contract';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { BuisnessHyphenFn } from 'utils/calculatePackage';
import {
  GET_ModuSignResponse,
  ModuSignResponse,
} from 'QueryComponents/ModuSignQuery';
import { useMutation, useQueryClient } from 'react-query';
import { moduSign } from 'api/sign';
import { isTokenPostApi } from 'api';
import { modusignCancel } from 'api/cancelSign';
import { useQuery } from '@apollo/client';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader';
import { deleteSign } from 'api/deleteSign';

type Props = {};

export default function Step9(props: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const { companyRegistrationNumber, representativeName } = useSelector(
    (state: RootState) => state.contractSlice,
  );
  const { contractSlice } = useSelector((state: RootState) => state);

  console.log('🔥 contractSlice : ', contractSlice);

  // ------------------모두싸인 서명 취소 (계약서 수정하기)----------------------
  const {
    mutate: deleteMutate,
    isError: deleteError,
    isLoading: deleteLoading,
  } = useMutation(deleteSign, {
    onSuccess(data, variables, context) {
      console.log('성공');

      modusignMutate(
        { data: inModuSignData!, newContractData: contractSlice }!,
      );
    },
    onError(error, variables, context) {
      console.log('실패');
      setIsModal(true);
      setModalMessage('계약서 전송이 실패했습니다. 다시 시도해주세요.');
      // setModalMessage('다시 시도해주세요');
      // setIsModal(true);
    },
  });

  // ------------------모두싸인 GET API----------------------
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const {
    loading: inModuSignLoading,
    error: inModuSignErroe,
    data: inModuSignData,
    // refetch: inModuSignRefetch,
  } = useQuery<ModuSignResponse>(GET_ModuSignResponse, {
    variables: {
      projectIdx: router?.query?.projectIdx,
    },
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });

  console.log('🔥 inModuSignErroe : ', inModuSignErroe);
  console.log('🔥 inModuSignData : ', inModuSignData);
  console.log('🔥 inModuSignLoading : ', inModuSignLoading);

  // -----------------------모두싸인 POST API---------------------------
  const {
    mutate: modusignMutate,
    isError: modusignIsError,
    isLoading: modusignIsLoading,
    data: modusignData,
  } = useMutation(moduSign, {
    onSuccess: async (modusignData: any) => {
      // 백엔드에 보내줄 API 연결
      console.log('성공');
      console.log('🔥 modusignData : ', modusignData);

      const apiData: any = {
        ...modusignData,
        projectIdx: router?.query?.projectIdx,
      };
      // 서버에 데이터 전달
      await contractsMutate({
        url: '/contracts',
        data: {
          contract: JSON.stringify(apiData),
          additionalInfo: JSON.stringify(contractSlice),
        },
      });
      setModalMessage('계약서가 전송되었습니다');
      return setIsModal(true);
    },

    onError: (error) => {
      console.log(error);
      setIsModal(true);
      setModalMessage('계약서 전송이 실패했습니다. 다시 시도해주세요.');
    },
  });
  // ------------ 모두싸인 POST 후 백엔드에 데이터 전송 --------------
  const {
    mutate: contractsMutate,
    isError: contractsIsError,
    isLoading: contractsIsLoading,
  } = useMutation(isTokenPostApi, {
    onSuccess: () => {
      // 데이터 갱신
      // queryClient.refetchQueries('contract-pdf');
    },
    onError: (error) => {
      destroyMutate(modusignData?.id);
      console.log('🔥 모두싸인 POST 에러 ~line 102');
      console.log(error);
    },
  });
  // ------------ 모두싸인 POST 후 백엔드에 데이터 전송 실패 시 모두싸인에게 계약서 해지 POST --------------
  const {
    mutate: destroyMutate,
    isError: destroyIsError,
    isLoading: destroyIsLoading,
  } = useMutation(modusignCancel, {
    onSuccess: () => {
      setIsModal(true);
      setModalMessage('계약서 전송을 실패했습니다. 다시 시도해주세요.');
    },
    onError: (error: any) => {
      console.log('-----------서명 취소 요청 에러----------');
      console.log(error);
    },
  });

  // 온클릭 요청
  const onClickContractRequest = () => {
    const documentId = router.query.documentId;
    // console.log('inModuSignData : ', inModuSignData);
    // console.log('contractSlice : ', contractSlice);
    // return;

    if (isValid && !modusignIsLoading) {
      if (documentId) {
        deleteMutate(documentId as string);
      } else {
        modusignMutate(
          { data: inModuSignData!, newContractData: contractSlice }!,
        );
      }
    }
  };

  // 모달 버튼 클릭
  const onClickModal = () => {
    setIsModal(false);
    setModalMessage('');

    if (modalMessage === '계약서가 전송되었습니다') {
      router.replace(
        `/company/mypage/runningProgress/complete?projectIdx=${router.query.projectIdx}`,
      );
    }
  };

  console.log('🔥 inModuSignData : ', inModuSignData);
  console.log('🔥 productIdx : ', router.query.projectIdx);
  useEffect(() => {
    if (companyRegistrationNumber !== '' && representativeName !== '') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [companyRegistrationNumber, representativeName]);

  return (
    <Wrap>
      {isModal && <Modal click={onClickModal} text={modalMessage} />}
      {modusignIsLoading ? (
        <LoaderWrap>
          <Loader />
        </LoaderWrap>
      ) : (
        <>
          <Tab />
          <Notice>
            <h2>계약서 서명을 위해 아래에 운영사업자 정보를 입력해주세요.</h2>
          </Notice>

          {/* 내용 */}
          <Label pt={24}>사업자 등록번호</Label>
          <Input
            value={BuisnessHyphenFn(companyRegistrationNumber)}
            placeholder="예) 123-45-67890"
            maxLength={12}
            onChange={(e) =>
              dispatch(
                contractAction.setCompanyRegistrationNumber(
                  e.currentTarget.value,
                ),
              )
            }
          />
          <P>사업자 등록번호에는 숫자만 입력해주세요.</P>

          <Label pt={30}>대표자 이름</Label>
          <Input
            value={representativeName}
            placeholder="예) 홍길동"
            onChange={(e) =>
              dispatch(
                contractAction.setRepresentativeName(e.currentTarget.value),
              )
            }
          />

          <ContractButton
            prev={true}
            prevValue={'이전'}
            prevOnClick={() => dispatch(contractAction.setStep(8))}
            value={'계약서 요청'}
            isValid={isValid}
            onClick={onClickContractRequest}
          />
        </>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  position: relative;
  padding-top: 26.18pt;
  padding-left: 37.99pt;
  padding-right: 37.99pt;
  padding-bottom: 42pt;

  @media (max-width: 899.25pt) {
    min-height: calc(100vh - 48px);
    padding-top: 24pt;
    padding-left: 15pt;
    padding-right: 15pt;
    padding-bottom: 130pt;
  }
`;

const Notice = styled.div`
  padding-top: 15.75pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  letter-spacing: -0.02em;
  width: 100%;
  h2 {
    font-weight: 500;
    font-size: 15pt;
    line-height: 22.5pt;
    color: ${colors.main2};
  }
  p {
    padding-top: 15pt;
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 18pt;
    color: ${colors.lightGray7};
  }
  .companyName {
    color: ${colors.main1};
  }
`;
const Label = styled.label<{ pt: number }>`
  width: 100%;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-top: ${({ pt }) => pt}pt;
`;
const Input = styled.input`
  width: 100%;
  border: 0.75pt solid gray;
  border-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding: 13.5pt 12pt;
  margin-top: 9pt;
  ::placeholder {
    color: ${colors.lightGray3};
  }
`;
const P = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  margin-top: 6pt;
  width: 100%;
`;
const LoaderWrap = styled.div`
  height: 600px;
  width: 100%;
`;

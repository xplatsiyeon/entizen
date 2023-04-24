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
import { useMutation } from 'react-query';
import { modusign } from 'api/sign';
import { isTokenPostApi } from 'api';
import { modusignCancel } from 'api/cancelSign';
import { useQuery } from '@apollo/client';

type Props = {};

export default function Step9(props: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const { companyRegistrationNumber, representativeName } = useSelector(
    (state: RootState) => state.contractSlice,
  );
  const { contractSlice } = useSelector((state: RootState) => state);

  // ------------------모두싸인 GET API----------------------
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const {
    loading: inModuSignLoading,
    error: inModuSignErroe,
    data: inModuSignData,
    refetch: inModuSignRefetch,
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

  // -----------------------모두싸인 POST API---------------------------
  const {
    mutate: modusignMutate,
    isError: modusignIsError,
    isLoading: modusignIsLoading,
    data: modusignData,
  } = useMutation(modusign, {
    onSuccess: (modusignData: any) => {
      // 백엔드에 보내줄 API 연결

      console.log('성공');

      const apiData: any = {
        ...modusignData,
        projectIdx: router?.query?.projectIdx,
      };
      contractsMutate({
        url: '/contracts',
        data: {
          contract: JSON.stringify(apiData),
          additionalInfo: JSON.stringify(contractSlice),
        },
      });
    },
    onError: (error) => {
      // console.log('data 확인');
      console.log(error);
      // setIsModal(true);
      // setModalMessage('계약서 전송이 실패했습니다. 다시 시도해주세요.');
    },
  });
  // ------------ 모두싸인 POST 후 백엔드에 데이터 전송 --------------
  const {
    mutate: contractsMutate,
    isError: contractsIsError,
    isLoading: contractsIsLoading,
  } = useMutation(isTokenPostApi, {
    onSuccess: () => {
      // setIsModal(true);
      // setModalMessage('계약서가 전송되었습니다');
    },
    onError: (error) => {
      console.log(error);
      // destroyMutate(modusignData?.id);
      // console.log('🔥 모두싸인 POST 에러 ~line 87');
      // console.log(error);
    },
  });
  // ------------ 모두싸인 POST 후 백엔드에 데이터 전송 실패 시 모두싸인에게 계약서 해지 POST --------------
  const {
    mutate: destroyMutate,
    isError: destroyIsError,
    isLoading: destroyIsLoading,
  } = useMutation(modusignCancel, {
    onSuccess: () => {
      // setIsModal(true);
      // setModalMessage('계약서 전송을 실패했습니다. 다시 시도해주세요.');
    },
    onError: (error: any) => {
      // console.log('-----------서명 취소 요청 에러----------');
      // console.log(error);
    },
  });

  // 온클릭 요청
  const onClickContractRequest = () => {
    inModuSignRefetch();
    console.log('inModuSignData : ', inModuSignData);
    // modusignMutate(inModuSignData!);
    return;
    if (isValid) {
      modusignMutate(inModuSignData!);
      // dispatch(contractAction.setStep(10));
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
      <Tab />
      <Notice>
        <h2>계약서 서명을 위해 아래에 운영사업자 정보를 입력해주세요.</h2>
      </Notice>

      {/* 내용 */}
      <Label pt={24}>사업자 등록번호</Label>
      <Input
        value={BuisnessHyphenFn(companyRegistrationNumber)}
        placeholder="예) 123-45-67890"
        onChange={(e) =>
          dispatch(
            contractAction.setCompanyRegistrationNumber(e.currentTarget.value),
          )
        }
      />
      <P>사업자 등록번호에는 숫자만 입력해주세요.</P>

      <Label pt={30}>대표자 이름</Label>
      <Input
        value={representativeName}
        placeholder="예) 홍길동"
        onChange={(e) =>
          dispatch(contractAction.setRepresentativeName(e.currentTarget.value))
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
    </Wrap>
  );
}

const Wrap = styled.div`
  padding-top: 18.375pt;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-left: 15pt;
  padding-right: 15pt;
  position: relative;
  min-height: calc(100vh - 48px);
  padding-bottom: 130pt;
`;

const Notice = styled.div`
  padding-top: 15.75pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  letter-spacing: -0.02em;
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

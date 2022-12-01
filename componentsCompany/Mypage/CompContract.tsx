import Image from 'next/image';

import arrowR from 'public/images/grayRightArrow20.png';
import EntizenContractIcon from 'public/images/EntizenContractIcon.png';
import AnyContracIcon from 'public/images/AnyContracIcon.png';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useState } from 'react';
import { modusign } from 'api/sign';
import {
  GET_InProgressProjectsDetail,
  InProgressProjectsDetailResponse,
} from 'QueryComponents/CompanyQuery';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import Loader from 'components/Loader';
import Modal from 'components/Modal/Modal';
import { api, isTokenPostApi } from 'api';
import { modusignCancel } from 'api/cancelSign';

type Props = {
  // setOpenContract?: Dispatch<SetStateAction<boolean>>;
};
const TAG = 'componentsCompany/Mypage/CompContract.tsx';
const ComContranct = ({}: Props) => {
  const router = useRouter();
  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  // -----진행중인 프로젝트 상세 리스트 api-----
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const {
    loading,
    error,
    data: inProgressData,
    refetch: inProgressRefetch,
  } = useQuery<InProgressProjectsDetailResponse>(GET_InProgressProjectsDetail, {
    variables: {
      projectIdx: router?.query?.projectIdx!,
    },
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });

  // -------모두싸인 POST API------
  const {
    mutate: modusignMutate,
    isError: modusignIsError,
    isLoading: modusignIsLoading,
    data: modusignData,
  } = useMutation(modusign, {
    onSuccess: (modusignData: any) => {
      console.log('data 확인');
      console.log(modusignData);
      // 백엔드에 보내줄 API 연결
      const apiData: any = {
        ...modusignData,
        projectIdx: router?.query?.projectIdx,
      };
      contractsMutate({
        url: '/contracts',
        data: {
          contract: JSON.stringify(apiData),
        },
      });
    },
    onError: (error) => {
      console.log('data 확인');
      console.log(error);
      setIsModal(true);
      setModalMessage('계약서 전송이 실패했습니다. 다시 시도해주세요.');
    },
  });
  // ------------모두싸인 POST 후 백엔드에 데이터 전송 --------------
  const {
    mutate: contractsMutate,
    isError: contractsIsError,
    isLoading: contractsIsLoading,
  } = useMutation(isTokenPostApi, {
    onSuccess: () => {
      setIsModal(true);
      setModalMessage('계약서가 전송되었습니다');
    },
    onError: (error) => {
      destroyMutate(modusignData?.id);
      console.log('🔥 모두싸인 POST 에러 ~line 87');
      console.log(error);
    },
  });
  // ------------모두싸인 POST 후 백엔드에 데이터 전송 실패 시 모두싸인에게 계약서 해지 POST --------------
  const {
    mutate: destroyMutate,
    isError: destroyIsError,
    isLoading: destroyIsLoading,
  } = useMutation(modusignCancel, {
    onSuccess: () => {
      setIsModal(true);
      setModalMessage('계약서 전송이 실패했습니다. 다시 시도해주세요.');
    },
    onError: (error: any) => {
      console.log('서명 취소 요청 에러');
      console.log(error);
    },
  });

  console.log(TAG + '🔥 ~line 68 ~내프로젝트 진행중인 프로젝트 리스트');
  console.log(modusignData);

  // console.log(inProgressData);

  const handleContr = () => {
    modusignMutate(inProgressData!);
  };

  if (modusignIsLoading || contractsIsLoading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      {isModal && (
        <Modal
          click={() => router.push('/company/mypage?id=0')}
          text={modalMessage}
        />
      )}
      <TitleP>계약서를 작성해 주세요</TitleP>
      <P>계약 후 프로젝트가 진행됩니다.</P>
      <FlexBox>
        {/* onclick 함수로 계약서 모달 띄우기 */}
        <EntizenContractBox onClick={handleContr}>
          <TextBox>
            <TitleBox>
              <Title>엔티즌 전자 계약서</Title>
              <TitleIcon>
                <Image src={arrowR} alt=">" />
              </TitleIcon>
            </TitleBox>
            <ExplainText>
              간편하고 안전하게
              <br />
              전자계약 하세요
            </ExplainText>
          </TextBox>
          <BigIconBox>
            <Image src={EntizenContractIcon} alt="큰아이콘" />
          </BigIconBox>
        </EntizenContractBox>

        {/* onclick 함수로 계약서 모달 띄우기 */}
        <EntizenContractBox className="forMargin">
          <TextBox>
            <TitleBox>
              <Title>자체 계약서</Title>
              <TitleIcon>
                <Image src={arrowR} alt=">" />
              </TitleIcon>
            </TitleBox>
            <ExplainText>
              날인 완료된 계약서
              <br />
              스캔본을 첨부해 주세요
            </ExplainText>
          </TextBox>
          <BigIconBox>
            <Image src={AnyContracIcon} alt="큰아이콘" />
          </BigIconBox>
        </EntizenContractBox>
      </FlexBox>
    </Wrapper>
  );
};

export default ComContranct;

const Wrapper = styled.div`
  margin-top: 34.5pt;
  background: white;

  @media (min-width: 900pt) {
    margin-top: 0;
  }
`;

const TitleP = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 18pt;
  line-height: 24pt;
  /* identical to box height, or 133% */
  letter-spacing: -0.02em;
  color: #222222;
  text-align: center;
  margin-bottom: 6pt;
`;

const P = styled(TitleP)`
  font-size: 10.5pt;
  line-height: 15pt;
  color: #747780;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 50pt;
  gap: 22.5pt;
  margin-top: 33pt;

  @media (max-width: 899.25pt) {
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 24pt;
    gap: 15pt;
  }
`;

const EntizenContractBox = styled.div`
  padding: 13pt;
  flex: 1;
  height: 105pt;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  border-radius: 6pt;
  cursor: pointer;

  @media (max-width: 899.25pt) {
    width: auto;
    margin: 0 15pt;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7.5pt;
`;

const TitleBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 3pt;
`;

const Title = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 15pt;
  font-weight: 700;
  line-height: 21pt;
  letter-spacing: -0.02em;
  text-align: left;
`;

const TitleIcon = styled.div`
  position: relative;
  top: -1.2pt;
  width: 15pt;
  height: 15pt;
`;

const ExplainText = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 400;
  line-height: 16.5pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #a6a9b0;
`;

const BigIconBox = styled.div`
  width: 45pt;
  height: 45pt;
`;

import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { deleteSign } from 'api/deleteSign';
import ExitConfirmModal from 'components/Modal/ExitConfirmModal';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import MypageHeader from 'components/mypage/request/header';
import Step0 from 'componentsCompany/contract/step0';
import Step1 from 'componentsCompany/contract/step1';
import Step2 from 'componentsCompany/contract/step2';
import Step3 from 'componentsCompany/contract/step3';
import Step4 from 'componentsCompany/contract/step4';
import Step5 from 'componentsCompany/contract/step5';
import Step6 from 'componentsCompany/contract/step6';
import Step7 from 'componentsCompany/contract/step7';
import Step8 from 'componentsCompany/contract/step8';
import Step9 from 'componentsCompany/contract/step9';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import { useRouter } from 'next/router';
import {
  GET_InProgressProjectsDetail,
  InProgressProjectsDetailResponse,
} from 'QueryComponents/CompanyQuery';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import colors from 'styles/colors';

type Props = {};

export default function AddContract(props: Props) {
  const { step } = useSelector((state: RootState) => state.contractSlice);
  const router = useRouter();

  // -------------진행중인 프로젝트 상세 리스트 api-------------
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const { loading, error, data, refetch } =
    useQuery<InProgressProjectsDetailResponse>(GET_InProgressProjectsDetail, {
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

  useEffect(() => {
    console.log('inProgressData', data);
  }, [data]);

  const [tabNumber, setTabNumber] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // 서브 카테고리 열렸는지 아닌지
  const [openSubLink, setOpenSubLink] = useState<boolean>(false);

  const gobackQuestion = () => setModalOpen(false);
  const stopRegist = () => {
    router.replace(
      `/company/mypage/runningProgress?projectIdx=${router.query.projectIdx}`,
    );
  };

  return (
    <WebBody>
      {modalOpen && (
        <ExitConfirmModal
          exit={gobackQuestion}
          text={
            '지금 나가시면\n작성하신 내용이 삭제됩니다.\n그래도 괜찮으시겠습니까?'
          }
          leftBtnText={'그만하기'}
          rightBtnText={'계속 작성하기'}
          leftBtnColor={'#A6A9B0'}
          rightBtnColor={'#5a2dc9'}
          leftBtnControl={stopRegist}
          rightBtnControl={gobackQuestion}
        />
      )}
      <WebBuyerHeader
        tabNumber={tabNumber}
        setTabNumber={setTabNumber}
        openSubLink={openSubLink}
        setOpenSubLink={setOpenSubLink}
      />
      <Container>
        <WebBox className="content">
          <div>
            <MypageHeader
              exitBtn={true}
              handleOnClick={() => {
                setModalOpen(true);
              }}
              title={'구독 계약서'}
            />
            {/* 각 단계별 컴포넌트 */}
            {step === 0 && <Step0 />}
            {step === 1 && <Step1 data={data?.project.finalQuotation!} />}
            {step === 2 && <Step2 data={data?.project.finalQuotation!} />}
            {step === 3 && <Step3 data={data?.project.finalQuotation!} />}
            {step === 4 && <Step4 />}
            {step === 5 && (
              <Step5
                companyName={
                  data?.project?.companyMember?.companyMemberAdditionalInfo
                    ?.companyName!
                }
                subscribeProduct={data?.project.finalQuotation.subscribeProduct}
              />
            )}
            {step === 6 && <Step6 />}
            {step === 7 && (
              <Step7
                subscribeProduct={data?.project.finalQuotation.subscribeProduct}
              />
            )}
            {step === 8 && (
              <Step8
                subscribeProduct={data?.project.finalQuotation.subscribeProduct}
              />
            )}
            {step === 9 && <Step9 />}
          </div>
        </WebBox>
      </Container>

      <WebFooter />
    </WebBody>
  );
}
const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  @media (max-height: 500pt) {
    height: 100%;
    display: block;
  }
`;
const Container = styled.div`
  display: block;
  position: relative;
  border-radius: 12pt;
  width: 345pt;
  margin-top: 58.5pt;

  background: white;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0%;
    transform: none;
    padding: 0;
    box-shadow: none;
    background: none;
    margin: 0;
  }
  @media (max-height: 400pt) {
    height: 100%;
    background: white;
  }
  @media (min-width: 900pt) {
    margin: 0 auto;
    padding-top: 54pt;
  }
`;

const WebBox = styled.div`
  background: ${colors.lightWhite};
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  margin-bottom: 90pt;
  @media (max-width: 899.25pt) {
    box-shadow: none;
    border-radius: 0;
    margin-bottom: auto;
    background: none;
  }
`;

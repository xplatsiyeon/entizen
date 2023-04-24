import { useQuery } from '@apollo/client';
import MypageHeader from 'components/mypage/request/header';
import Complete from 'componentsCompany/contract/Complete';
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
import { useRouter } from 'next/router';
import {
  GET_InProgressProjectsDetail,
  InProgressProjectsDetailResponse,
} from 'QueryComponents/CompanyQuery';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

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

  return (
    <div>
      <MypageHeader
        exitBtn={true}
        handleOnClick={() => alert('닫기 클릭')}
        title={'구독 계약서'}
      />
      {/* 각 단계별 컴포넌트 */}
      {step === 0 && <Step0 />}
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
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
      {step === 10 && <Complete />}
    </div>
  );
}

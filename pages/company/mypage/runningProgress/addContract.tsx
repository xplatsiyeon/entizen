import MypageHeader from 'components/mypage/request/header';
import Complete from 'componentsCompany/contract/complete';
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
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

type Props = {};

export default function AddContract(props: Props) {
  const { step } = useSelector((state: RootState) => state.contractSlice);
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
      {step === 5 && <Step5 />}
      {step === 6 && <Step6 />}
      {step === 7 && <Step7 />}
      {step === 8 && <Step8 />}
      {step === 9 && <Step9 />}
      {step === 10 && <Complete />}
    </div>
  );
}

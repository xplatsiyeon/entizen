import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import colors from 'styles/colors';
import { useMediaQuery } from 'react-responsive';
import { QuotationRequestV1 } from 'types/quotation';
import { useRouter } from 'next/router';

interface Props {
  modalNumber: number; // 0 다른파트너 / 1 확정하기
  contents: string;
  leftText: string;
  leftControl: () => void;
  rightText: string;
  rightControl: () => void;
  backgroundOnClick: () => void;
  quotationDataV1: QuotationRequestV1;
}

export default function OtherPartnerModal({
  modalNumber,
  contents,
  leftText,
  leftControl,
  rightText,
  rightControl,
  backgroundOnClick,
  quotationDataV1,
}: Props) {
  const outside = useRef(null);
  const router = useRouter();

  // 외부 클릭 모달 창 닫기
  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (outside.current === e.target) {
      backgroundOnClick();
    }
  };

  const [companyName, setCompanyName] = useState('');

  // 회사 정보
  useEffect(() => {
    const target = quotationDataV1?.quotationStatusHistories.find(
      (e) =>
        e.quotationRequestIdx === Number(router?.query?.quotationRequestIdx),
    );

    if (target) {
      setCompanyName(
        target?.preQuotation.member.companyMemberAdditionalInfo.companyName!,
      );
    }
  }, [quotationDataV1, companyName]);

  return (
    <ModalBackground ref={outside} onClick={(e) => handleModalClose(e)}>
      <Modal>
        <H1>{contents}</H1>
        {modalNumber === 0 && (
          <Text>
            {companyName} 외에 &nbsp;
            {quotationDataV1?.quotationStatusHistories?.length - 1}개의 업체가
            <br /> 견적을 제출하였습니다.
          </Text>
        )}

        <BtnBox>
          <LeftBtn onClick={leftControl}>{leftText}</LeftBtn>
          <RightBtn onClick={rightControl}>{rightText}</RightBtn>
        </BtnBox>
      </Modal>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  background-color: rgba(102, 100, 100, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Modal = styled.div<{ border?: boolean }>`
  background: ${colors.lightWhite};
  box-shadow: 3pt 0 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: ${({ border }) => (border ? '' : '22.5pt 22.5pt 0 0')};
  padding: 30pt 15pt;
  width: 100%;
  position: fixed;
  bottom: 0;
  @media (min-width: 900pt) {
    border-radius: 12pt;
    width: 420pt;
    margin-top: 0;
    padding: 42pt 37.5pt 30pt 37.5pt;
    position: absolute;
    top: 50%;
    left: 50%;
    bottom: auto;
    transform: translate(-50%, -50%);
  }
`;
const H1 = styled.h1`
  white-space: pre-wrap;
  font-weight: 700;
  font-size: 15pt;
  line-height: 21pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const Text = styled.p`
  white-space: pre-wrap;
  font-weight: 400;
  font-size: 12pt;
  line-height: 18pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-top: 12pt;
`;
const BtnBox = styled.div`
  text-align: center;
  padding-top: 24pt;
  display: flex;
  justify-content: space-between;
  gap: 9pt;
  @media (min-width: 900pt) {
    gap: 12.36pt;
    padding-top: 24pt;
  }
`;

const LeftBtn = styled(Button)`
  color: #595757;
  background-color: ${colors.gray};
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  padding-top: 15pt;
  padding-bottom: 15pt;
  flex: 2;
  @media (max-width: 899.25pt) {
    background-color: #e2e5ed;
  }
  &:hover {
    background: white !important;
  }
  //
`;
const RightBtn = styled(Button)`
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  background: ${colors.main};
  flex: 5;
  color: white;
  &:hover {
    background: ${colors.main}!important;
  }
`;

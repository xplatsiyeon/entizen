import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import AdminHeader from 'componentsAdmin/Header';
import UserPreQuotation from './UserPreQuotation';
import CompanyPreQuotation from './CompanyPreQuotation';
import Qutation from './Qutation';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
type Props = {
  detatilId: string;
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailId: React.Dispatch<React.SetStateAction<string>>;
  nowHeight: number;
};

const DetailQuotation = ({
  detatilId,
  setIsDetail,
  setDetailId,
  nowHeight,
}: Props) => {
  const { quotationRequestIdx, isCompanyDetail } = useSelector(
    (state: RootState) => state.adminReverseData,
  );

  // 버튼 연동 보여주고 숨기고
  const [showSubMenu, setShowSubMenu] = useState<boolean>(false);

  useEffect(() => {
    if (isCompanyDetail) {
      setShowSubMenu(true);
    }
  }, []);

  // 뒤로 가기
  const backBtn = () => {
    setIsDetail(false);
  };

  console.log('isCompanyDetail', isCompanyDetail);

  // 테이블에서 onClick 하면 여기로 id 값 넘겨주기!

  console.log('---------------------');
  console.log('quotationRequestIdx', quotationRequestIdx.preQuotationIdx);
  console.log('quotationRequestIdx', quotationRequestIdx.finalQuotationIdx);

  console.log('Detail nowHeight', nowHeight);

  return (
    <Background nowHeight={nowHeight}>
      <Wrapper>
        <AdminHeader
          title="역경매 관리"
          type="detail"
          exelHide={false}
          backBtn={backBtn}
        />
        {/* 기업 디테일 페이지 */}
        {isCompanyDetail && (
          <Qutation showSubMenu={showSubMenu} nowHeight={nowHeight} />
        )}
        {/* 유저 가견적 */}
        <UserPreQuotation detatilId={detatilId} />
        {/* 기업 리스트 */}
        <CompanyPreQuotation
          detatilId={detatilId}
          setIsDetail={setIsDetail}
          setDetailId={setDetailId}
        />
      </Wrapper>
    </Background>
  );
};

export default DetailQuotation;

const Background = styled.div<{ nowHeight: number }>`
  width: 100%;
  /* height: 100vh; */
  height: ${({ nowHeight }) => `${nowHeight}px`};
  background-color: ${colors.lightWhite};
  padding: 0 18pt;
  position: absolute;
  left: 154.5pt;
  z-index: 10;
  overflow-y: scroll;
  padding-bottom: 75px;
`;

const Wrapper = styled.div`
  width: 964px;
`;

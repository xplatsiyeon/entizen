import styled from '@emotion/styled';
import Image from 'next/image';
import CaretDown24 from 'public/images/CaretDown24.png';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import CommonBtn from 'components/mypage/as/CommonBtn';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader';
import { filterType } from 'pages/company/quotation';
import Sort from './Sort';
import Search from './Search';
import { HandleColor } from 'utils/changeValue';
import WebSort from './WebSort';
import { HistoryQuotation } from './History';

type Props = {
  componentId?: number;
  setComponentId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  historyData?: HistoryQuotation[];
};
interface QuotationRequestChargers {
  kind: number;
}
interface Data {
  preQuotation: {
    preQuotationIdx: number;
  };
  quotationRequest: {
    quotationRequestIdx: number;
    installationAddress: string;
    createdAt: string;
    quotationStatus: string;
    quotationRequestChargers: QuotationRequestChargers[];
  };
  badge: string;
}
export interface HistoryResponse {
  isSuccess: boolean;
  data: Data[];
}
const TAG = 'components/Company/CompanyQuotation/SentRequest.tsx';
const HistoryUnder = ({ componentId, setComponentId, historyData }: Props) => {
  const router = useRouter();
  // console.log(historyData);

  return (
    <>
      <ContentsContainer>
        {historyData?.map((el, index) => (
          <Contents
            key={index}
            onClick={() => {
              router.push({
                pathname: '/company/sentProvisionalQuotation',
                query: {
                  preQuotationIdx: el?.preQuotation?.preQuotationIdx,
                },
              });
            }}
            select={Number(el?.preQuotation?.preQuotationIdx)}
            componentId={componentId}
          >
            <DdayNAddress>
              <DdayBox>
                <CommonBtn
                  text={el?.badge}
                  backgroundColor={HandleColor(el?.badge)}
                  bottom={'12pt'}
                />
              </DdayBox>
              <AddressBox>
                {el?.quotationRequest.installationAddress}
              </AddressBox>
            </DdayNAddress>
            <IconBox>
              <ArrowIconBox>
                <Image src={CaretDown24} alt="RightArrow" />
              </ArrowIconBox>
            </IconBox>
          </Contents>
        ))}
      </ContentsContainer>
    </>
  );
};

const ContentsContainer = styled.div`
  @media (min-width: 900pt) {
    width: 198pt;
    height: 66pt;
    margin: 0 auto;
    border-radius: 6pt;
    height: 313pt;
    overflow-y: scroll;
    padding: 6pt 7.5pt 0 7.5pt;
  }
`;
const Contents = styled.div<{
  select: number | undefined;
  componentId: number | undefined;
}>`
  padding: 12pt 13.5pt;
  display: flex;
  margin-bottom: 9pt;
  justify-content: space-between;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  cursor: pointer;
  border: ${({ select, componentId }) =>
    select === componentId ? `0.75pt solid #5221CB` : ''};
`;
const DdayBox = styled.div`
  margin-bottom: 16.5pt;
  cursor: pointer;
`;
const DdayNAddress = styled.div`
  position: relative;
`;
const AddressBox = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  position: relative;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  margin-top: 12pt;
  color: ${colors.main2};
`;
const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ArrowIconBox = styled.div`
  width: 18pt;
  height: 18pt;
`;
const TopContainer = styled.div`
  @media (min-width: 900pt) {
    width: 580.5pt;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 60pt;
    margin-bottom: 30pt;
  }
`;

export default HistoryUnder;

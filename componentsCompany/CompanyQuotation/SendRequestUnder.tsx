import styled from '@emotion/styled';
import Image from 'next/image';
import CaretDown24 from 'public/images/CaretDown24.png';
import { useRouter } from 'next/router';
import React from 'react';
import colors from 'styles/colors';
import CommonBtn from 'components/mypage/as/CommonBtn';
import { HandleColor } from 'utils/changeValue';

type Props = {
  componentId?: number;
  setComponentId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  send?: SendQuotationRequests[];
};
export interface QuotationRequest {
  changedDate: string;
  createdAt: string;
  etcRequest: string;
  expiredAt: string;
  installationAddress: string;
  installationLocation: string;
  installationPurpose: string;
  investRate: string;
  memberIdx: number;
  quotationRequestIdx: number;
  quotationStatus: string;
  subscribePeriod: number;
  subscribeProduct: string;
  installationAddress: string;
}
export interface PreQuotation {
  changedDate: string;
  constructionPeriod: number;
  createdAt: string;
  memberIdx: number;
  preQuotationIdx: number;
  preQuotationStatus: string;
  quotationRequestIdx: number;
  subscribePricePerMonth: number;
  subscribeProductFeature: string;
}
export interface SendQuotationRequests {
  badge: string;
  preQuotation: PreQuotation;
  quotationRequest: QuotationRequest;
}
export interface SentrequestResponse {
  isSuccess: boolean;
  sendQuotationRequests: SendQuotationRequests[];
}
const TAG = 'components/Company/CompanyQuotation/SentRequest.tsx';
const SendRequestUnder = ({ componentId, setComponentId, send }: Props) => {
  const router = useRouter();
  // console.log(send);

  return (
    <>
      <ContentsContainer>
        {send?.map((el, index) => (
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
            </DdayNAddress>
            <DisplayBox>
              {el?.badge === '선택대기' ? (
                <AddressBox>
                  {el?.quotationRequest.installationAddress}
                </AddressBox>
              ) : (
                <AddressBox>
                  {el?.quotationRequest.installationAddress}
                </AddressBox>
              )}
              <ArrowIconBox>
                <Image src={CaretDown24} alt="RightArrow" />
              </ArrowIconBox>
            </DisplayBox>
          </Contents>
        ))}
      </ContentsContainer>
    </>
  );
};

const ContentsContainer = styled.div`
  @media (min-width: 900pt) {
    /* width: 198pt; */

    border-radius: 6pt;
    height: 313pt;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    padding: 5pt 28.5pt 0;
    /* padding: 0 5.25pt; */
    /* padding: 6pt 7.5pt 0 7.5pt; */
  }
`;
const Contents = styled.div<{
  select: number | undefined;
  componentId: number | undefined;
}>`
  padding: 12pt 13.5pt;
  margin-bottom: 9pt;
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2) !important;
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

  color: ${colors.main2};
  width: 140pt;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

const ArrowIconBox = styled.div`
  width: 18pt;
  height: 18pt;
`;

const DisplayBox = styled.div`
  display: flex;
  align-items: center;
`;

export default SendRequestUnder;
